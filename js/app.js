// JBRETAS — App: Login, Fechamento, Funções principais

// ================================================================
// ORDEM PADRÃO DE COMBUSTÍVEIS — mesma do Apps Script (ORDEM_COMB)
// G.C → G.A → Grid → ET → ET.AD → DS10 → DS500 → Octapro → Podium → GNV
// Usada para ordenar tanques no app igual à planilha
// ================================================================
const ORDEM_COMB_APP = [
  'GASOLINA COMUM',
  'GASOLINA ADITIVADA',
  'Gasolina Grid',
  'ETANOL',
  'ETANOL ADITIVADO',
  'DIESEL S-10',
  'DIESEL S-500',
  'Gasolina Octapro',
  'Gasolina Premium Podium',
  'GNV'
];

let currentUser = null;
let currentPosto = null;

/* =====================  LOGIN  ===================== */

/* Carregar credenciais salvas ao iniciar */
(function() {
  try {
    const saved = JSON.parse(localStorage.getItem('jbretas_remember') || 'null');
    if (saved && saved.email && saved.senha) {
      document.getElementById('login-email').value = saved.email;
      document.getElementById('login-senha').value = saved.senha;
      document.getElementById('lembrar-check').checked = true;
    }
  } catch(e) {}
})();

/* ===================== ESQUECI MINHA SENHA — EmailJS =====================
   Configure suas chaves após criar conta em https://www.emailjs.com
   Template sugerido:
     Para: {{to_email}}
     Assunto: JBRETAS — Sua senha de acesso
     Corpo: Olá {{to_name}}, sua senha é: {{senha}} — Posto: {{posto}}
   ======================================================================== */
const EMAILJS_SERVICE_ID  = 'SEU_SERVICE_ID';   // ex: 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'SEU_TEMPLATE_ID';  // ex: 'template_xyz456'
// PUBLIC_KEY já configurada no <head>

function abrirModalSenha() {
  document.getElementById('modal-senha').classList.add('active');
  document.getElementById('recuperar-email').value = '';
  const msg = document.getElementById('modal-msg');
  msg.style.display = 'none';
  msg.className = 'modal-msg';
  document.getElementById('btn-recuperar').disabled = false;
  document.getElementById('btn-recuperar').textContent = '📧 ENVIAR SENHA POR E-MAIL';
  setTimeout(() => document.getElementById('recuperar-email').focus(), 100);
}

function fecharModalSenha() {
  document.getElementById('modal-senha').classList.remove('active');
}

// Fecha modal ao clicar fora do card
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('modal-senha').addEventListener('click', function(e) {
    if (e.target === this) fecharModalSenha();
  });
});

async function enviarSenha() {
  const email = document.getElementById('recuperar-email').value.trim().toLowerCase();
  const btn   = document.getElementById('btn-recuperar');
  const msg   = document.getElementById('modal-msg');

  msg.style.display = 'none';

  if (!email) {
    exibirMsgModal('Por favor, informe seu e-mail.', 'err');
    return;
  }

  if (EMAILJS_SERVICE_ID === 'SEU_SERVICE_ID') {
    exibirMsgModal('⚠ Recuperação de senha não configurada. Contate o administrador.', 'err');
    return;
  }

  btn.disabled = true;
  btn.textContent = '⏳ Enviando...';

  try {
    // Busca dados do usuário no servidor (sem expor senhas no front)
    const url  = window._SHEETS_URL + '?tipo=recuperar&email=' + encodeURIComponent(email);
    const resp = await fetch(url);
    const json = await resp.json();

    if (!json || json.erro || !json.encontrado) {
      exibirMsgModal('E-mail não encontrado no sistema.', 'err');
      btn.disabled = false;
      btn.textContent = '📧 ENVIAR SENHA POR E-MAIL';
      return;
    }

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: json.email,
      to_name:  json.gerente,
      senha:    json.senha,
      posto:    json.posto,
    });
    exibirMsgModal('✅ E-mail enviado! Verifique sua caixa de entrada.', 'ok');
    btn.textContent = '✅ ENVIADO';
    setTimeout(fecharModalSenha, 3000);
  } catch (err) {
    console.error('Erro:', err);
    exibirMsgModal('Erro ao enviar e-mail. Tente novamente ou contate o administrador.', 'err');
    btn.disabled = false;
    btn.textContent = '📧 ENVIAR SENHA POR E-MAIL';
  }
}

function exibirMsgModal(texto, tipo) {
  const msg = document.getElementById('modal-msg');
  msg.textContent = texto;
  msg.className   = 'modal-msg ' + tipo;
  msg.style.display = 'block';
}
/* ===== /ESQUECI MINHA SENHA ===== */

/* ===== CONTROLE DA SEÇÃO CARGA ===== */
let cargaRespondida = false;

function setCarga(opcao) {
  cargaRespondida = opcao;
  const btnSim    = document.getElementById('btn-carga-sim');
  const btnNao    = document.getElementById('btn-carga-nao');
  const campos    = document.getElementById('carga-campos');
  const btnSalvar = document.getElementById('btn-salvar-fechamento');
  const statusMsg = document.getElementById('carga-status-msg');
  btnSim.className = 'toggle-carga-btn';
  btnNao.className = 'toggle-carga-btn';
  if (opcao === 'sim') {
    btnSim.classList.add('sim-ativo');
    campos.classList.add('visivel');
  } else {
    btnNao.classList.add('nao-ativo');
    campos.classList.remove('visivel');
    if (currentPosto) {
      currentPosto.combustiveis.forEach(c => {
        const el = document.getElementById('carga-' + c.id);
        if (el) el.value = '0';
      });
    }
  }
  btnSalvar.classList.remove('btn-save-blocked');
  btnSalvar.textContent = '💾 Salvar Fechamento Diário';
  statusMsg.textContent = opcao === 'sim'
    ? '🚚 Carga informada — preencha os litros acima'
    : '✓ Sem carga hoje — pronto para salvar';
  statusMsg.style.color = opcao === 'sim' ? 'var(--warning)' : 'var(--accent)';
}

function buildCarga(combustiveis) {
  const body = document.getElementById('carga-body');
  if (!body) return;
  body.innerHTML = '';
  combustiveis.forEach(c => {
    const row = document.createElement('div');
    row.className = 'carga-row';
    row.innerHTML = `
      <span class="carga-label">${c.label}</span>
      <div class="stepper">
        <button class="step-btn" onclick="stepCarga('carga-${c.id}',-1000)">−</button>
        <input class="step-input" id="carga-${c.id}" data-val="0" value="0"
          type="text" inputmode="numeric" style="width:90px;text-align:center;"
          oninput="formatCargaInput(this)">
        <button class="step-btn" onclick="stepCarga('carga-${c.id}',1000)">+</button>
      </div>`;
    body.appendChild(row);
  });
}

/* Formata o input de carga com ponto de milhar enquanto digita */
function formatCargaInput(el) {
  const digits = el.value.replace(/\D/g, '');
  const num    = parseInt(digits) || 0;
  el.dataset.val = num;
  el.value = num === 0 ? '0' : num.toLocaleString('pt-BR');
}

/* Stepper dos campos de carga */
function stepCarga(id, delta) {
  const el  = document.getElementById(id);
  const val = parseInt(el.dataset.val) || 0;
  const novo = Math.max(0, val + delta);
  el.dataset.val = novo;
  el.value = novo === 0 ? '0' : novo.toLocaleString('pt-BR');
}

function resetCarga() {
  cargaRespondida = false;
  const btnSim    = document.getElementById('btn-carga-sim');
  const btnNao    = document.getElementById('btn-carga-nao');
  const campos    = document.getElementById('carga-campos');
  const btnSalvar = document.getElementById('btn-salvar-fechamento');
  const statusMsg = document.getElementById('carga-status-msg');
  if (btnSim)    btnSim.className    = 'toggle-carga-btn';
  if (btnNao)    btnNao.className    = 'toggle-carga-btn';
  if (campos)    campos.classList.remove('visivel');
  if (currentPosto) {
    currentPosto.combustiveis.forEach(c => {
      const el = document.getElementById('carga-' + c.id);
      if (el) { el.value = '0'; el.dataset.val = '0'; }
    });
  }
  if (btnSalvar) { btnSalvar.classList.add('btn-save-blocked'); btnSalvar.textContent = '🔒 RESPONDA A CARGA PARA SALVAR'; }
  if (statusMsg) { statusMsg.textContent = '⚠ seção "Recebeu Carga?" obrigatória'; statusMsg.style.color = 'var(--danger)'; }
}
/* ===== /CONTROLE DA SEÇÃO CARGA ===== */

/* ===== TOGGLE OLHO SENHA ===== */
function toggleSenha() {
  const input = document.getElementById('login-senha');
  const btn   = document.getElementById('btn-olho');
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}
/* ===== /TOGGLE OLHO SENHA ===== */

async function doLogin() {
  const email   = document.getElementById('login-email').value.trim().toLowerCase();
  const senha   = document.getElementById('login-senha').value;
  const lembrar = document.getElementById('lembrar-check').checked;
  const errEl   = document.getElementById('login-error');
  const btn     = document.getElementById('btn-login');

  errEl.style.display = 'none';
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Entrando...'; }

  const usuario = await carregarDadosSecretos(email, senha);

  if (btn) { btn.disabled = false; btn.textContent = '▶ ENTRAR'; }

  if (!usuario) {
    errEl.style.display = 'block';
    return;
  }

  const foundPosto = DB[usuario.postoKey];
  if (!foundPosto) {
    errEl.style.display = 'block';
    return;
  }

  try {
    if (lembrar) {
      localStorage.setItem('jbretas_remember', JSON.stringify({ email, senha }));
    } else {
      localStorage.removeItem('jbretas_remember');
    }
  } catch(e) {}

  currentUser  = { email: usuario.email, gerente: usuario.gerente, senha };
  currentPosto = foundPosto;
  initApp();
  showScreen('app');
}

document.getElementById('login-senha').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});

function doLogout() {
  currentUser = null;
  currentPosto = null;
  const saved = JSON.parse(localStorage.getItem('jbretas_remember') || 'null');
  if (!saved) {
    document.getElementById('login-email').value = '';
    document.getElementById('login-senha').value = '';
  }
  showScreen('login');
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
}

/* =====================  APP  ===================== */

let dataRelatorio = null;

function getOntem() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
}

function dateToInputValue(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

function dateToBR(d) {
  return d.toLocaleDateString('pt-BR');
}

function inputValueToDate(val) {
  const [y, m, d] = val.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function atualizarDataRelatorio(val) {
  dataRelatorio = inputValueToDate(val);
  const hoje = new Date();
  const ontem = getOntem();
  const aviso = document.getElementById('data-aviso');
  const dataBR = dateToBR(dataRelatorio);
  if (dataBR === dateToBR(ontem)) {
    aviso.textContent = '⚠ Relatório referente a ontem';
    aviso.style.color = 'var(--warning)';
  } else if (dataBR === dateToBR(hoje)) {
    aviso.textContent = '⚠ Data de hoje — confirme se está correto';
    aviso.style.color = 'var(--danger)';
  } else {
    aviso.textContent = '📅 Data selecionada: ' + dataBR;
    aviso.style.color = 'var(--accent)';
  }
}

function initApp() {
  const gerente = currentUser.gerente;
  const posto = currentPosto;
  const initials = gerente.split(' ').map(w => w[0]).slice(0,2).join('');

  const ontem = getOntem();
  dataRelatorio = ontem;
  const inputVal = dateToInputValue(ontem);
  const dateStr = ontem.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  document.getElementById('app-avatar').textContent = initials;
  document.getElementById('app-gerente').textContent = gerente;
  document.getElementById('app-posto').textContent = posto.nome;
  document.getElementById('card-gerente').textContent = gerente;
  document.getElementById('card-posto').textContent = posto.nome;
  document.getElementById('card-data-input').value = inputVal;
  document.getElementById('page-date').textContent = dateStr;

  // ================================================================
  // Reordena tanques pela ORDEM_COMB_APP — igual à planilha
  // G.C → G.A → Grid → ET → ET.AD → DS10 → DS500 → Octapro → Podium → GNV
  // Dentro do mesmo combustível, mantém a ordem original (TQ.1 antes TQ.2)
  // ================================================================
  const tanquesOrdenados = posto.tanques.slice().sort((a, b) => {
    const ia = ORDEM_COMB_APP.indexOf(a.fuel);
    const ib = ORDEM_COMB_APP.indexOf(b.fuel);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  buildTanques(tanquesOrdenados);
  buildVendas(posto.combustiveis);
  updateTotals();
  buildCarga(posto.combustiveis);
  resetCarga();
}

function buildTanques(tanques) {
  const body = document.getElementById('tanques-body');
  body.innerHTML = '';
  tanques.forEach(t => {
    const isVR  = t.arq === 'veederroot';
    const isGNV = t.arq === 'gnv';
    const row = document.createElement('div');
    row.className = 'tank-row';
    const inputBlock = isGNV
      ? `<div class="tank-vol" id="vol-${t.id}" style="color:var(--text3)">— GNV</div>`
      : isVR
        ? `<div class="tank-vol" id="vol-${t.id}">0 L</div>
           <div class="stepper">
             <button class="step-btn" onclick="stepChange('cm-${t.id}',-100)">−</button>
             <input class="step-input" id="cm-${t.id}" value="0" type="number" min="0"
               style="width:80px"
               oninput="updateVol('${t.id}', ${t.capacidade}, '${t.arq || ''}')">
             <button class="step-btn" onclick="stepChange('cm-${t.id}',100)">+</button>
           </div>
           <div style="font-size:0.7rem;color:var(--accent);margin-top:2px;text-align:center">Veeder-Root (litros)</div>`
        : `<div class="tank-vol" id="vol-${t.id}">0 L</div>
           <div class="stepper">
             <button class="step-btn" onclick="stepChange('cm-${t.id}',-1)">−</button>
             <input class="step-input" id="cm-${t.id}" value="0" type="number" min="0" max="260"
               oninput="updateVol('${t.id}', ${t.capacidade}, '${t.arq || ''}')">
             <button class="step-btn" onclick="stepChange('cm-${t.id}',1)">+</button>
           </div>`;
    row.innerHTML = `
      <div class="tank-info">
        <div class="tank-fuel">
          <span class="fuel-chip ${t.chip || ''}"></span>${t.fuel}
        </div>
        <div class="tank-name">${t.nome}</div>
        <div class="tank-cap">Cap: ${t.capacidade.toLocaleString('pt-BR')} L</div>
      </div>
      ${inputBlock}
    `;
    body.appendChild(row);
  });
}

function buildVendas(combustiveis) {
  const body = document.getElementById('vendas-body');
  body.innerHTML = '';
  combustiveis.forEach(c => {
    const div = document.createElement('div');
    div.className = 'fuel-row';
    div.innerHTML = `
      <span class="fuel-label">
        <span class="fuel-chip ${c.chip}"></span>${c.label}
      </span>
      <div class="stepper">
        <button class="step-btn" onclick="stepChange('venda-${c.id}',-100)">−</button>
        <input class="step-input" id="venda-${c.id}" value="0" type="number" min="0"
          style="width:70px" oninput="updateTotals()">
        <button class="step-btn" onclick="stepChange('venda-${c.id}',100)">+</button>
      </div>
    `;
    body.appendChild(div);
  });
}

function updateVol(id, cap, arq) {
  const cm = parseInt(document.getElementById('cm-' + id).value) || 0;
  const vol = cmToLitros(cm, cap, arq);
  document.getElementById('vol-' + id).textContent = vol.toLocaleString('pt-BR') + ' L';
}

function stepChange(id, delta) {
  const el = document.getElementById(id);
  const val = parseInt(el.value) || 0;
  const min = parseInt(el.min) || 0;
  const max = el.max ? parseInt(el.max) : Infinity;
  el.value = Math.min(max, Math.max(min, val + delta));
  el.dispatchEvent(new Event('input'));
}

function updateTotals() {
  if (!currentPosto) return;
  let total = 0;
  currentPosto.combustiveis.forEach(c => {
    const el = document.getElementById('venda-' + c.id);
    if (el) total += parseInt(el.value) || 0;
  });
  document.getElementById('total-vendas').textContent = total.toLocaleString('pt-BR') + ' L';
}

/* =====================  SAVE  ===================== */
const SHEETS_URL = window._SHEETS_URL;

function salvarFechamento() {
  if (!cargaRespondida) {
    showToast('Atenção', 'Responda a seção "Recebeu Carga Hoje?" antes de salvar.');
    return;
  }
  const btn = document.getElementById('btn-salvar-fechamento');
  btn.textContent = '⏳ Salvando...';
  btn.disabled = true;

  // Monta string de tanques na ORDEM_COMB_APP (igual à exibição e à planilha)
  const tanquesOrdenados = currentPosto.tanques.slice().sort((a, b) => {
    const ia = ORDEM_COMB_APP.indexOf(a.fuel);
    const ib = ORDEM_COMB_APP.indexOf(b.fuel);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  const tanqueInfo = tanquesOrdenados.map(t => {
    const cm  = document.getElementById('cm-' + t.id)?.value || 0;
    const vol = (t.arq === 'gnv') ? 0 : cmToLitros(parseInt(cm), t.capacidade, t.arq);
    return t.arq === 'gnv'
      ? `${t.nome} (${t.fuel}): GNV`
      : t.arq === 'veederroot'
        ? `${t.nome} (${t.fuel}): ${parseInt(cm).toLocaleString('pt-BR')}L`
        : `${t.nome} (${t.fuel}): ${cm}cm = ${vol.toLocaleString('pt-BR')}L`;
  }).join(' | ');

  const vendasInfo = currentPosto.combustiveis.map(c => {
    const val = document.getElementById('venda-' + c.id)?.value || 0;
    return `${c.label}: ${parseInt(val).toLocaleString('pt-BR')}L`;
  }).join(' | ');

  const totalVendas = document.getElementById('total-vendas')?.textContent || '0 L';

  const lubSoutag = document.getElementById('lub-soutag')?.value || 0;
  const lubDia    = document.getElementById('lub-dia')?.value || 0;

  const cargaInfo = currentPosto.combustiveis.map(c => {
    const el = document.getElementById('carga-' + c.id);
    const litros = cargaRespondida === 'sim'
      ? (parseInt(el?.dataset.val) || 0)
      : 0;
    return `${c.label}: ${litros}L`;
  }).join(' | ');

  const now  = new Date();
  const data = dateToBR(dataRelatorio);
  const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const payload = {
    data,
    hora,
    posto:         currentPosto.nome,
    gerente:       currentUser.gerente,
    tanques:       tanqueInfo,
    vendas:        vendasInfo,
    totalVendas,
    lubSoutag,
    lubDia,
    cargaRecebida: cargaRespondida,
    carga:         cargaInfo
  };

  fetch(SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(() => {
    btn.textContent = '💾 Salvar Fechamento Diário';
    btn.disabled = false;
    showToast('Fechamento salvo com sucesso!', `${currentPosto.nome} — ${data} às ${hora}`);
    resetCarga();
  })
  .catch(() => {
    btn.textContent = '💾 Salvar Fechamento Diário';
    btn.disabled = false;
    showToast('Erro ao salvar', 'Verifique sua conexão e tente novamente.');
  });
}

function showToast(title, msg) {
  const toast = document.getElementById('toast');
  toast.querySelector('.toast-title').textContent = '✅ ' + title;
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

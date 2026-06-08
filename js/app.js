// JBRETAS — App: Login, Fechamento, Funções principais

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

  // Procura o usuário no DB
  let foundUser = null;
  let foundPosto = null;
  for (const key of Object.keys(DB)) {
    const posto = DB[key];
    const user  = posto.users && posto.users.find(u => u.email.toLowerCase() === email);
    if (user) { foundUser = user; foundPosto = posto; break; }
  }

  if (!foundUser) {
    exibirMsgModal('E-mail não encontrado no sistema.', 'err');
    return;
  }

  // Modo teste: se EmailJS não configurado, exibe senha na tela
  if (EMAILJS_SERVICE_ID === 'SEU_SERVICE_ID') {
    exibirMsgModal('⚠ EmailJS não configurado. Senha: ' + foundUser.senha, 'err');
    return;
  }

  btn.disabled = true;
  btn.textContent = '⏳ Enviando...';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: foundUser.email,
      to_name:  foundUser.gerente,
      senha:    foundUser.senha,
      posto:    foundPosto.nome,
    });
    exibirMsgModal('✅ E-mail enviado! Verifique sua caixa de entrada.', 'ok');
    btn.textContent = '✅ ENVIADO';
    setTimeout(fecharModalSenha, 3000);
  } catch (err) {
    console.error('EmailJS erro:', err);
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
  // Remove tudo que não for dígito
  const digits = el.value.replace(/\D/g, '');
  const num    = parseInt(digits) || 0;
  el.dataset.val = num;
  // Exibe com ponto de milhar
  el.value = num === 0 ? '0' : num.toLocaleString('pt-BR');
}

/* Stepper dos campos de carga — usa dataset.val para guardar o valor numérico */
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

function doLogin() {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const senha = document.getElementById('login-senha').value;
  const lembrar = document.getElementById('lembrar-check').checked;

  let foundUser = null;
  let foundPosto = null;
  for (const key of Object.keys(DB)) {
    const posto = DB[key];
    const user = posto.users && posto.users.find(u => u.email.toLowerCase() === email && u.senha === senha);
    if (user) { foundUser = user; foundPosto = posto; break; }
  }

  if (!foundUser) {
    document.getElementById('login-error').style.display = 'block';
    return;
  }

  /* Salvar ou limpar credenciais conforme checkbox */
  try {
    if (lembrar) {
      localStorage.setItem('jbretas_remember', JSON.stringify({ email, senha }));
    } else {
      localStorage.removeItem('jbretas_remember');
    }
  } catch(e) {}

  document.getElementById('login-error').style.display = 'none';
  currentUser = foundUser;
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
  /* Não limpa o campo se "lembrar de mim" estava ativo */
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

// Data do relatório — padrão = ontem (gerente envia hoje o relatório de ontem)
let dataRelatorio = null; // será definida no initApp

function getOntem() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
}

function dateToInputValue(d) {
  // Formato YYYY-MM-DD para input type=date
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

function dateToBR(d) {
  return d.toLocaleDateString('pt-BR');
}

function inputValueToDate(val) {
  // val = "YYYY-MM-DD"
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

  // Padrão: ontem (relatório enviado hoje referente a ontem)
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

  buildTanques(posto.tanques);
  buildVendas(posto.combustiveis);
  updateTotals();
  buildCarga(posto.combustiveis);
  resetCarga();
}

function buildTanques(tanques) {
  const body = document.getElementById('tanques-body');
  body.innerHTML = '';
  tanques.forEach(t => {
    const row = document.createElement('div');
    row.className = 'tank-row';
    row.innerHTML = `
      <div class="tank-info">
        <div class="tank-fuel">
          <span class="fuel-chip ${t.chip}"></span>${t.fuel}
        </div>
        <div class="tank-name">${t.nome}</div>
        <div class="tank-cap">Cap: ${t.capacidade.toLocaleString('pt-BR')} L</div>
      </div>
      <div class="tank-vol" id="vol-${t.id}">0 L</div>
      <div class="stepper">
        <button class="step-btn" onclick="stepChange('cm-${t.id}',-1)">−</button>
        <input class="step-input" id="cm-${t.id}" value="0" type="number" min="0" max="200"
          oninput="updateVol('${t.id}', ${t.capacidade})">
        <button class="step-btn" onclick="stepChange('cm-${t.id}',1)">+</button>
      </div>
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

function updateVol(id, cap) {
  const cm = parseInt(document.getElementById('cm-' + id).value) || 0;
  const vol = cmToLitros(cm, cap);
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
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwwIneDa-sT8GLJ9otPAVhMVxsqBWk2TX6C_pXQe1vjz6L261chb8Jn6WuYs1RHsuLW/exec';

function salvarFechamento() {
  if (!cargaRespondida) {
    showToast('Atenção', 'Responda a seção "Recebeu Carga Hoje?" antes de salvar.');
    return;
  }
  const btn = document.getElementById('btn-salvar-fechamento');
  btn.textContent = '⏳ Salvando...';
  btn.disabled = true;

  const tanqueInfo = currentPosto.tanques.map(t => {
    const cm = document.getElementById('cm-' + t.id)?.value || 0;
    const vol = cmToLitros(parseInt(cm), t.capacidade);
    return `${t.nome} (${t.fuel}): ${cm}cm = ${vol.toLocaleString('pt-BR')}L`;
  }).join(' | ');

  const vendasInfo = currentPosto.combustiveis.map(c => {
    const val = document.getElementById('venda-' + c.id)?.value || 0;
    return `${c.label}: ${parseInt(val).toLocaleString('pt-BR')}L`;
  }).join(' | ');

  const totalVendas = document.getElementById('total-vendas')?.textContent || '0 L';

  const lubSoutag = document.getElementById('lub-soutag')?.value || 0;
  const lubDia    = document.getElementById('lub-dia')?.value || 0;

  /* Carga por combustível */
  const cargaInfo = currentPosto.combustiveis.map(c => {
    const el = document.getElementById('carga-' + c.id);
    const litros = cargaRespondida === 'sim'
      ? (parseInt(el?.dataset.val) || 0)
      : 0;
    return `${c.label}: ${litros}L`;
  }).join(' | ');

  const now  = new Date();
  const data = dateToBR(dataRelatorio);  // data do relatório (ontem por padrão)
  const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // hora do envio

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

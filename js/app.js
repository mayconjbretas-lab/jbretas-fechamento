// JBRETAS — App: Login, Fechamento, Funções principais
// v2.0 — Migrado para Railway API (sem Apps Script)

let currentUser = null;
let currentPosto = null;
let JWT_TOKEN = null;

const API_URL = 'https://jbretas-api-service-production.up.railway.app';

const ORDEM_COMB_APP = [
  'GASOLINA COMUM','GASOLINA ADITIVADA','Gasolina Grid',
  'ETANOL','ETANOL ADITIVADO','DIESEL S-10','DIESEL S-500',
  'Gasolina Octapro','Gasolina Premium Podium','GNV'
];

/* =====================  LOGIN  ===================== */
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
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('modal-senha').addEventListener('click', function(e) {
    if (e.target === this) fecharModalSenha();
  });
});

async function enviarSenha() {
  const email = document.getElementById('recuperar-email').value.trim().toLowerCase();
  const btn   = document.getElementById('btn-recuperar');
  document.getElementById('modal-msg').style.display = 'none';
  if (!email) { exibirMsgModal('Por favor, informe seu e-mail.', 'err'); return; }
  btn.disabled = true;
  btn.textContent = '⏳ Enviando...';
  try {
    const url  = window._SHEETS_URL + '?tipo=recuperar&email=' + encodeURIComponent(email);
    const resp = await fetch(url);
    const json = await resp.json();
    if (!json || json.erro || !json.encontrado) {
      exibirMsgModal('E-mail não encontrado no sistema.', 'err');
      btn.disabled = false;
      btn.textContent = '📧 ENVIAR SENHA POR E-MAIL';
      return;
    }
    await emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', {
      to_email: json.email, to_name: json.gerente, senha: json.senha, posto: json.posto,
    });
    exibirMsgModal('✅ E-mail enviado!', 'ok');
    btn.textContent = '✅ ENVIADO';
    setTimeout(fecharModalSenha, 3000);
  } catch (err) {
    exibirMsgModal('Erro ao enviar e-mail.', 'err');
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

/* ===== CARGA ===== */
let cargaRespondida = false;

function setCarga(opcao) {
  cargaRespondida = opcao;
  document.getElementById('btn-carga-sim').className = 'toggle-carga-btn' + (opcao === 'sim' ? ' sim-ativo' : '');
  document.getElementById('btn-carga-nao').className = 'toggle-carga-btn' + (opcao === 'nao' ? ' nao-ativo' : '');
  const campos = document.getElementById('carga-campos');
  if (opcao === 'sim') campos.classList.add('visivel');
  else {
    campos.classList.remove('visivel');
    if (currentPosto) currentPosto.combustiveis.forEach(c => {
      const el = document.getElementById('carga-' + c.id);
      if (el) el.value = '0';
    });
  }
  const btnSalvar = document.getElementById('btn-salvar-fechamento');
  const statusMsg = document.getElementById('carga-status-msg');
  btnSalvar.classList.remove('btn-save-blocked');
  btnSalvar.textContent = '💾 Salvar Fechamento Diário';
  statusMsg.textContent = opcao === 'sim' ? '🚚 Carga informada — preencha os litros' : '✓ Sem carga hoje';
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
function formatCargaInput(el) {
  const num = parseInt(el.value.replace(/\D/g, '')) || 0;
  el.dataset.val = num;
  el.value = num === 0 ? '0' : num.toLocaleString('pt-BR');
}
function stepCarga(id, delta) {
  const el = document.getElementById(id);
  const novo = Math.max(0, (parseInt(el.dataset.val) || 0) + delta);
  el.dataset.val = novo;
  el.value = novo === 0 ? '0' : novo.toLocaleString('pt-BR');
}
function resetCarga() {
  cargaRespondida = false;
  ['btn-carga-sim','btn-carga-nao'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.className = 'toggle-carga-btn';
  });
  const campos = document.getElementById('carga-campos');
  if (campos) campos.classList.remove('visivel');
  if (currentPosto) currentPosto.combustiveis.forEach(c => {
    const el = document.getElementById('carga-' + c.id);
    if (el) { el.value = '0'; el.dataset.val = '0'; }
  });
  const btnSalvar = document.getElementById('btn-salvar-fechamento');
  const statusMsg = document.getElementById('carga-status-msg');
  if (btnSalvar) { btnSalvar.classList.add('btn-save-blocked'); btnSalvar.textContent = '🔒 RESPONDA A CARGA PARA SALVAR'; }
  if (statusMsg) { statusMsg.textContent = '⚠ seção "Recebeu Carga?" obrigatória'; statusMsg.style.color = 'var(--danger)'; }
}

/* ===== TOGGLE OLHO ===== */
function toggleSenha() {
  const input = document.getElementById('login-senha');
  const btn   = document.getElementById('btn-olho');
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
  else { input.type = 'password'; btn.textContent = '👁'; }
}

/* =====================  LOGIN — NOVA API  ===================== */
async function doLogin() {
  const email   = document.getElementById('login-email').value.trim().toLowerCase();
  const senha   = document.getElementById('login-senha').value;
  const lembrar = document.getElementById('lembrar-check').checked;
  const errEl   = document.getElementById('login-error');
  const btn     = document.getElementById('btn-login');

  errEl.style.display = 'none';
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Entrando...'; }

  try {
    const resp = await fetch(API_URL + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    const json = await resp.json();
    if (btn) { btn.disabled = false; btn.textContent = '▶ ENTRAR'; }

    if (!json.success || !json.token) {
      errEl.style.display = 'block';
      return;
    }

    JWT_TOKEN = json.token;
    localStorage.setItem('jbretas_token', JWT_TOKEN);

    // Encontra posto no DB local pelo nome retornado pela API
    const nomePostoApi = json.usuario?.posto?.nome || '';
    const postoKey = Object.keys(DB).find(k =>
      DB[k].nome.toUpperCase() === nomePostoApi.toUpperCase()
    );
    const foundPosto = postoKey ? DB[postoKey] : null;

    if (json.usuario?.perfil === 'GERENTE' && !foundPosto) {
      errEl.style.display = 'block';
      return;
    }

    try {
      if (lembrar) localStorage.setItem('jbretas_remember', JSON.stringify({ email, senha }));
      else localStorage.removeItem('jbretas_remember');
    } catch(e) {}

    currentUser  = {
      email:   json.usuario.email,
      gerente: json.usuario.nome,
      perfil:  json.usuario.perfil,
    };
    currentPosto = foundPosto;

    initApp();
    showScreen('app');

  } catch (err) {
    if (btn) { btn.disabled = false; btn.textContent = '▶ ENTRAR'; }
    console.error('Erro no login:', err);
    errEl.style.display = 'block';
  }
}

document.getElementById('login-senha').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});

function doLogout() {
  JWT_TOKEN = null; currentUser = null; currentPosto = null;
  localStorage.removeItem('jbretas_token');
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

function getOntem() { const d = new Date(); d.setDate(d.getDate()-1); return d; }
function dateToInputValue(d) {
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function dateToBR(d) { return d.toLocaleDateString('pt-BR'); }
function inputValueToDate(val) { const [y,m,d] = val.split('-').map(Number); return new Date(y,m-1,d); }

function atualizarDataRelatorio(val) {
  dataRelatorio = inputValueToDate(val);
  const aviso = document.getElementById('data-aviso');
  const dataBR = dateToBR(dataRelatorio);
  if (dataBR === dateToBR(getOntem())) {
    aviso.textContent = '⚠ Relatório referente a ontem'; aviso.style.color = 'var(--warning)';
  } else if (dataBR === dateToBR(new Date())) {
    aviso.textContent = '⚠ Data de hoje — confirme se está correto'; aviso.style.color = 'var(--danger)';
  } else {
    aviso.textContent = '📅 Data selecionada: ' + dataBR; aviso.style.color = 'var(--accent)';
  }
}

function initApp() {
  const gerente = currentUser.gerente;
  const posto   = currentPosto;
  const initials = gerente.split(' ').map(w => w[0]).slice(0,2).join('');
  const ontem    = getOntem();
  dataRelatorio  = ontem;
  const inputVal = dateToInputValue(ontem);
  const dateStr  = ontem.toLocaleDateString('pt-BR', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  document.getElementById('app-avatar').textContent  = initials;
  document.getElementById('app-gerente').textContent = gerente;
  document.getElementById('app-posto').textContent   = posto ? posto.nome : '—';
  document.getElementById('card-gerente').textContent = gerente;
  document.getElementById('card-posto').textContent   = posto ? posto.nome : '—';
  document.getElementById('card-data-input').value    = inputVal;
  document.getElementById('page-date').textContent    = dateStr;

  if (posto) {
    const tanquesOrdenados = posto.tanques.slice().sort((a,b) => {
      const ia = ORDEM_COMB_APP.indexOf(a.fuel);
      const ib = ORDEM_COMB_APP.indexOf(b.fuel);
      return (ia===-1?99:ia)-(ib===-1?99:ib);
    });
    buildTanques(tanquesOrdenados);
    buildVendas(posto.combustiveis);
    buildCarga(posto.combustiveis);
  }
  updateTotals();
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
               oninput="updateVol('${t.id}', ${t.capacidade}, '${t.arq||''}')">
             <button class="step-btn" onclick="stepChange('cm-${t.id}',100)">+</button>
           </div>
           <div style="font-size:0.7rem;color:var(--accent);margin-top:2px;text-align:center">Veeder-Root (litros)</div>`
        : `<div class="tank-vol" id="vol-${t.id}">0 L</div>
           <div class="stepper">
             <button class="step-btn" onclick="stepChange('cm-${t.id}',-1)">−</button>
             <input class="step-input" id="cm-${t.id}" value="0" type="number" min="0" max="260"
               oninput="updateVol('${t.id}', ${t.capacidade}, '${t.arq||''}')">
             <button class="step-btn" onclick="stepChange('cm-${t.id}',1)">+</button>
           </div>`;
    row.innerHTML = `
      <div class="tank-info">
        <div class="tank-fuel"><span class="fuel-chip ${t.chip||''}"></span>${t.fuel}</div>
        <div class="tank-name">${t.nome}</div>
        <div class="tank-cap">Cap: ${t.capacidade.toLocaleString('pt-BR')} L</div>
      </div>${inputBlock}`;
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
      <span class="fuel-label"><span class="fuel-chip ${c.chip||''}"></span>${c.label}</span>
      <div class="stepper">
        <button class="step-btn" onclick="stepChange('venda-${c.id}',-100)">−</button>
        <input class="step-input" id="venda-${c.id}" value="0" type="number" min="0"
          style="width:70px" oninput="updateTotals()">
        <button class="step-btn" onclick="stepChange('venda-${c.id}',100)">+</button>
      </div>`;
    body.appendChild(div);
  });
}

function updateVol(id, cap, arq) {
  const cm  = parseInt(document.getElementById('cm-'+id).value) || 0;
  const vol = cmToLitros(cm, cap, arq);
  document.getElementById('vol-'+id).textContent = vol.toLocaleString('pt-BR') + ' L';
  const stepperEl = document.getElementById('cm-'+id)?.closest('.stepper');
  if (stepperEl) stepperEl.classList.remove('erro');
}

function stepChange(id, delta) {
  const el = document.getElementById(id);
  const val = parseInt(el.value) || 0;
  const min = parseInt(el.min) || 0;
  const max = el.max ? parseInt(el.max) : Infinity;
  el.value = Math.min(max, Math.max(min, val+delta));
  el.dispatchEvent(new Event('input'));
}

function updateTotals() {
  if (!currentPosto) return;
  let total = 0;
  currentPosto.combustiveis.forEach(c => {
    const el = document.getElementById('venda-'+c.id);
    if (el) {
      total += parseInt(el.value) || 0;
      el.closest('.stepper')?.classList.remove('erro');
    }
  });
  document.getElementById('total-vendas').textContent = total.toLocaleString('pt-BR') + ' L';
}

function validarMedicaoVenda() {
  if (!currentPosto) return true;
  document.querySelectorAll('#tanques-body .stepper.erro, #vendas-body .stepper.erro')
    .forEach(el => el.classList.remove('erro'));
  for (const t of currentPosto.tanques) {
    if (t.arq === 'gnv') continue;
    const input = document.getElementById('cm-'+t.id);
    if ((parseInt(input?.value) || 0) <= 0) {
      input.closest('.stepper')?.classList.add('erro');
      input.scrollIntoView({ behavior:'smooth', block:'center' });
      input.focus();
      showToast('Medição obrigatória', `Preencha a medição de "${t.nome} (${t.fuel})".`);
      return false;
    }
  }
  for (const c of currentPosto.combustiveis) {
    const input = document.getElementById('venda-'+c.id);
    if ((parseInt(input?.value) || 0) <= 0) {
      input.closest('.stepper')?.classList.add('erro');
      input.scrollIntoView({ behavior:'smooth', block:'center' });
      input.focus();
      showToast('Venda obrigatória', `Preencha a venda de "${c.label}".`);
      return false;
    }
  }
  return true;
}

/* =====================  SAVE — NOVA API  ===================== */
async function salvarFechamento() {
  if (!validarMedicaoVenda()) return;
  if (!cargaRespondida) {
    showToast('Atenção', 'Responda a seção "Recebeu Carga Hoje?" antes de salvar.');
    return;
  }

  const btn = document.getElementById('btn-salvar-fechamento');
  btn.textContent = '⏳ Salvando...';
  btn.disabled = true;

  // Monta string de tanques na ordem padronizada
  const tanquesOrdenados = currentPosto.tanques.slice().sort((a,b) => {
    const ia = ORDEM_COMB_APP.indexOf(a.fuel);
    const ib = ORDEM_COMB_APP.indexOf(b.fuel);
    return (ia===-1?99:ia)-(ib===-1?99:ib);
  });

  const tanqueInfo = tanquesOrdenados.map(t => {
    const cm  = document.getElementById('cm-'+t.id)?.value || 0;
    const vol = (t.arq === 'gnv') ? 0 : cmToLitros(parseInt(cm), t.capacidade, t.arq);
    if (t.arq === 'gnv')        return `${t.nome} (${t.fuel}): GNV`;
    if (t.arq === 'veederroot') return `${t.nome} (${t.fuel}): ${parseInt(cm).toLocaleString('pt-BR')}L`;
    return `${t.nome} (${t.fuel}): ${cm}cm = ${vol.toLocaleString('pt-BR')}L`;
  }).join(' | ');

  const vendasInfo = currentPosto.combustiveis.map(c => {
    const val = document.getElementById('venda-'+c.id)?.value || 0;
    return `${c.label}: ${parseInt(val).toLocaleString('pt-BR')}L`;
  }).join(' | ');

  const cargaInfo = currentPosto.combustiveis.map(c => {
    const el = document.getElementById('carga-'+c.id);
    const litros = cargaRespondida === 'sim' ? (parseInt(el?.dataset.val) || 0) : 0;
    return `${c.label}: ${litros}L`;
  }).join(' | ');

  const now  = new Date();
  const data = dateToBR(dataRelatorio);
  const hora = now.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });

  const payload = {
    data, hora,
    posto:         currentPosto.nome,
    gerente:       currentUser.gerente,
    tanques:       tanqueInfo,
    vendas:        vendasInfo,
    totalVendas:   document.getElementById('total-vendas')?.textContent || '0 L',
    lubSoutag:     document.getElementById('lub-soutag')?.value || 0,
    lubDia:        document.getElementById('lub-dia')?.value || 0,
    cargaRecebida: cargaRespondida,
    carga:         cargaInfo,
  };

  try {
    const resp = await fetch(API_URL + '/fechamento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JWT_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const json = await resp.json();

    btn.textContent = '💾 Salvar Fechamento Diário';
    btn.disabled = false;

    if (json.success) {
      showToast('Fechamento salvo!', `${currentPosto.nome} — ${data} às ${hora}`);
      resetCarga();
    } else {
      showToast('Erro ao salvar', json.erro || 'Tente novamente.');
    }
  } catch (err) {
    btn.textContent = '💾 Salvar Fechamento Diário';
    btn.disabled = false;
    console.error('Erro no fechamento:', err);
    showToast('Erro de conexão', 'Verifique sua internet e tente novamente.');
  }
}

function showToast(title, msg) {
  const toast = document.getElementById('toast');
  toast.querySelector('.toast-title').textContent = '✅ ' + title;
  document.getElementById('toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ===== MENU ===== */
function toggleMenu() {
  document.getElementById('dropdown-menu').classList.toggle('hidden');
}
function abrirColeta() {
  document.getElementById('dropdown-menu').classList.add('hidden');
  showScreen('coleta');
}
function abrirCopasa() {
  document.getElementById('dropdown-menu').classList.add('hidden');
  showScreen('copasa');
}
function voltarParaApp() { showScreen('app'); }

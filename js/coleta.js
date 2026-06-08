// JBRETAS — Coleta de Preços

/* ===================== COLETA DE PREÇOS ===================== */
/* =====================================================================
   CALCULADORA DE PREÇOS — coleta de preços
   Comportamento: dígitos acumulam da direita para a esquerda.
   Exemplos: 5→"0,05"  56→"0,56"  569→"5,69"  5699→"56,99"
   Máximo 4 dígitos = R$ 99,99
   Backspace → apaga último dígito
   Delete / Escape → zera
   ===================================================================== */

const PRECO_IDS = ['preco-et', 'preco-gc', 'preco-ga', 'preco-s10', 'preco-s500'];

function initPrecoInputs() {
  PRECO_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el._digitos = '';
    el.value = '';
    el.removeAttribute('readonly');
    const novo = el.cloneNode(true);
    el.parentNode.replaceChild(novo, el);
    const nel = document.getElementById(id);
    nel._digitos = '';
    nel.addEventListener('input', precoInputHandler);
    nel.addEventListener('keydown', precoKeyHandler);
    nel.addEventListener('focus', function() { this.select(); });
  });
}

function precoInputHandler(e) {
  const el = e.target;
  const digits = el.value.replace(/\D/g, '').slice(0, 4);
  el._digitos = digits;
  renderPreco(el);
  setTimeout(() => {
    el.selectionStart = el.selectionEnd = el.value.length;
  }, 0);
}

function precoKeyHandler(e) {
  if (e.key === 'Escape' || e.key === 'Delete') {
    e.preventDefault();
    e.target._digitos = '';
    renderPreco(e.target);
  }
}

function renderPreco(el) {
  const d = el._digitos || '';
  if (!d) { el.value = ''; el.placeholder = '0,00'; return; }
  const pad = d.padStart(2, '0');
  const intPart = pad.slice(0, -2).replace(/^0+/, '') || '0';
  const decPart = pad.slice(-2);
  el.value = intPart + ',' + decPart;
}

function getPrecoStr(el) {
  if (!el || !el._digitos || el._digitos === '') return '-';
  return el.value;
}

function resetPrecoInputs() {
  PRECO_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el._digitos = '';
    el.value = '';
    el.placeholder = '0,00';
  });
}
/* ===== /CALCULADORA DE PREÇOS ===== */

let geoData = null;
let fotoBase64 = null;
const SHEETS_URL_COLETA = 'https://script.google.com/macros/s/AKfycbwwIneDa-sT8GLJ9otPAVhMVxsqBWk2TX6C_pXQe1vjz6L261chb8Jn6WuYs1RHsuLW/exec';

/* Verifica se o posto logado é o P. JA (P16) */
function isPosotJA() {
  if (!currentPosto) return false;
  const key = Object.keys(DB).find(k => DB[k] === currentPosto);
  return key === 'P16';
}

function abrirColeta() {
  document.getElementById('dropdown-menu').classList.add('hidden');
  document.getElementById('screen-app').style.display = 'none';
  document.getElementById('screen-coleta').style.display = 'block';
  document.getElementById('screen-coleta').classList.add('active');
  popularPostosAlvo();
  capturarGeo();
  renderHistorico();
  /* Ajusta label do último campo de preço conforme o posto */
  ajustarCampoColeta();
  /* Inicializa a calculadora de preços */
  initPrecoInputs();
}

/* ===== NOVIDADE: troca label do campo s500 para P. JA ===== */
function ajustarCampoColeta() {
  const labelEl = document.getElementById('label-preco-s500');
  const inputEl = document.getElementById('preco-s500');
  if (!labelEl || !inputEl) return;
  const key   = Object.keys(DB).find(k => DB[k] === currentPosto);
  const extra = CAMPO_EXTRA_COLETA[key];
  if (extra) {
    labelEl.textContent = extra.emoji + ' ' + extra.label;
    inputEl.dataset.chaveExtra = extra.chave;
  } else {
    labelEl.textContent = '⚫ DIESEL S500';
    inputEl.dataset.chaveExtra = 's500';
  }
}

function voltarParaApp() {
  document.getElementById('screen-coleta').style.display = 'none';
  document.getElementById('screen-coleta').classList.remove('active');
  document.getElementById('screen-app').style.display = 'block';
}

function popularPostosAlvo() {
  const sel = document.getElementById('posto-alvo-select');
  sel.innerHTML = '<option value="">Selecione o posto alvo...</option>';
  if (!currentPosto) return;
  const key = Object.keys(DB).find(k => DB[k] === currentPosto);
  const comps = CONCORRENTES[key] || [];
  comps.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
}

function capturarGeo() {
  geoData = null;
  const dot = document.getElementById('geo-dot');
  const status = document.getElementById('geo-status');
  dot.className = 'geo-dot';
  status.className = 'geo-status';
  status.textContent = 'Capturando localização...';
  if (!navigator.geolocation) {
    status.textContent = 'Geolocalização não suportada';
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      geoData = { lat: pos.coords.latitude.toFixed(6), lng: pos.coords.longitude.toFixed(6) };
      dot.className = 'geo-dot ok';
      status.className = 'geo-status ok';
      status.textContent = `✓ ${geoData.lat}, ${geoData.lng}`;
    },
    () => {
      status.textContent = 'Não foi possível capturar localização';
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function abrirCamera() {
  document.getElementById('foto-input').click();
}

function onFotoSelected(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    fotoBase64 = e.target.result;
    document.getElementById('foto-preview').src = fotoBase64;
    document.getElementById('foto-preview').style.display = 'block';
    document.getElementById('foto-placeholder').style.display = 'none';
    document.getElementById('foto-area').classList.add('has-foto');
  };
  reader.readAsDataURL(file);
}

function switchColetaTab(tab) {
  const isColeta = tab === 'coleta';
  document.getElementById('painel-coleta').style.display = isColeta ? 'block' : 'none';
  document.getElementById('painel-historico').style.display = isColeta ? 'none' : 'block';
  document.getElementById('tab-coleta').style.background = isColeta ? 'var(--accent)' : 'transparent';
  document.getElementById('tab-coleta').style.color = isColeta ? '#000' : 'var(--text3)';
  document.getElementById('tab-hist').style.background = isColeta ? 'transparent' : 'var(--accent)';
  document.getElementById('tab-hist').style.color = isColeta ? 'var(--text3)' : '#000';
  if (!isColeta) renderHistorico();
}

function renderHistorico() {
  const lista = document.getElementById('historico-lista');
  const hist = JSON.parse(localStorage.getItem('coleta_hist') || '[]');
  if (!hist.length) {
    lista.innerHTML = '<p style="color:var(--text3);font-size:0.85rem;text-align:center;padding:1rem 0;">Nenhuma coleta registrada ainda.</p>';
    return;
  }
  lista.innerHTML = hist.slice(-20).reverse().map(h => `
    <div class="historico-item">
      <div class="historico-meta">${h.data} às ${h.hora} · ${h.posto}</div>
      <div class="historico-posto">${h.postoAlvo}</div>
      <div class="historico-precos">
        ${h.et     ? `<span class="historico-preco-tag">ET R$${h.et}</span>` : ''}
        ${h.gc     ? `<span class="historico-preco-tag">GC R$${h.gc}</span>` : ''}
        ${h.ga     ? `<span class="historico-preco-tag">GA R$${h.ga}</span>` : ''}
        ${h.s10    ? `<span class="historico-preco-tag">S10 R$${h.s10}</span>` : ''}
        ${h.s500   ? `<span class="historico-preco-tag">S500 R$${h.s500}</span>` : ''}
        ${h.podium ? `<span class="historico-preco-tag">PODIUM R$${h.podium}</span>` : ''}
      </div>
    </div>
  `).join('');
}

function salvarColeta() {
  const postoAlvo = document.getElementById('posto-alvo-select').value;
  if (!postoAlvo) { showToast('Atenção', 'Selecione o posto alvo!'); return; }
  if (!fotoBase64) { showToast('Atenção', 'A foto é obrigatória!'); return; }

  /* Lê valores via calculadora de preços */
  const et      = getPrecoStr(document.getElementById('preco-et'));
  const gc      = getPrecoStr(document.getElementById('preco-gc'));
  const ga      = getPrecoStr(document.getElementById('preco-ga'));
  const s10     = getPrecoStr(document.getElementById('preco-s10'));
  const s500Val = getPrecoStr(document.getElementById('preco-s500'));

  /* Fix podium: não usa || pois "-" é truthy em JS
     Verifica a chave configurada no campo dinamicamente */
  const isJA = isPosotJA();
  const s500   = isJA ? '-'      : s500Val;
  const podium = isJA ? s500Val  : '-';

  const now = new Date();
  const data = now.toLocaleDateString('pt-BR');
  const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const payload = {
    tipo: 'coleta_preco',
    data, hora,
    posto: currentPosto.nome,
    gerente: currentUser.gerente,
    postoAlvo,
    et: et || '-', gc: gc || '-', ga: ga || '-',
    s10: s10 || '-',
    s500,
    podium,
    lat: geoData ? geoData.lat : '-',
    lng: geoData ? geoData.lng : '-',
    foto: fotoBase64
  };

  /* Salvar no histórico local */
  const hist = JSON.parse(localStorage.getItem('coleta_hist') || '[]');
  hist.push({ data, hora, posto: currentPosto.nome, postoAlvo, et, gc, ga, s10, s500, podium });
  localStorage.setItem('coleta_hist', JSON.stringify(hist));

  const btn = document.getElementById('btn-salvar-coleta');
  btn.textContent = '⏳ Enviando...';
  btn.disabled = true;

  fetch(SHEETS_URL_COLETA, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(() => {
    btn.textContent = '💰 SALVAR COLETA DE PREÇOS';
    btn.disabled = false;
    showToast('Coleta salva!', `${postoAlvo} — ${data} às ${hora}`);
    /* Reset form */
    document.getElementById('posto-alvo-select').value = '';
    resetPrecoInputs();
    fotoBase64 = null;
    document.getElementById('foto-preview').style.display = 'none';
    document.getElementById('foto-placeholder').style.display = 'block';
    document.getElementById('foto-area').classList.remove('has-foto');
    capturarGeo();
  })
  .catch(() => {
    btn.textContent = '💰 SALVAR COLETA DE PREÇOS';
    btn.disabled = false;
    showToast('Erro ao salvar', 'Verifique sua conexão.');
  });
}


function toggleMenu() {
  document.getElementById("dropdown-menu").classList.toggle("hidden");
}

document.addEventListener("click", function(e) {
  const menu = document.getElementById("dropdown-menu");
  if (menu && !e.target.closest(".menu-dots") && !e.target.closest(".dropdown-menu")) {
    menu.classList.add("hidden");
  }
});

// ================================================================
// JBRETAS — Copasa: Consumo de Água
// ================================================================

const SHEETS_URL_COPASA = 'https://script.google.com/macros/s/AKfycbwwIneDa-sT8GLJ9otPAVhMVxsqBWk2TX6C_pXQe1vjz6L261chb8Jn6WuYs1RHsuLW/exec';

let copasaHistorico = []; // cache local dos registros do posto
let copasaTabAtiva = 'resumo';
let copasaChartBars = []; // refs das barras do gráfico

// ── Abrir tela Copasa ──────────────────────────────────────────
function abrirCopasa() {
  document.getElementById('dropdown-menu').classList.add('hidden');
  document.getElementById('screen-app').style.display = 'none';
  document.getElementById('screen-copasa').style.display = 'block';
  document.getElementById('screen-copasa').classList.add('active');
  carregarCopasa();
}

function voltarDosCopasa() {
  document.getElementById('screen-copasa').style.display = 'none';
  document.getElementById('screen-copasa').classList.remove('active');
  document.getElementById('screen-app').style.display = 'block';
}

// ── Carregar dados do Sheets ───────────────────────────────────
async function carregarCopasa() {
  const posto = currentPosto ? currentPosto.nome : '';
  if (!posto) return;

  document.getElementById('copasa-loading').style.display = 'flex';
  document.getElementById('copasa-content').style.display = 'none';

  try {
    const url = SHEETS_URL_COPASA + '?tipo=copasa&posto=' + encodeURIComponent(posto);
    const resp = await fetch(url);
    const json = await resp.json();
    if (json && json.registros) {
      copasaHistorico = json.registros; // [{data, leitura, consumo}]
    }
  } catch(e) {
    // Se falhar, usa cache localStorage
    const cached = localStorage.getItem('copasa_' + posto);
    if (cached) copasaHistorico = JSON.parse(cached);
  }

  document.getElementById('copasa-loading').style.display = 'none';
  document.getElementById('copasa-content').style.display = 'block';
  renderCopasaDashboard();
}

// ── Renderizar dashboard ───────────────────────────────────────
function renderCopasaDashboard() {
  const hist = copasaHistorico;
  const hoje = hist[hist.length - 1];
  const ontem = hist[hist.length - 2];

  // KPI: Consumo Hoje
  const consumoHoje = hoje ? hoje.consumo : null;
  const consumoOntem = ontem ? ontem.consumo : null;
  let varOntem = null;
  if (consumoHoje !== null && consumoOntem && consumoOntem > 0) {
    varOntem = ((consumoHoje - consumoOntem) / consumoOntem * 100).toFixed(1);
  }

  document.getElementById('kpi-hoje-val').textContent =
    consumoHoje !== null ? consumoHoje.toFixed(1) : '--';
  const badgeOntem = document.getElementById('kpi-hoje-badge');
  if (varOntem !== null) {
    const sobe = parseFloat(varOntem) > 0;
    badgeOntem.textContent = (sobe ? '↑' : '↓') + ' ' + Math.abs(varOntem) + '% vs ontem';
    badgeOntem.className = 'copasa-badge ' + (sobe ? 'badge-up' : 'badge-down');
    badgeOntem.style.display = 'inline-flex';
  } else {
    badgeOntem.style.display = 'none';
  }

  // KPI: Esta Semana
  const semana = consumosPeriodo(hist, 7);
  const semanaAnt = consumosPeriodo(hist, 14, 7);
  const totalSemana = semana.reduce((a, b) => a + b, 0);
  const totalSemanaAnt = semanaAnt.reduce((a, b) => a + b, 0);
  let varSemana = null;
  if (totalSemanaAnt > 0) varSemana = ((totalSemana - totalSemanaAnt) / totalSemanaAnt * 100).toFixed(1);
  document.getElementById('kpi-semana-val').textContent = totalSemana.toFixed(1);
  const badgeSemana = document.getElementById('kpi-semana-badge');
  if (varSemana !== null) {
    const sobe = parseFloat(varSemana) > 0;
    badgeSemana.textContent = (sobe ? '↑' : '↓') + ' ' + Math.abs(varSemana) + '% vs sem. ant.';
    badgeSemana.className = 'copasa-badge ' + (sobe ? 'badge-up' : 'badge-down');
    badgeSemana.style.display = 'inline-flex';
  } else {
    badgeSemana.style.display = 'none';
  }

  // KPI: Este Mês
  const mes = consumosMes(hist, 0);
  const mesAnt = consumosMes(hist, 1);
  const totalMes = mes.reduce((a, b) => a + b, 0);
  const totalMesAnt = mesAnt.reduce((a, b) => a + b, 0);
  let varMes = null;
  if (totalMesAnt > 0) varMes = ((totalMes - totalMesAnt) / totalMesAnt * 100).toFixed(1);
  document.getElementById('kpi-mes-val').textContent = totalMes.toFixed(1);
  const badgeMes = document.getElementById('kpi-mes-badge');
  if (varMes !== null) {
    const sobe = parseFloat(varMes) > 0;
    badgeMes.textContent = (sobe ? '↑' : '↓') + ' ' + Math.abs(varMes) + '% vs mês ant.';
    badgeMes.className = 'copasa-badge ' + (sobe ? 'badge-up' : 'badge-down');
    badgeMes.style.display = 'inline-flex';
  } else {
    badgeMes.style.display = 'none';
  }

  // KPI: Leitura Atual
  document.getElementById('kpi-leitura-val').textContent =
    hoje ? hoje.leitura.toFixed(1) : '--';

  // Gráfico últimos 14 dias
  renderGraficoCopasa(14);
}

// ── Gráfico de barras ──────────────────────────────────────────
function renderGraficoCopasa(dias) {
  const hist = copasaHistorico;
  const dados = hist.slice(-dias);
  const chart = document.getElementById('copasa-chart');
  chart.innerHTML = '';

  if (dados.length === 0) {
    chart.innerHTML = '<div style="color:var(--text3);font-size:0.8rem;text-align:center;padding:2rem;">Nenhum registro ainda</div>';
    return;
  }

  const maxVal = Math.max(...dados.map(d => d.consumo || 0), 0.1);
  const wrapper = document.createElement('div');
  wrapper.className = 'copasa-chart-wrapper';

  // Eixo Y (linhas de grade)
  const gridLines = 4;
  for (let i = gridLines; i >= 0; i--) {
    const line = document.createElement('div');
    line.className = 'copasa-grid-line';
    line.style.bottom = (i / gridLines * 100) + '%';
    const label = document.createElement('span');
    label.className = 'copasa-grid-label';
    label.textContent = (maxVal * i / gridLines).toFixed(1);
    line.appendChild(label);
    wrapper.appendChild(line);
  }

  // Barras
  const barsArea = document.createElement('div');
  barsArea.className = 'copasa-bars-area';

  const hoje = dados[dados.length - 1];

  dados.forEach((d, idx) => {
    const col = document.createElement('div');
    col.className = 'copasa-bar-col';

    const bar = document.createElement('div');
    bar.className = 'copasa-bar' + (d === hoje ? ' copasa-bar-hoje' : '');
    const pct = maxVal > 0 ? (d.consumo / maxVal * 100) : 0;
    bar.style.height = pct + '%';
    bar.setAttribute('data-date', d.data);
    bar.setAttribute('data-val', d.consumo.toFixed(1));

    // Tooltip
    bar.addEventListener('mouseenter', function(e) {
      showCopasaTooltip(e, d.data, d.consumo);
    });
    bar.addEventListener('mouseleave', hideCopasaTooltip);
    bar.addEventListener('touchstart', function(e) {
      e.preventDefault();
      showCopasaTooltip(e.touches[0], d.data, d.consumo);
      setTimeout(hideCopasaTooltip, 2000);
    });

    const label = document.createElement('div');
    label.className = 'copasa-bar-label';
    // Formata data dd/mm
    const parts = d.data.split('/');
    label.textContent = parts[0] + '/' + parts[1];

    col.appendChild(bar);
    col.appendChild(label);
    barsArea.appendChild(col);
  });

  wrapper.appendChild(barsArea);
  chart.appendChild(wrapper);

  // Tooltip element
  if (!document.getElementById('copasa-tooltip')) {
    const tip = document.createElement('div');
    tip.id = 'copasa-tooltip';
    tip.className = 'copasa-tooltip';
    document.body.appendChild(tip);
  }
}

function showCopasaTooltip(e, data, val) {
  const tip = document.getElementById('copasa-tooltip');
  tip.innerHTML = '<strong>' + data + '</strong><br>Consumo m³: ' + parseFloat(val).toFixed(1);
  tip.style.display = 'block';
  tip.style.left = (e.clientX + 12) + 'px';
  tip.style.top = (e.clientY - 40) + 'px';
}

function hideCopasaTooltip() {
  const tip = document.getElementById('copasa-tooltip');
  if (tip) tip.style.display = 'none';
}

// ── Trocar aba ─────────────────────────────────────────────────
function switchCopasaTab(tab) {
  copasaTabAtiva = tab;
  document.querySelectorAll('.copasa-tab').forEach(t => t.classList.remove('ativo'));
  document.querySelector('.copasa-tab[data-tab="' + tab + '"]').classList.add('ativo');

  const hist = copasaHistorico;

  if (tab === 'resumo') {
    renderCopasaDashboard();
    document.getElementById('copasa-kpis').style.display = 'grid';
    document.getElementById('copasa-grafico-section').style.display = 'block';
    document.getElementById('copasa-tabela-section').style.display = 'none';
    renderGraficoCopasa(14);
    return;
  }

  document.getElementById('copasa-kpis').style.display = 'none';
  document.getElementById('copasa-grafico-section').style.display = 'block';
  document.getElementById('copasa-tabela-section').style.display = 'block';

  let dias = 2;
  let titulo = '';
  if (tab === '2dias')     { dias = 2;   titulo = 'Últimos 2 Dias'; }
  if (tab === 'semanal')   { dias = 7;   titulo = 'Últimos 7 Dias'; }
  if (tab === 'mensal')    { dias = 30;  titulo = 'Últimos 30 Dias'; }
  if (tab === 'trimestral'){ dias = 90;  titulo = 'Últimos 90 Dias'; }

  document.getElementById('copasa-chart-title').textContent = '📊 ' + titulo;
  renderGraficoCopasa(dias);
  renderTabelaCopasa(dias);
}

// ── Tabela de registros ────────────────────────────────────────
function renderTabelaCopasa(dias) {
  const hist = copasaHistorico.slice(-dias);
  const tbody = document.getElementById('copasa-tbody');
  tbody.innerHTML = '';

  if (hist.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text3);padding:1rem;">Sem registros</td></tr>';
    return;
  }

  // Do mais recente para o mais antigo
  [...hist].reverse().forEach((d, idx) => {
    const tr = document.createElement('tr');
    const prev = hist[hist.length - 2 - idx];
    let varStr = '—';
    let varClass = '';
    if (prev && prev.consumo > 0) {
      const v = ((d.consumo - prev.consumo) / prev.consumo * 100).toFixed(1);
      const sobe = parseFloat(v) > 0;
      varStr = (sobe ? '↑ ' : '↓ ') + Math.abs(v) + '%';
      varClass = sobe ? 'var-up' : 'var-down';
    }
    tr.innerHTML = `
      <td>${d.data}</td>
      <td style="text-align:right">${d.leitura.toFixed(1)}</td>
      <td style="text-align:right">${d.consumo.toFixed(1)}</td>
      <td class="${varClass}" style="text-align:right">${varStr}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ── Helpers de período ─────────────────────────────────────────
function consumosPeriodo(hist, ultimos, offset = 0) {
  const slice = hist.slice(-(ultimos + offset), offset === 0 ? undefined : -offset);
  return slice.map(d => d.consumo || 0);
}

function consumosMes(hist, mesesAtras) {
  const now = new Date();
  const alvo = new Date(now.getFullYear(), now.getMonth() - mesesAtras, 1);
  const mesAlvo = alvo.getMonth() + 1;
  const anoAlvo = alvo.getFullYear();
  return hist
    .filter(d => {
      const p = d.data.split('/');
      return parseInt(p[1]) === mesAlvo && parseInt(p[2]) === anoAlvo;
    })
    .map(d => d.consumo || 0);
}

// ── Modal de Registro ──────────────────────────────────────────
function abrirModalCopasa() {
  const modal = document.getElementById('modal-copasa');
  modal.classList.add('active');
  document.getElementById('copasa-leitura-input').value = '';
  document.getElementById('copasa-leitura-input').focus();
  document.getElementById('copasa-registro-msg').style.display = 'none';
 
  // Data padrão = ontem
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);
  const y = ontem.getFullYear();
  const m = String(ontem.getMonth() + 1).padStart(2, '0');
  const d = String(ontem.getDate()).padStart(2, '0');
  document.getElementById('copasa-data-input').value = y + '-' + m + '-' + d;
 
  // Mostra última leitura como referência
  const ultimo = copasaHistorico[copasaHistorico.length - 1];
  const hint = document.getElementById('copasa-leitura-hint');
  if (ultimo) {
    hint.textContent = 'Última leitura: ' + ultimo.leitura.toFixed(1) + ' m³ em ' + ultimo.data;
    hint.style.display = 'block';
  } else {
    hint.style.display = 'none';
  }
}

function fecharModalCopasa() {
  document.getElementById('modal-copasa').classList.remove('active');
}

async function salvarRegistroCopasa() {
  const input  = document.getElementById('copasa-leitura-input');
  const dataInput = document.getElementById('copasa-data-input');
  const leitura = parseFloat(input.value.replace(',', '.'));
  const msg    = document.getElementById('copasa-registro-msg');
 
  if (isNaN(leitura) || leitura <= 0) {
    msg.textContent = '⚠ Informe uma leitura válida';
    msg.className = 'copasa-msg err';
    msg.style.display = 'block';
    return;
  }
 
  // Converte data do input (YYYY-MM-DD) para dd/mm/aaaa
  const partes = dataInput.value.split('-');
  const dataRef = partes[2] + '/' + partes[1] + '/' + partes[0];
 
  // Valida leitura menor que anterior
  const ultimo = copasaHistorico[copasaHistorico.length - 1];
  if (ultimo && leitura < ultimo.leitura) {
    msg.textContent = '⚠ Leitura menor que a anterior (' + ultimo.leitura.toFixed(1) + ' m³)';
    msg.className = 'copasa-msg err';
    msg.style.display = 'block';
    return;
  }
 
  const consumo = ultimo ? parseFloat((leitura - ultimo.leitura).toFixed(2)) : 0;
  const now  = new Date();
  const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
 
  const btn = document.getElementById('btn-salvar-copasa');
  btn.textContent = '⏳ Salvando...';
  btn.disabled = true;
 
  const payload = {
    tipo: 'copasa',
    data: dataRef,
    hora,
    posto:           currentPosto.nome,
    gerente:         currentUser.gerente,
    leitura,
    consumo,
    leituraAnterior: ultimo ? ultimo.leitura : 0
  };
 
  try {
    await fetch(SHEETS_URL_COPASA, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
 
    const novoReg = { data: dataRef, hora, leitura, consumo };
    copasaHistorico.push(novoReg);
    localStorage.setItem('copasa_' + currentPosto.nome, JSON.stringify(copasaHistorico));
 
    msg.textContent = '✅ Registrado! Consumo ' + dataRef + ': ' + consumo.toFixed(2) + ' m³';
    msg.className = 'copasa-msg ok';
    msg.style.display = 'block';
    btn.textContent = '💧 SALVAR LEITURA';
    btn.disabled = false;
 
    setTimeout(() => {
      fecharModalCopasa();
      renderCopasaDashboard();
    }, 1500);
 
  } catch(e) {
    msg.textContent = '❌ Erro ao salvar. Tente novamente.';
    msg.className = 'copasa-msg err';
    msg.style.display = 'block';
    btn.textContent = '💧 SALVAR LEITURA';
    btn.disabled = false;
  }
}
 

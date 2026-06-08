// JBRETAS — Dados: Postos, Tanques, Arqueação, Concorrentes

/* =====================
   DADOS — usuários, postos, tanques, combustíveis
   ===================== */
const DB = {
  "P01": {
    nome: "P. ALEX",
    users: [{ email: "gerente1@jbretas.com", senha: "posto01", gerente: "Gerente P. ALEX" }],
    tanques: [
      { id: "t1_1", nome: "TQ. 1", fuel: "DIESEL S-10", capacidade: 10000 },
      { id: "t1_2", nome: "TQ. 2", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t1_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 10000 },
      { id: "t1_4", nome: "TQ. 4", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t1_5", nome: "TQ. 5", fuel: "ETANOL", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
    ],
  },
  "P02": {
    nome: "P. ANA LÚCIA",
    users: [{ email: "gerente2@jbretas.com", senha: "posto02", gerente: "Gerente P. ANA LÚCIA" }],
    tanques: [
      { id: "t2_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t2_2", nome: "TQ. 2", fuel: "GASOLINA COMUM", capacidade: 10000 },
      { id: "t2_3", nome: "TQ. 3", fuel: "ETANOL ADITIVADO", capacidade: 20000 },
      { id: "t2_4", nome: "TQ. 4", fuel: "ETANOL ADITIVADO", capacidade: 7500 },
      { id: "t2_5", nome: "TQ. 5", fuel: "DIESEL S-10", capacidade: 7500 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "etanol_aditivado", label: "ETANOL ADITIVADO" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
    ],
  },
  "P03": {
    nome: "P. ARAPONGA",
    users: [{ email: "gerente3@jbretas.com", senha: "posto03", gerente: "Gerente P. ARAPONGA" }],
    tanques: [
      { id: "t3_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t3_2", nome: "TQ. 2", fuel: "DIESEL S-10", capacidade: 10000 },
      { id: "t3_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 10000 },
      { id: "t3_4", nome: "TQ. 4", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
    ],
  },
  "P04": {
    nome: "P. AVIVA",
    users: [{ email: "gerente4@jbretas.com", senha: "posto04", gerente: "Gerente P. AVIVA" }],
    tanques: [
      { id: "t4_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t4_2", nome: "TQ. 2", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t4_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 20000 },
      { id: "t4_4", nome: "TQ. 4", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t4_5", nome: "TQ. 5", fuel: "DIESEL S-500", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
    ],
  },
  "P05": {
    nome: "P. BAHAMAS",
    users: [{ email: "gerente5@jbretas.com", senha: "posto05", gerente: "Gerente P. BAHAMAS" }],
    tanques: [
      { id: "t5_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 10000 },
      { id: "t5_2", nome: "TQ. 2", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t5_3", nome: "TQ. 3", fuel: "GASOLINA COMUM", capacidade: 10000 },
      { id: "t5_4", nome: "TQ. 4", fuel: "GASOLINA COMUM", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
    ],
  },
  "P06": {
    nome: "P. BARBOSA",
    users: [{ email: "gerente6@jbretas.com", senha: "posto06", gerente: "Gerente P. BARBOSA" }],
    tanques: [
      { id: "t6_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 15000 },
      { id: "t6_2", nome: "TQ. 2", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t6_3", nome: "TQ. 3", fuel: "GASOLINA COMUM", capacidade: 30000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
    ],
  },
  "P07": {
    nome: "P. BERNARDO",
    users: [{ email: "gerente7@jbretas.com", senha: "posto07", gerente: "Gerente P. BERNARDO" }],
    tanques: [
      { id: "t7_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 15000 },
      { id: "t7_2", nome: "TQ. 2", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t7_3", nome: "TQ. 3", fuel: "DIESEL S-10", capacidade: 30000 },
      { id: "t7_4", nome: "TQ. 4", fuel: "GASOLINA COMUM", capacidade: 20000 },
      { id: "t7_5", nome: "TQ. 5", fuel: "DIESEL S-500", capacidade: 10000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
    ],
  },
  "P08": {
    nome: "P. BOMBOM FILIAL",
    users: [{ email: "gerente8@jbretas.com", senha: "posto08", gerente: "Gerente P. BOMBOM (G1)" }],
    tanques: [
      { id: "t8_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 30000 },
      { id: "t8_2", nome: "TQ. 2", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t8_3", nome: "TQ. 3", fuel: "GASOLINA COMUM", capacidade: 20000 },
      { id: "t8_4", nome: "TQ. 4", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
    ],
  },
  "P09": {
    nome: "P. BOMBOM MATRIZ",
    users: [{ email: "gerente9@jbretas.com", senha: "posto09", gerente: "Gerente P. BOMBOM (G2)" }],
    tanques: [
      { id: "t9_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t9_2", nome: "TQ. 2", fuel: "ETANOL", capacidade: 10000 },
      { id: "t9_3", nome: "TQ. 3", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t9_4", nome: "TQ. 4", fuel: "ETANOL", capacidade: 10000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
    ],
  },
  "P10": {
    nome: "P. BRUNA",
    users: [{ email: "gerente10@jbretas.com", senha: "posto10", gerente: "Gerente P. BRUNA" }],
    tanques: [
      { id: "t10_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 30000 },
      { id: "t10_2", nome: "TQ. 2", fuel: "DIESEL S-500", capacidade: 30000 },
      { id: "t10_3", nome: "TQ. 3", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t10_4", nome: "TQ. 4", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t10_5", nome: "TQ. 5", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t10_6", nome: "TQ. 6", fuel: "GASOLINA COMUM", capacidade: 20000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
    ],
  },
  "P11": {
    nome: "P. DIFERENCIAL",
    users: [{ email: "gerente11@jbretas.com", senha: "posto11", gerente: "Gerente P. DIFERENCIAL" }],
    tanques: [
      { id: "t11_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t11_2", nome: "TQ. 2", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
      { id: "t11_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 15000 },
      { id: "t11_4", nome: "TQ. 4", fuel: "DIESEL S-10", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
    ],
  },
  "P12": {
    nome: "P. ESPAÇO REAL",
    users: [{ email: "gerente12@jbretas.com", senha: "posto12", gerente: "Gerente P. ESPAÇO REAL" }],
    tanques: [
      { id: "t12_1", nome: "TQ. 1", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t12_2", nome: "TQ. 2", fuel: "GASOLINA COMUM", capacidade: 20000 },
      { id: "t12_3", nome: "TQ. 3", fuel: "GASOLINA COMUM", capacidade: 10000 },
      { id: "t12_4", nome: "TQ. 4", fuel: "ETANOL", capacidade: 20000 },
      { id: "t12_5", nome: "TQ. 5", fuel: "DIESEL S-500", capacidade: 15000 },
      { id: "t12_6", nome: "TQ. 6", fuel: "DIESEL S-10", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
    ],
  },
  "P13": {
    nome: "P. FELIPAO",
    users: [{ email: "gerente13@jbretas.com", senha: "posto13", gerente: "Gerente P. FELIPAO" }],
    tanques: [
      { id: "t13_1", nome: "TQ. 1", fuel: "DIESEL S-10", capacidade: 10000 },
      { id: "t13_2", nome: "TQ. 2", fuel: "ETANOL", capacidade: 20000 },
      { id: "t13_3", nome: "TQ. 3", fuel: "GASOLINA COMUM", capacidade: 20000 },
      { id: "t13_4", nome: "TQ. 4", fuel: "DIESEL S-500", capacidade: 10000 },
    ],
    combustiveis: [
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
    ],
  },
  "P14": {
    nome: "P. GLÓRIA",
    users: [{ email: "gerente14@jbretas.com", senha: "posto14", gerente: "Gerente P. GLÓRIA" }],
    tanques: [
      { id: "t14_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 30000 },
      { id: "t14_2", nome: "TQ. 2", fuel: "GASOLINA COMUM", capacidade: 20000 },
      { id: "t14_3", nome: "TQ. 3", fuel: "DIESEL S-10", capacidade: 10000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
    ],
  },
  "P15": {
    nome: "P. ITAPOA",
    users: [{ email: "gerente15@jbretas.com", senha: "posto15", gerente: "Gerente P. ITAPOA" }],
    tanques: [
      { id: "t15_1", nome: "TQ. 1", fuel: "DIESEL S-10", capacidade: 10000 },
      { id: "t15_2", nome: "TQ. 2", fuel: "ETANOL", capacidade: 10000 },
      { id: "t15_5", nome: "TQ. 5", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t15_6", nome: "TQ. 6", fuel: "GASOLINA COMUM", capacidade: 30000 },
    ],
    combustiveis: [
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
    ],
  },
  "P16": {
    nome: "P. JA",
    users: [{ email: "guilhermegerente@jbretas.com", senha: "posto16", gerente: "Gerente P. JA" }],
    tanques: [
      { id: "t16_1", nome: "TQ. 1", fuel: "Gasolina Octapro", capacidade: 15000 },
      { id: "t16_2", nome: "TQ. 2", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t16_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 15000 },
      { id: "t16_4", nome: "TQ. 4", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
      { id: "t16_5", nome: "TQ. 5", fuel: "GASOLINA COMUM", capacidade: 30000 },
    ],
    combustiveis: [
      { id: "gasolina_octapro", label: "Gasolina Octapro" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
    ],
  },
  "P17": {
    nome: "P. JOCA",
    users: [{ email: "gerente17@jbretas.com", senha: "posto17", gerente: "Gerente P. JOCA" }],
    tanques: [
      { id: "t17_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t17_2", nome: "TQ. 2", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t17_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 15000 },
      { id: "t17_4", nome: "TQ. 4", fuel: "ETANOL", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "etanol", label: "ETANOL" },
    ],
  },
  "P18": {
    nome: "P. LEANDRO",
    users: [{ email: "gerente18@jbretas.com", senha: "posto18", gerente: "Gerente P. LEANDRO" }],
    tanques: [
      { id: "t18_1", nome: "TQ. 1", fuel: "DIESEL S-500", capacidade: 15000 },
      { id: "t18_2", nome: "TQ. 2", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t18_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 30000 },
      { id: "t18_4", nome: "TQ. 4", fuel: "GASOLINA COMUM", capacidade: 20000 },
      { id: "t18_5", nome: "TQ. 5", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
    ],
    combustiveis: [
      { id: "diesel_s_500", label: "DIESEL S-500" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
    ],
  },
  "P19": {
    nome: "P. LOURA EMPREENDIMENTOS",
    users: [{ email: "gerente19@jbretas.com", senha: "posto19", gerente: "Gerente P. LOURA EMPREENDIMENTOS" }],
    tanques: [
      { id: "t19_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 30000 },
      { id: "t19_2", nome: "TQ. 2", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t19_3", nome: "TQ. 3", fuel: "DIESEL S-500", capacidade: 15000 },
      { id: "t19_4", nome: "TQ. 4", fuel: "GASOLINA COMUM", capacidade: 20000 },
      { id: "t19_5", nome: "TQ. 5", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
    ],
  },
  "P20": {
    nome: "P. MANGABEIRAS",
    users: [{ email: "gerente20@jbretas.com", senha: "posto20", gerente: "Gerente P. MANGABEIRAS" }],
    tanques: [
      { id: "t20_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 20000 },
      { id: "t20_2", nome: "TQ. 2", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t20_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 10000 },
      { id: "t20_4", nome: "TQ. 4", fuel: "ETANOL", capacidade: 10000 },
      { id: "t20_5", nome: "TQ. 5", fuel: "DIESEL S-10", capacidade: 10000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
    ],
  },
  "P21": {
    nome: "P. MIRAGEM JBRETAS",
    users: [{ email: "gerente21@jbretas.com", senha: "posto21", gerente: "Gerente P. MIRAGEM JBRETAS" }],
    tanques: [
      { id: "t21_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t21_2", nome: "TQ. 2", fuel: "DIESEL S-500", capacidade: 30000 },
      { id: "t21_3", nome: "TQ. 3", fuel: "Gasolina Grid", capacidade: 15000 },
      { id: "t21_4", nome: "TQ. 4", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t21_5", nome: "TQ. 5", fuel: "ETANOL", capacidade: 15000 },
      { id: "t21_6", nome: "TQ. 6", fuel: "GASOLINA COMUM", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
      { id: "gasolina_grid", label: "Gasolina Grid" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "etanol", label: "ETANOL" },
    ],
  },
  "P22": {
    nome: "PAIVA E PAIVA COMBUSTIVEL",
    users: [{ email: "gerente22@jbretas.com", senha: "posto22", gerente: "Gerente PAIVA E PAIVA COMBUSTIVEL" }],
    tanques: [
      { id: "t22_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t22_2", nome: "TQ. 2", fuel: "ETANOL", capacidade: 10000 },
      { id: "t22_3", nome: "TQ. 3", fuel: "DIESEL S-500", capacidade: 20000 },
      { id: "t22_4", nome: "TQ. 4", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t22_5", nome: "TQ. 5", fuel: "DIESEL S-10", capacidade: 20000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
    ],
  },
  "P23": {
    nome: "P. PARAISO DAS AGUAS",
    users: [{ email: "gerente23@jbretas.com", senha: "posto23", gerente: "Gerente P. PARAISO DAS AGUAS" }],
    tanques: [
      { id: "t23_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 15000 },
      { id: "t23_2", nome: "TQ. 2", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t23_3", nome: "TQ. 3", fuel: "DIESEL S-10", capacidade: 30000 },
      { id: "t23_4", nome: "TQ. 4", fuel: "GASOLINA COMUM", capacidade: 10000 },
      { id: "t23_5", nome: "TQ. 5", fuel: "DIESEL S-500", capacidade: 20000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
    ],
  },
  "P24": {
    nome: "P. PLANALTO",
    users: [{ email: "gerente24@jbretas.com", senha: "posto24", gerente: "Gerente P. PLANALTO" }],
    tanques: [
      { id: "t24_1", nome: "TQ. 1", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t24_2", nome: "TQ. 2", fuel: "GASOLINA COMUM", capacidade: 20000 },
      { id: "t24_3", nome: "TQ. 3", fuel: "DIESEL S-500", capacidade: 10000 },
      { id: "t24_4", nome: "TQ. 4", fuel: "ETANOL", capacidade: 20000 },
      { id: "t24_5", nome: "TQ. 5", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t24_6", nome: "TQ. 6", fuel: "DIESEL S-10", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
    ],
  },
  "P25": {
    nome: "P. QUATRO RODAS",
    users: [{ email: "gerente25@jbretas.com", senha: "posto25", gerente: "Gerente P. QUATRO RODAS" }],
    tanques: [
      { id: "t25_1", nome: "TQ. 1", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t25_2", nome: "TQ. 2", fuel: "DIESEL S-10", capacidade: 10000 },
      { id: "t25_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 10000 },
      { id: "t25_4", nome: "TQ. 4", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t25_5", nome: "TQ. 5", fuel: "ETANOL", capacidade: 15000 },
      { id: "t25_6", nome: "TQ. 6", fuel: "GNV", capacidade: 30000 },
    ],
    combustiveis: [
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "gnv", label: "GNV" },
    ],
  },
  "P26": {
    nome: "P. RODRIGO",
    users: [{ email: "gerente26@jbretas.com", senha: "posto26", gerente: "Gerente P. RODRIGO" }],
    tanques: [
      { id: "t26_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t26_2", nome: "TQ. 2", fuel: "ETANOL", capacidade: 15000 },
      { id: "t26_3", nome: "TQ. 3", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t26_4", nome: "TQ. 4", fuel: "DIESEL S-500", capacidade: 15000 },
      { id: "t26_5", nome: "TQ. 5", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
      { id: "t26_6", nome: "TQ. 6", fuel: "DIESEL S-10", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
    ],
  },
  "P27": {
    nome: "P. SANTA INES MINAS - FILIAL",
    users: [{ email: "gerente27@jbretas.com", senha: "posto27", gerente: "Gerente P. SANTA INES MINAS - FILIAL" }],
    tanques: [
      { id: "t27_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 15000 },
      { id: "t27_2", nome: "TQ. 2", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
      { id: "t27_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 15000 },
      { id: "t27_4", nome: "TQ. 4", fuel: "DIESEL S-500", capacidade: 15000 },
      { id: "t27_5", nome: "TQ. 5", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t27_6", nome: "TQ. 6", fuel: "GASOLINA COMUM", capacidade: 30000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
    ],
  },
  "P28": {
    nome: "P. SANTA INES MINAS",
    users: [{ email: "gerente28@jbretas.com", senha: "posto28", gerente: "Gerente P. SANTA INES MINAS" }],
    tanques: [
      { id: "t28_1", nome: "TQ. 1", fuel: "ETANOL ADITIVADO", capacidade: 20000 },
      { id: "t28_2", nome: "TQ. 2", fuel: "DIESEL S-10", capacidade: 10000 },
      { id: "t28_3", nome: "TQ. 3", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t28_4", nome: "TQ. 4", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "etanol_aditivado", label: "ETANOL ADITIVADO" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
    ],
  },
  "P29": {
    nome: "P. SANTA MARIA",
    users: [{ email: "gerente29@jbretas.com", senha: "posto29", gerente: "Gerente P. SANTA MARIA" }],
    tanques: [
      { id: "t29_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 30000 },
      { id: "t29_2", nome: "TQ. 2", fuel: "Gasolina Grid", capacidade: 15000 },
      { id: "t29_3", nome: "TQ. 3", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t29_4", nome: "TQ. 4", fuel: "DIESEL S-10", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_grid", label: "Gasolina Grid" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
    ],
  },
  "P30": {
    nome: "P. SAO BERNARDO",
    users: [{ email: "gerente30@jbretas.com", senha: "posto30", gerente: "Gerente P. SAO BERNARDO" }],
    tanques: [
      { id: "t30_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t30_2", nome: "TQ. 2", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
      { id: "t30_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 20000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "etanol", label: "ETANOL" },
    ],
  },
  "P31": {
    nome: "P. SAO LUIZ RL",
    users: [{ email: "gerente31@jbretas.com", senha: "posto31", gerente: "Gerente P. SAO LUIZ RL" }],
    tanques: [
      { id: "t31_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 20000 },
      { id: "t31_2", nome: "TQ. 2", fuel: "DIESEL S-10", capacidade: 10000 },
      { id: "t31_3", nome: "TQ. 3", fuel: "ETANOL", capacidade: 15000 },
      { id: "t31_4", nome: "TQ. 4", fuel: "DIESEL S-500", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "etanol", label: "ETANOL" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
    ],
  },
  "P32": {
    nome: "P. SERENA COLIBRI",
    users: [{ email: "gerente32@jbretas.com", senha: "posto32", gerente: "Gerente P. SERENA COLIBRI" }],
    tanques: [
      { id: "t32_1", nome: "TQ. 1", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
      { id: "t32_2", nome: "TQ. 2", fuel: "ETANOL ADITIVADO", capacidade: 15000 },
      { id: "t32_3", nome: "TQ. 3", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t32_4", nome: "TQ. 4", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t32_5", nome: "TQ. 5", fuel: "DIESEL S-500", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "etanol_aditivado", label: "ETANOL ADITIVADO" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
    ],
  },
  "P33": {
    nome: "P. TOPAZIO",
    users: [{ email: "gerente33@jbretas.com", senha: "posto33", gerente: "Gerente P. TOPAZIO" }],
    tanques: [
      { id: "t33_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 15000 },
      { id: "t33_2", nome: "TQ. 2", fuel: "ETANOL", capacidade: 15000 },
      { id: "t33_3", nome: "TQ. 3", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
      { id: "t33_4", nome: "TQ. 4", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t33_5", nome: "TQ. 5", fuel: "GASOLINA COMUM", capacidade: 30000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
    ],
  },
  "P34": {
    nome: "P. TRANCOSO",
    users: [{ email: "gerente34@jbretas.com", senha: "posto34", gerente: "Gerente P. TRANCOSO" }],
    tanques: [
      { id: "t34_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t34_2", nome: "TQ. 2", fuel: "ETANOL ADITIVADO", capacidade: 15000 },
      { id: "t34_3", nome: "TQ. 3", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
      { id: "t34_4", nome: "TQ. 4", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t34_5", nome: "TQ. 5", fuel: "GASOLINA COMUM", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "etanol_aditivado", label: "ETANOL ADITIVADO" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
    ],
  },
  "P35": {
    nome: "P. TUNEL",
    users: [{ email: "gerente35@jbretas.com", senha: "posto35", gerente: "Gerente P. TUNEL" }],
    tanques: [
      { id: "t35_1", nome: "TQ. 1", fuel: "ETANOL", capacidade: 30000 },
      { id: "t35_2", nome: "TQ. 2", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
      { id: "t35_3", nome: "TQ. 3", fuel: "GASOLINA COMUM", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
    ],
  },
  "P36": {
    nome: "P. URBANO FERRAZ",
    users: [{ email: "gerente36@jbretas.com", senha: "posto36", gerente: "Gerente P. URBANO FERRAZ" }],
    tanques: [
      { id: "t36_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 30000 },
      { id: "t36_2", nome: "TQ. 2", fuel: "Gasolina Premium Podium", capacidade: 15000 },
      { id: "t36_3", nome: "TQ. 3", fuel: "GASOLINA ADITIVADA", capacidade: 15000 },
      { id: "t36_4", nome: "TQ. 4", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t36_5", nome: "TQ. 5", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t36_6", nome: "TQ. 6", fuel: "ETANOL", capacidade: 30000 },
      { id: "t36_136", nome: "TQ. 136", fuel: "GNV", capacidade: 90000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "gasolina_premium_podium", label: "Gasolina Premium Podium" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "etanol", label: "ETANOL" },
      { id: "gnv", label: "GNV" },
    ],
  },
  "P37": {
    nome: "P. BIANCA",
    users: [{ email: "gerente37@jbretas.com", senha: "posto37", gerente: "Gerente P. BIANCA" }],
    tanques: [
      { id: "t37_1", nome: "TQ. 1", fuel: "GASOLINA COMUM", capacidade: 10000 },
      { id: "t37_2", nome: "TQ. 2", fuel: "ETANOL", capacidade: 10000 },
      { id: "t37_3", nome: "TQ. 3", fuel: "GASOLINA ADITIVADA", capacidade: 10000 },
      { id: "t37_4", nome: "TQ. 4", fuel: "GASOLINA COMUM", capacidade: 15000 },
      { id: "t37_5", nome: "TQ. 5", fuel: "DIESEL S-10", capacidade: 15000 },
      { id: "t37_6", nome: "TQ. 6", fuel: "DIESEL S-500", capacidade: 15000 },
      { id: "t37_7", nome: "TQ. 7", fuel: "DIESEL S-500", capacidade: 15000 },
    ],
    combustiveis: [
      { id: "gasolina_comum", label: "GASOLINA COMUM" },
      { id: "etanol", label: "ETANOL" },
      { id: "gasolina_aditivada", label: "GASOLINA ADITIVADA" },
      { id: "diesel_s_10", label: "DIESEL S-10" },
      { id: "diesel_s_500", label: "DIESEL S-500" },
    ],
  },
};

const ARQUEACAO = {
  7500: [0, 7.0, 18.0, 34.0, 52.0, 72.0, 95.0, 120.0, 146.0, 174.0, 204.0, 235.0, 267.0, 301.0, 336.0, 372.0, 409.0, 448.0, 487.0, 528.0, 569.0, 612.0, 655.0, 699.0, 744.0, 790.0, 837.0, 885.0, 933.0, 983.0, 1032.0, 1083.0, 1135.0, 1187.0, 1239.0, 1293.0, 1347.0, 1401.0, 1457.0, 1513.0, 1569.0, 1626.0, 1684.0, 1742.0, 1801.0, 1860.0, 1920.0, 1980.0, 2041.0, 2102.0, 2164.0, 2226.0, 2289.0, 2352.0, 2416.0, 2480.0, 2544.0, 2609.0, 2674.0, 2740.0, 2806.0, 2872.0, 2939.0, 3006.0, 3074.0, 3142.0, 3210.0, 3278.0, 3347.0, 3416.0, 3486.0, 3556.0, 3626.0, 3696.0, 3767.0, 3838.0, 3909.0, 3981.0, 4053.0, 4125.0, 4197.0, 4270.0, 4342.0, 4415.0, 4489.0, 4562.0, 4636.0, 4710.0, 4784.0, 4858.0, 4933.0, 5007.0, 5082.0, 5157.0, 5233.0, 5308.0, 5384.0, 5459.0, 5535.0, 5611.0, 5687.0, 5764.0, 5840.0, 5917.0, 5993.0, 6070.0, 6147.0, 6224.0, 6301.0, 6378.0, 6456.0, 6533.0, 6610.0, 6688.0, 6765.0, 6843.0, 6921.0, 6999.0, 7076.0, 7154.0, 7232.0, 7310.0, 7388.0, 7466.0, 7544.0, 7622.0, 7700.0, 7778.0, 7856.0, 7934.0, 8012.0, 8090.0, 8168.0, 8246.0, 8324.0, 8402.0, 8480.0, 8558.0, 8636.0, 8714.0, 8791.0, 8869.0, 8947.0, 9024.0, 9102.0, 9179.0, 9256.0, 9333.0, 9410.0, 9487.0, 9564.0, 9641.0, 9718.0, 9794.0, 9871.0, 9947.0, 10023.0, 10099.0, 10175.0, 10251.0, 10326.0, 10402.0, 10477.0, 10552.0, 10627.0, 10701.0, 10776.0, 10850.0, 10924.0, 10998.0, 11072.0, 11145.0, 11219.0, 11292.0, 11364.0, 11437.0, 11509.0, 11581.0, 11653.0, 11725.0, 11796.0, 11867.0, 11937.0, 12008.0, 12078.0, 12148.0, 12217.0, 12286.0, 12355.0, 12424.0, 12492.0, 12560.0, 12627.0, 12694.0, 12761.0, 12828.0, 12894.0, 12959.0, 13024.0, 13089.0, 13154.0, 13218.0, 13281.0, 13344.0, 13407.0, 13469.0, 13531.0, 13592.0, 13653.0, 13713.0, 13773.0, 13832.0, 13890.0, 13949.0, 14006.0, 14063.0, 14120.0, 14175.0, 14231.0, 14285.0, 14339.0, 14393.0, 14445.0, 14497.0, 14549.0, 14599.0, 14649.0, 14698.0, 14747.0, 14794.0, 14841.0, 14887.0, 14932.0, 14976.0, 15019.0, 15062.0, 15103.0, 15144.0, 15183.0, 15221.0, 15258.0, 15294.0, 15329.0, 15362.0, 15395.0, 15426.0, 15455.0, 15483.0, 15510.0, 15534.0, 15556.0, 15577.0, 15595.0, 15610.0, 15621.0],
  10000: [0, 4.5, 12.8, 23.5, 36.1, 50.4, 66.2, 78.9, 97.0, 116.2, 136.5, 157.8, 180.1, 203.3, 2275.0, 252.4, 278.1, 304.7, 331.9, 359.9, 381.4, 410.6, 440.4, 470.9, 502.0, 533.7, 566.0, 598.8, 632.2, 666.1, 700.6, 735.6, 771.0, 797.9, 834.2, 871.0, 908.2, 945.9, 984.0, 1022.5, 1061.5, 1100.8, 1140.6, 1180.7, 1180.7, 1282.1, 1293.0, 1334.5, 1376.4, 1418.6, 1461.1, 1504.0, 15472.0, 1590.7, 1634.5, 1678.7, 1723.1, 1767.8, 1812.8, 1846.7, 1846.7, 1938.0, 1984.0, 2030.3, 2076.8, 2123.6, 2170.6, 2217.9, 2265.3, 2313.1, 2361.0, 2409.1, 2445.4, 2493.9, 2542.6, 2591.5, 2640.7, 2690.0, 2739.5, 2789.1, 2839.0, 2889.0, 2939.2, 2989.6, 3040.1, 3078.1, 3128.8, 3179.8, 3230.9, 3282.1, 3333.4, 3384.9, 3436.5, 3488.3, 3540.1, 3592.1, 3644.2, 3696.4, 3735.8, 3788.0, 3840.5, 3893.1, 3945.7, 3998.5, 4051.3, 4104.3, 4157.2, 4210.3, 4263.5, 4316.7, 4369.9, 4409.9, 4483.3, 4516.7, 4570.2, 4623.7, 4677.3, 4730.9, 4784.5, 4838.1, 4891.8, 4945.6, 4999.3, 5053.1, 5093.4, 5147.2, 5201.0, 5254.8, 5308.6, 5362.4, 5418.2, 5470.0, 5523.7, 5577.5, 5631.2, 5684.9, 5738.6, 5778.9, 5832.5, 5886.1, 5939.7, 5993.2, 6046.7, 6100.1, 6153.4, 6206.8, 6260.0, 6313.2, 6366.3, 6419.4, 6459.1, 6512.0, 6564.9, 6617.6, 6670.3, 6722.9, 6775.3, 6827.7, 6880.0, 6932.2, 6984.3, 7036.2, 7088.0, 7126.8, 7178.4, 7178.4, 7281.3, 7332.5, 7383.6, 7434.5, 7485.3, 7535.9, 7586.4, 7638.7, 7686.9, 7736.8, 7774.2, 7823.9, 7873.4, 7922.7, 7971.8, 8020.7, 8069.4, 8118.0, 8166.3, 8214.4, 8262.2, 8309.9, 8357.3, 8392.8, 8439.8, 8486.6, 8533.1, 8579.3, 8625.4, 8671.1, 8716.6, 8761.8, 8806.8, 8851.4, 8895.8, 8939.8, 8972.7, 9016.2, 9059.4, 9102.2, 9144.8, 9187.0, 9228.9, 9270.4, 9311.5, 9352.3, 9392.7, 9432.8, 9472.4, 9511.7, 9540.8, 9579.4, 9617.5, 9655.1, 9692.3, 9729.1, 9765.4, 9801.2, 9836.6, 9871.4, 9905.8, 9939.8, 9972.8, 9997.4, 10029.7, 10061.4, 10092.5, 10122.9, 10152.8, 10182.0, 10210.5, 10238.3, 10265.4, 10291.7, 10317.3, 10342.0, 10360.0, 10383.2, 10405.5, 10428.9, 10447.2, 10466.4, 10484.5, 10501.2, 10516.7, 10530.6, 10542.7, 10552.9, 10533.9],
  15000: [0, 7.0, 18.0, 34.0, 52.0, 72.0, 95.0, 120.0, 146.0, 174.0, 204.0, 235.0, 267.0, 301.0, 336.0, 372.0, 409.0, 448.0, 487.0, 528.0, 569.0, 612.0, 655.0, 699.0, 744.0, 790.0, 837.0, 885.0, 933.0, 983.0, 1032.0, 1083.0, 1135.0, 1187.0, 1239.0, 1293.0, 1347.0, 1401.0, 1457.0, 1513.0, 1569.0, 1626.0, 1684.0, 1742.0, 1801.0, 1860.0, 1920.0, 1980.0, 2041.0, 2102.0, 2164.0, 2226.0, 2289.0, 2352.0, 2416.0, 2480.0, 2544.0, 2609.0, 2674.0, 2740.0, 2806.0, 2872.0, 2939.0, 3006.0, 3074.0, 3142.0, 3210.0, 3278.0, 3347.0, 3416.0, 3486.0, 3556.0, 3626.0, 3696.0, 3767.0, 3838.0, 3909.0, 3981.0, 4053.0, 4125.0, 4197.0, 4270.0, 4342.0, 4415.0, 4489.0, 4562.0, 4636.0, 4710.0, 4784.0, 4858.0, 4933.0, 5007.0, 5082.0, 5157.0, 5233.0, 5308.0, 5384.0, 5459.0, 5535.0, 5611.0, 5687.0, 5764.0, 5840.0, 5917.0, 5993.0, 6070.0, 6147.0, 6224.0, 6301.0, 6378.0, 6456.0, 6533.0, 6610.0, 6688.0, 6765.0, 6843.0, 6921.0, 6999.0, 7076.0, 7154.0, 7232.0, 7310.0, 7388.0, 7466.0, 7544.0, 7622.0, 7700.0, 7778.0, 7856.0, 7934.0, 8012.0, 8090.0, 8168.0, 8246.0, 8324.0, 8402.0, 8480.0, 8558.0, 8636.0, 8714.0, 8791.0, 8869.0, 8947.0, 9024.0, 9102.0, 9179.0, 9256.0, 9333.0, 9410.0, 9487.0, 9564.0, 9641.0, 9718.0, 9794.0, 9871.0, 9947.0, 10023.0, 10099.0, 10175.0, 10251.0, 10326.0, 10402.0, 10477.0, 10552.0, 10627.0, 10701.0, 10776.0, 10850.0, 10924.0, 10998.0, 11072.0, 11145.0, 11219.0, 11292.0, 11364.0, 11437.0, 11509.0, 11581.0, 11653.0, 11725.0, 11796.0, 11867.0, 11937.0, 12008.0, 12078.0, 12148.0, 12217.0, 12286.0, 12355.0, 12424.0, 12492.0, 12560.0, 12627.0, 12694.0, 12761.0, 12828.0, 12894.0, 12959.0, 13024.0, 13089.0, 13154.0, 13218.0, 13281.0, 13344.0, 13407.0, 13469.0, 13531.0, 13592.0, 13653.0, 13713.0, 13773.0, 13832.0, 13890.0, 13949.0, 14006.0, 14063.0, 14120.0, 14175.0, 14231.0, 14285.0, 14339.0, 14393.0, 14445.0, 14497.0, 14549.0, 14599.0, 14649.0, 14698.0, 14747.0, 14794.0, 14841.0, 14887.0, 14932.0, 14976.0, 15019.0, 15062.0, 15103.0, 15144.0, 15183.0, 15221.0, 15258.0, 15294.0, 15329.0, 15362.0, 15395.0, 15426.0, 15455.0, 15483.0, 15510.0, 15534.0, 15556.0, 15577.0, 15595.0, 15610.0, 15621.0],
  20000: [0, 8.9, 25.2, 46.2, 71.0, 99.1, 130.2, 155.1, 190.6, 228.4, 268.3, 310.3, 354.2, 399.8, 447.2, 498.3, 546.9, 699.0, 652.7, 707.7, 749.9, 807.2, 866.0, 925.9, 987.0, 1049.4, 1112.8, 1177.4, 1243.1, 1309.8, 1377.5, 1446.2, 1516.0, 1588.9, 1640.3, 1712.6, 1785.7, 1859.8, 1934.7, 2010.5, 2087.0, 2164.4, 2242.5, 2321.6, 2401.1, 2481.6, 2542.3, 2624.2, 2706.2, 2789.2, 2872.8, 2957.1, 3042.1, 3127.6, 3213.8, 3300.8, 3387.9, 3475.8, 3564.3, 3631.0, 3720.5, 3810.4, 3900.9, 3991.9, 4083.4, 4175.3, 4267.8, 4380.7, 4454.1, 4547.9, 4642.1, 4736.8, 4808.1, 4903.5, 4999.3, 5095.4, 5192.0, 5289.0, 5386.3, 5484.0, 5582.0, 5680.4, 5779.1, 5878.0, 5977.4, 6052.0, 6151.9, 6252.1, 6352.5, 6453.2, 6554.2, 6655.4, 6758.9, 6858.6, 6960.6, 7062.8, 7165.2, 7267.8, 7344.9, 7447.9, 7551.1, 7654.5, 7758.0, 7861.8, 7985.7, 8069.7, 8173.9, 8278.3, 8382.7, 8487.4, 8592.1, 8670.7, 8775.8, 8880.7, 8985.9, 9091.1, 9196.4, 9301.8, 9407.2, 9512.7, 9618.3, 9723.9, 9829.6, 9935.3, 10014.6, 10120.3, 10226.1, 10331.8, 10437.7, 10543.4, 10649.2, 10755.0, 10860.7, 10966.4, 11072.0, 11177.8, 11283.2, 11362.3, 11487.7, 11573.2, 11678.5, 11783.7, 11888.8, 11993.9, 12098.8, 12203.6, 12308.3, 12412.9, 12517.4, 12517.4, 12699.8, 12803.9, 12907.8, 13011.5, 13115.0, 13218.4, 13321.6, 13424.6, 13527.4, 13630.0, 13732.3, 13834.5, 13936.4, 14012.7, 14114.2, 14215.4, 14316.3, 14417.0, 14517.5, 14617.6, 14617.6, 14817.0, 14916.3, 15015.2, 15113.8, 15212.1, 15285.6, 15383.2, 15480.5, 15577.5, 15674.1, 15770.2, 15886.0, 15961.4, 16056.4, 16151.0, 16245.1, 16338.8, 16432.1, 16501.7, 16594.2, 16688.1, 16777.6, 16868.8, 16959.1, 17049.1, 17138.5, 17138.5, 17315.7, 17403.5, 17490.7, 17577.3, 17641.9, 17727.4, 17812.4, 17896.7, 17980.3, 18063.3, 18145.6, 18227.3, 18308.2, 18388.4, 18467.8, 18546.6, 18624.5, 18701.7, 18759.1, 18834.8, 18909.7, 18983.8, 19056.9, 19129.2, 19200.6, 19271.1, 19340.5, 19409.1, 19476.6, 19543.0, 19608.4, 19656.7, 19720.2, 19782.5, 19843.6, 19903.6, 19962.3, 20019.7, 20075.7, 20130.4, 20183.7, 20235.4, 20285.7, 20334.3, 20369.7, 20415.4, 20459.2, 20501.2, 20541.1, 20578.9, 20614.4, 20647.4, 20677.7, 20705.1, 20729.0, 20748.9, 20711.6],
  30000: [0, 13.0, 37.0, 68.0, 104.0, 145.0, 191.0, 274.0, 293.0, 349.0, 408.0, 470.0, 535.0, 603.0, 673.0, 745.0, 820.0, 897.0, 976.0, 1058.0, 1141.0, 1226.0, 1313.0, 1401.0, 1492.0, 1584.0, 1678.0, 1774.0, 1871.0, 1969.0, 2069.0, 2171.0, 2274.0, 2378.0, 2484.0, 2591.0, 2699.0, 2809.0, 2920.0, 3032.0, 3145.0, 3259.0, 3375.0, 3491.0, 3609.0, 3728.0, 3848.0, 3969.0, 4090.0, 4213.0, 4337.0, 4462.0, 4587.0, 4714.0, 4841.0, 4970.0, 5099.0, 5229.0, 5359.0, 5491.0, 5623.0, 5757.0, 5890.0, 6025.0, 6160.0, 6296.0, 6433.0, 6570.0, 6709.0, 6847.0, 6987.0, 7127.0, 7267.0, 7408.0, 7550.0, 7692.0, 7835.0, 7979.0, 8122.0, 8267.0, 8412.0, 8557.0, 8703.0, 8850.0, 8996.0, 9144.0, 9291.0, 9440.0, 9588.0, 9737.0, 9886.0, 10036.0, 10186.0, 10337.0, 10488.0, 10639.0, 10790.0, 10942.0, 11094.0, 11246.0, 11399.0, 11552.0, 11705.0, 11858.0, 12012.0, 12166.0, 12320.0, 12474.0, 12629.0, 12784.0, 12938.0, 13094.0, 13249.0, 13404.0, 13560.0, 13715.0, 13871.0, 14027.0, 14183.0, 14339.0, 14495.0, 14651.0, 14807.0, 14964.0, 15120.0, 15277.0, 15433.0, 15589.0, 15746.0, 15902.0, 16059.0, 16215.0, 16372.0, 16528.0, 16684.0, 16840.0, 16996.0, 17152.0, 17308.0, 17464.0, 17620.0, 17776.0, 17931.0, 18086.0, 18242.0, 18397.0, 18552.0, 18706.0, 18861.0, 19015.0, 19169.0, 19323.0, 19477.0, 19630.0, 19783.0, 19936.0, 20089.0, 20241.0, 20393.0, 20545.0, 20696.0, 20847.0, 20998.0, 21148.0, 21298.0, 21448.0, 21597.0, 21746.0, 21895.0, 22043.0, 22191.0, 22338.0, 22485.0, 22631.0, 22777.0, 22922.0, 23067.0, 23212.0, 23356.0, 23499.0, 23642.0, 23784.0, 23926.0, 24067.0, 24207.0, 24347.0, 24486.0, 24625.0, 24763.0, 24900.0, 25037.0, 25173.0, 25308.0, 25443.0, 25577.0, 25710.0, 25842.0, 25973.0, 26104.0, 26234.0, 26363.0, 26491.0, 26618.0, 26745.0, 26870.0, 26995.0, 27119.0, 27241.0, 27363.0, 27484.0, 27604.0, 27722.0, 27840.0, 27956.0, 28072.0, 28186.0, 28299.0, 28411.0, 28522.0, 28631.0, 28740.0, 28846.0, 28952.0, 29056.0, 29159.0, 29260.0, 29360.0, 29459.0, 29556.0, 29651.0, 29745.0, 29837.0, 29927.0, 30016.0, 30103.0, 30187.0, 30270.0, 30351.0, 30430.0, 30507.0, 30582.0, 30654.0, 30724.0, 30791.0, 30856.0, 30918.0, 30976.0, 31032.0, 31085.0, 31134.0, 31179.0, 31220.0, 31255.0, 31286.0, 31309.0],
  90000: [],  // GNV - sem tabela padrão
};

function cmToLitros(cm, capacidade) {
  const tabela = ARQUEACAO[capacidade];
  if (!tabela || tabela.length === 0) return 0;
  if (cm <= 0) return 0;
  if (cm >= tabela.length) return tabela[tabela.length - 1];
  return tabela[cm] || 0;
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('SW registrado:', reg.scope))
        .catch(err => console.log('SW falhou:', err));
    });
  }


/* ===== CAMPO EXTRA DINÂMICO POR POSTO — COLETA DE PREÇOS ===== */
const CAMPO_EXTRA_COLETA = {
  "P16": { emoji:"🟣", label:"GAS. PODIUM", chave:"podium" }
  // "P21": { emoji:"🟡", label:"GAS. GRID",   chave:"grid" },
};
/* ===== /CAMPO EXTRA ===== */

/* === CONCORRENTES === */
const CONCORRENTES = {
  "P01": ["REDE FLEX CENTER SUL", "P. RAJA", "POSTO BARÃO", "POSTO WR", "P. NSA. FATIMA (BH)"],
  "P02": ["MENDONÇA", "BANDEIRA BRANCA"],
  "P03": ["DUAS PATRIAS", "P. ALEX", "BOMBOM", "TIGRES", "SKY 2"],
  "P04": ["ALE", "LUMA", "CENTRAL", "POSTO RL", "POSTO DO APOIO"],
  "P05": ["VILA", "OURO", "REDE FLEX SIGMA", "ALTO SION", "PIAZZA", "CORUJÃO"],
  "P06": ["MENDONÇA", "BANDEIRA BRANCA", "AQUI", "ATLANTICO"],
  "P07": ["MUARAMA", "REDE FLEX SETE BELO", "POSTO SHELL", "WAP", "POSTO MARIO WERNECK"],
  "P08": ["TIGRES", "SKY 2", "MANUELA", "REDE FLEX CENTER NORTE", "VAQUINHA", "G&P"],
  "P09": ["BOMBOM", "TIGRES", "SKY 2", "VILA", "SÃO PEDRO"],
  "P10": ["VILA", "SÃO FRANCISCO", "POSTO CARIJO SHELL", "INHUMAS", "POSTO MÁQUINE REDE FLEX"],
  "P11": ["POSTO BH", "VILA", "SÃO PEDRO", "REDE FLEX LESTE"],
  "P12": ["P. ALMEIDA", "CANADÁ", "BARRA 10", "COLONIAL"],
  "P13": ["PETRO OURO", "PASSARELA", "REDE ALIANÇA"],
  "P14": ["NOSSO POSTO", "MIRAGE", "POSTO ASTRAL"],
  "P15": ["PHOENIX AMAZONAS", "REDE FLEX S. AGOSTINHO", "POSTO WAP", "POSTO REM", "REDE FLEX JUPITER"],
  "P16": ["REDE FLEX CENTER SUL", "P. RAJA", "POSTO BARÃO", "POSTO WR"],
  "P17": ["AQUI", "ATLANTICO", "CHAVES"],
  "P18": ["CAPITAL", "SERRANO", "LUBRIMIL", "SHELL"],
  "P19": ["FAISCA", "SÃO GERALDO", "MIL", "SHELL SANTO POSTO", "PADUA", "SIGA PETRO"],
  "P20": ["VILA", "OURO", "REDE FLEX SIGMA", "ALTO SION", "PIAZZA", "CORUJÃO"],
  "P21": ["XAVANTE", "CATALÃO"],
  "P22": ["XAVANTE", "CATALÃO", "REDE FLEX TATIANA", "TROPICO"],
  "P23": ["TREVINHO", "REDE AQUI", "IPIRANGA", "BARUC"],
  "P24": ["P. ENTRADA OBRIGATORIA", "CAMÕES (av.portugal)", "BR OLIMPIO MOURÃO (falcão)", "ALE SENT. BAIRRO"],
  "P25": ["REDE FLEX PORTAL", "POSTO VILA", "REDE FELX TROVÃO", "POSTO NOVO", "REDE AQUI"],
  "P26": ["ATLANTA", "ALE MILLENIUM", "VILA LIBERDADE", "VILA PIRATA", "REDE AQUI"],
  "P27": ["TREVINHO", "REDE AQUI", "SANTA INES", "REDE FLEX SETE BELO"],
  "P28": ["TREVINHO", "REDE AQUI"],
  "P29": ["MANACAS", "POSTO DUO DRIVE"],
  "P30": ["MUARAMA", "REDE FLEX SETE BELO", "WAP", "POSTO MARIO WERNECK"],
  "P31": ["FAISCA", "SÃO GERALDO", "MIL", "PADUA"],
  "P32": ["REDE FLEX POETA", "REDE FLEX CELT", "PHOENIX SÃO LUIZ", "VILA COMETA", "REDE FLEX TATIANA", "TROPICO"],
  "P33": ["ENSEADA AZUL", "PICA PAU"],
  "P34": ["POSTO BR PARQUE", "IPIRANGA", "BARUC"],
  "P35": ["PETRO OURO", "PASSARELA", "REDE ALIANÇA"],
  "P36": ["SHELL LIBERDADE", "TUPI", "BEIJA FLOR", "SHELL WERVIN"],
  "P37": ["SHELL SUPER LUNA", "IPIRANGA G. SARZEDO"],
};

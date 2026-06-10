// JBRETAS — Estrutura pública de postos e tanques
// ⚠ NÃO contém senhas, emails, tabelas de arqueação nem concorrentes
// Esses dados são carregados do servidor via doGet após o login

const DB_ESTRUTURA = {
  "P01": { nome: "P. ALEX",
    tanques: [
      { id:"t1_1", nome:"TQ. 1", fuel:"DIESEL S-10",        capacidade:10000, arq:"bi_10k"    },
      { id:"t1_2", nome:"TQ. 2", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"tri_v2"    },
      { id:"t1_3", nome:"TQ. 3", fuel:"ETANOL",             capacidade:10000, arq:"bi_10k"    },
      { id:"t1_4", nome:"TQ. 4", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
      { id:"t1_5", nome:"TQ. 5", fuel:"ETANOL",             capacidade:15000, arq:"pleno_15k"},
    ],
    combustiveis: [
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
    ],
  },
  "P02": { nome: "P. ANA LÚCIA",
    tanques: [
      { id:"t2_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
      { id:"t2_2", nome:"TQ. 2", fuel:"GASOLINA COMUM",     capacidade:10000, arq:"bi_10k"},
      { id:"t2_3", nome:"TQ. 3", fuel:"ETANOL ADITIVADO",   capacidade:20000, arq:"bi_20k"},
      { id:"t2_4", nome:"TQ. 4", fuel:"ETANOL ADITIVADO",   capacidade: 7500, arq:"bi_15k"},
      { id:"t2_5", nome:"TQ. 5", fuel:"DIESEL S-10",        capacidade: 7500, arq:"bi_15k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",   label:"GASOLINA COMUM" },
      { id:"etanol_aditivado", label:"ETANOL ADITIVADO" },
      { id:"diesel_s_10",      label:"DIESEL S-10" },
    ],
  },
  "P03": { nome: "P. ARAPONGA",
    tanques: [
      { id:"t3_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
      { id:"t3_2", nome:"TQ. 2", fuel:"DIESEL S-10",        capacidade:10000, arq:"bi_10k"},
      { id:"t3_3", nome:"TQ. 3", fuel:"ETANOL",             capacidade:10000, arq:"tri_v2"},
      { id:"t3_4", nome:"TQ. 4", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
    ],
  },
  "P04": { nome: "P. AVIVA",
    tanques: [
      { id:"t4_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
      { id:"t4_2", nome:"TQ. 2", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
      { id:"t4_3", nome:"TQ. 3", fuel:"ETANOL",             capacidade:20000, arq:"bi_20k"},
      { id:"t4_4", nome:"TQ. 4", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
      { id:"t4_5", nome:"TQ. 5", fuel:"DIESEL S-500",       capacidade:15000, arq:"bi_15k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"etanol",             label:"ETANOL" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"diesel_s_500",       label:"DIESEL S-500" },
    ],
  },
  "P05": { nome: "P. BAHAMAS",
    tanques: [
      { id:"t5_1", nome:"TQ. 1", fuel:"ETANOL",             capacidade:10000, arq:"veederroot"},
      { id:"t5_2", nome:"TQ. 2", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"veederroot"},
      { id:"t5_3", nome:"TQ. 3", fuel:"GASOLINA COMUM",     capacidade:10000, arq:"bi_10k"},
      { id:"t5_4", nome:"TQ. 4", fuel:"GASOLINA COMUM",     capacidade:15000, arq:"pleno_15k"},
    ],
    combustiveis: [
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
    ],
  },
  "P06": { nome: "P. BARBOSA",
    tanques: [
      { id:"t6_1", nome:"TQ. 1", fuel:"ETANOL",         capacidade:15000, arq:"bi_15k"},
      { id:"t6_2", nome:"TQ. 2", fuel:"DIESEL S-10",    capacidade:15000, arq:"bi_15k"},
      { id:"t6_3", nome:"TQ. 3", fuel:"GASOLINA COMUM", capacidade:30000, arq:"pleno_30k"},
    ],
    combustiveis: [
      { id:"etanol",         label:"ETANOL" },
      { id:"diesel_s_10",    label:"DIESEL S-10" },
      { id:"gasolina_comum", label:"GASOLINA COMUM" },
    ],
  },
  "P07": { nome: "P. BERNARDO",
    tanques: [
      { id:"t7_1", nome:"TQ. 1", fuel:"ETANOL",         capacidade:15000, arq:"bi_15k"},
      { id:"t7_2", nome:"TQ. 2", fuel:"GASOLINA COMUM", capacidade:15000, arq:"bi_15k"},
      { id:"t7_3", nome:"TQ. 3", fuel:"DIESEL S-10",    capacidade:30000, arq:"pleno_30k"},
      { id:"t7_4", nome:"TQ. 4", fuel:"GASOLINA COMUM", capacidade:20000, arq:"bi_20k"},
      { id:"t7_5", nome:"TQ. 5", fuel:"DIESEL S-500",   capacidade:10000, arq:"bi_10k"},
    ],
    combustiveis: [
      { id:"etanol",         label:"ETANOL" },
      { id:"gasolina_comum", label:"GASOLINA COMUM" },
      { id:"diesel_s_10",    label:"DIESEL S-10" },
      { id:"diesel_s_500",   label:"DIESEL S-500" },
    ],
  },
  "P08": { nome: "P. BOMBOM FILIAL",
    tanques: [
      { id:"t8_1", nome:"TQ. 1", fuel:"ETANOL",             capacidade:30000, arq:"pleno_30k"},
      { id:"t8_2", nome:"TQ. 2", fuel:"DIESEL S-10",        capacidade:15000, arq:"pleno_15k"},
      { id:"t8_3", nome:"TQ. 3", fuel:"GASOLINA COMUM",     capacidade:20000, arq:"bi_20k"},
      { id:"t8_4", nome:"TQ. 4", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
    ],
    combustiveis: [
      { id:"etanol",             label:"ETANOL" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
    ],
  },
  "P09": { nome: "P. BOMBOM MATRIZ",
    tanques: [
      { id:"t9_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:15000, arq:"pleno_15k"},
      { id:"t9_2", nome:"TQ. 2", fuel:"ETANOL",             capacidade:10000, arq:"bi_10k"},
      { id:"t9_3", nome:"TQ. 3", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"tri_v2"},
      { id:"t9_4", nome:"TQ. 4", fuel:"ETANOL",             capacidade:10000, arq:"bi_10k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
    ],
  },
  "P10": { nome: "P. BRUNA",
    tanques: [
      { id:"t10_1", nome:"TQ. 1", fuel:"ETANOL",             capacidade:30000, arq:"pleno_30k"},
      { id:"t10_2", nome:"TQ. 2", fuel:"DIESEL S-500",       capacidade:30000, arq:"pleno_30k"},
      { id:"t10_3", nome:"TQ. 3", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
      { id:"t10_4", nome:"TQ. 4", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
      { id:"t10_5", nome:"TQ. 5", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
      { id:"t10_6", nome:"TQ. 6", fuel:"GASOLINA COMUM",     capacidade:20000, arq:"bi_20k"},
    ],
    combustiveis: [
      { id:"etanol",             label:"ETANOL" },
      { id:"diesel_s_500",       label:"DIESEL S-500" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
    ],
  },
  "P11": { nome: "P. DIFERENCIAL",
    tanques: [
      { id:"t11_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
      { id:"t11_2", nome:"TQ. 2", fuel:"GASOLINA ADITIVADA", capacidade:15000, arq:"bi_15k"},
      { id:"t11_3", nome:"TQ. 3", fuel:"ETANOL",             capacidade:15000, arq:"bi_15k"},
      { id:"t11_4", nome:"TQ. 4", fuel:"DIESEL S-10",        capacidade:15000, arq:"pleno_15k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"etanol",             label:"ETANOL" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
    ],
  },
  "P12": { nome: "P. ESPAÇO REAL",
    tanques: [
      { id:"t12_1", nome:"TQ. 1", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
      { id:"t12_2", nome:"TQ. 2", fuel:"GASOLINA COMUM",     capacidade:20000, arq:"bi_20k"},
      { id:"t12_3", nome:"TQ. 3", fuel:"GASOLINA COMUM",     capacidade:10000, arq:"bi_10k"},
      { id:"t12_4", nome:"TQ. 4", fuel:"ETANOL",             capacidade:20000, arq:"bi_20k"},
      { id:"t12_5", nome:"TQ. 5", fuel:"DIESEL S-500",       capacidade:15000, arq:"bi_15k"},
      { id:"t12_6", nome:"TQ. 6", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
    ],
    combustiveis: [
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"etanol",             label:"ETANOL" },
      { id:"diesel_s_500",       label:"DIESEL S-500" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
    ],
  },
  "P13": { nome: "P. FELIPAO",
    tanques: [
      { id:"t13_1", nome:"TQ. 1", fuel:"DIESEL S-10",    capacidade:10000, arq:"bi_10k"},
      { id:"t13_2", nome:"TQ. 2", fuel:"ETANOL",         capacidade:20000, arq:"bi_20k"},
      { id:"t13_3", nome:"TQ. 3", fuel:"GASOLINA COMUM", capacidade:20000, arq:"bi_20k"},
      { id:"t13_4", nome:"TQ. 4", fuel:"DIESEL S-500",   capacidade:10000, arq:"bi_10k"},
    ],
    combustiveis: [
      { id:"diesel_s_10",    label:"DIESEL S-10" },
      { id:"etanol",         label:"ETANOL" },
      { id:"gasolina_comum", label:"GASOLINA COMUM" },
      { id:"diesel_s_500",   label:"DIESEL S-500" },
    ],
  },
  "P14": { nome: "P. GLÓRIA",
    tanques: [
      { id:"t14_1", nome:"TQ. 1", fuel:"ETANOL",         capacidade:30000, arq:"bi_20k"},
      { id:"t14_2", nome:"TQ. 2", fuel:"GASOLINA COMUM", capacidade:20000, arq:"bi_20k"},
      { id:"t14_3", nome:"TQ. 3", fuel:"DIESEL S-10",    capacidade:10000, arq:"pleno_10k"},
    ],
    combustiveis: [
      { id:"etanol",         label:"ETANOL" },
      { id:"gasolina_comum", label:"GASOLINA COMUM" },
      { id:"diesel_s_10",    label:"DIESEL S-10" },
    ],
  },
  "P15": { nome: "P. ITAPOA",
    tanques: [
      { id:"t15_1", nome:"TQ. 1", fuel:"DIESEL S-10",        capacidade:10000, arq:"bi_10k"},
      { id:"t15_2", nome:"TQ. 2", fuel:"ETANOL",             capacidade:10000, arq:"tri_v2"},
      { id:"t15_5", nome:"TQ. 5", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"    },
      { id:"t15_6", nome:"TQ. 6", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
    ],
    combustiveis: [
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
    ],
  },
  "P16": { nome: "P. JA",
    tanques: [
      { id:"t16_1", nome:"TQ. 1", fuel:"Gasolina Octapro",   capacidade:15000, arq:"bi_15k"},
      { id:"t16_2", nome:"TQ. 2", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
      { id:"t16_3", nome:"TQ. 3", fuel:"ETANOL",             capacidade:15000, arq:"bi_15k"},
      { id:"t16_4", nome:"TQ. 4", fuel:"GASOLINA ADITIVADA", capacidade:15000, arq:"bi_15k"},
      { id:"t16_5", nome:"TQ. 5", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
    ],
    combustiveis: [
      { id:"gasolina_octapro",   label:"Gasolina Octapro" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
    ],
  },
  "P17": { nome: "P. JOCA",
    tanques: [
      { id:"t17_1", nome:"TQ. 1", fuel:"GASOLINA COMUM", capacidade:15000, arq:"bi_15k"},
      { id:"t17_2", nome:"TQ. 2", fuel:"DIESEL S-10",    capacidade:15000, arq:"bi_15k"},
      { id:"t17_3", nome:"TQ. 3", fuel:"ETANOL",         capacidade:15000, arq:"pleno_15k"},
      { id:"t17_4", nome:"TQ. 4", fuel:"ETANOL",         capacidade:15000, arq:"pleno_15k"},
    ],
    combustiveis: [
      { id:"gasolina_comum", label:"GASOLINA COMUM" },
      { id:"diesel_s_10",    label:"DIESEL S-10" },
      { id:"etanol",         label:"ETANOL" },
    ],
  },
  "P18": { nome: "P. LEANDRO",
    tanques: [
      { id:"t18_1", nome:"TQ. 1", fuel:"DIESEL S-500",       capacidade:15000, arq:"bi_15k"},
      { id:"t18_2", nome:"TQ. 2", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
      { id:"t18_3", nome:"TQ. 3", fuel:"ETANOL",             capacidade:30000, arq:"pleno_30k"},
      { id:"t18_4", nome:"TQ. 4", fuel:"GASOLINA COMUM",     capacidade:20000, arq:"bi_20k"},
      { id:"t18_5", nome:"TQ. 5", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
    ],
    combustiveis: [
      { id:"diesel_s_500",       label:"DIESEL S-500" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
    ],
  },
  "P19": { nome: "P. LOURA EMPREENDIMENTOS",
    tanques: [
      { id:"t19_1", nome:"TQ. 1", fuel:"ETANOL",             capacidade:30000, arq:"pleno_30k"},
      { id:"t19_2", nome:"TQ. 2", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
      { id:"t19_3", nome:"TQ. 3", fuel:"DIESEL S-500",       capacidade:15000, arq:"bi_15k"},
      { id:"t19_4", nome:"TQ. 4", fuel:"GASOLINA COMUM",     capacidade:20000, arq:"bi_20k"},
      { id:"t19_5", nome:"TQ. 5", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
    ],
    combustiveis: [
      { id:"etanol",             label:"ETANOL" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"diesel_s_500",       label:"DIESEL S-500" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
    ],
  },
  "P20": { nome: "P. MANGABEIRAS",
    tanques: [
      { id:"t20_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:20000, arq:"bi_20k"},
      { id:"t20_2", nome:"TQ. 2", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
      { id:"t20_3", nome:"TQ. 3", fuel:"ETANOL",             capacidade:10000, arq:"bi_10k"},
      { id:"t20_4", nome:"TQ. 4", fuel:"ETANOL",             capacidade:10000, arq:"tri_v2"},
      { id:"t20_5", nome:"TQ. 5", fuel:"DIESEL S-10",        capacidade:10000, arq:"bi_10k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"etanol",             label:"ETANOL" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
    ],
  },
  "P21": { nome: "P. MIRAGEM JBRETAS",
    tanques: [
      { id:"t21_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",  capacidade:30000, arq:"pleno_30k"},
      { id:"t21_2", nome:"TQ. 2", fuel:"DIESEL S-500",    capacidade:30000, arq:"pleno_30k"},
      { id:"t21_3", nome:"TQ. 3", fuel:"Gasolina Grid",   capacidade:15000, arq:"bi_15k"},
      { id:"t21_4", nome:"TQ. 4", fuel:"DIESEL S-10",     capacidade:15000, arq:"bi_15k"},
      { id:"t21_5", nome:"TQ. 5", fuel:"ETANOL",          capacidade:15000, arq:"bi_15k"},
      { id:"t21_6", nome:"TQ. 6", fuel:"GASOLINA COMUM",  capacidade:15000, arq:"bi_15k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",  label:"GASOLINA COMUM" },
      { id:"diesel_s_500",    label:"DIESEL S-500" },
      { id:"gasolina_grid",   label:"Gasolina Grid" },
      { id:"diesel_s_10",     label:"DIESEL S-10" },
      { id:"etanol",          label:"ETANOL" },
    ],
  },
  "P22": { nome: "PAIVA E PAIVA COMBUSTIVEL",
    tanques: [
      { id:"t22_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
      { id:"t22_2", nome:"TQ. 2", fuel:"ETANOL",             capacidade:10000, arq:"bi_10k"},
      { id:"t22_3", nome:"TQ. 3", fuel:"DIESEL S-500",       capacidade:20000, arq:"bi_20k"},
      { id:"t22_4", nome:"TQ. 4", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
      { id:"t22_5", nome:"TQ. 5", fuel:"DIESEL S-10",        capacidade:20000, arq:"bi_20k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"etanol",             label:"ETANOL" },
      { id:"diesel_s_500",       label:"DIESEL S-500" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
    ],
  },
  "P23": { nome: "P. PARAISO DAS AGUAS",
    tanques: [
      { id:"t23_1", nome:"TQ. 1", fuel:"ETANOL",         capacidade:15000 },
      { id:"t23_2", nome:"TQ. 2", fuel:"GASOLINA COMUM", capacidade:15000 },
      { id:"t23_3", nome:"TQ. 3", fuel:"DIESEL S-10",    capacidade:30000 },
      { id:"t23_4", nome:"TQ. 4", fuel:"GASOLINA COMUM", capacidade:10000 },
      { id:"t23_5", nome:"TQ. 5", fuel:"DIESEL S-500",   capacidade:20000 },
    ],
    combustiveis: [
      { id:"etanol",         label:"ETANOL" },
      { id:"gasolina_comum", label:"GASOLINA COMUM" },
      { id:"diesel_s_10",    label:"DIESEL S-10" },
      { id:"diesel_s_500",   label:"DIESEL S-500" },
    ],
  },
  "P24": { nome: "P. PLANALTO",
    tanques: [
      { id:"t24_1", nome:"TQ. 1", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"veederroot"},
      { id:"t24_2", nome:"TQ. 2", fuel:"GASOLINA COMUM",     capacidade:20000, arq:"veederroot"},
      { id:"t24_3", nome:"TQ. 3", fuel:"DIESEL S-500",       capacidade:10000, arq:"veederroot"},
      { id:"t24_4", nome:"TQ. 4", fuel:"ETANOL",             capacidade:20000, arq:"veederroot"},
      { id:"t24_5", nome:"TQ. 5", fuel:"GASOLINA COMUM",     capacidade:15000, arq:"veederroot"},
      { id:"t24_6", nome:"TQ. 6", fuel:"DIESEL S-10",        capacidade:15000, arq:"veederroot"},
    ],
    combustiveis: [
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"diesel_s_500",       label:"DIESEL S-500" },
      { id:"etanol",             label:"ETANOL" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
    ],
  },
  "P25": { nome: "P. QUATRO RODAS",
    tanques: [
      { id:"t25_1", nome:"TQ. 1", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
      { id:"t25_2", nome:"TQ. 2", fuel:"DIESEL S-10",        capacidade:10000, arq:"tri_v2"},
      { id:"t25_3", nome:"TQ. 3", fuel:"ETANOL",             capacidade:10000, arq:"bi_10k"},
      { id:"t25_4", nome:"TQ. 4", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
      { id:"t25_5", nome:"TQ. 5", fuel:"ETANOL",             capacidade:15000, arq:"pleno_15k"},
      { id:"t25_6", nome:"TQ. 6", fuel:"GNV",                capacidade:30000, arq:"gnv"},
    ],
    combustiveis: [
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"gnv",                label:"GNV" },
    ],
  },
  "P26": { nome: "P. RODRIGO",
    tanques: [
      { id:"t26_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:15000, arq:"bi_15k"},
      { id:"t26_2", nome:"TQ. 2", fuel:"ETANOL",             capacidade:15000, arq:"bi_15k"},
      { id:"t26_3", nome:"TQ. 3", fuel:"GASOLINA COMUM",     capacidade:15000, arq:"bi_15k"},
      { id:"t26_4", nome:"TQ. 4", fuel:"DIESEL S-500",       capacidade:15000, arq:"bi_15k"},
      { id:"t26_5", nome:"TQ. 5", fuel:"GASOLINA ADITIVADA", capacidade:15000, arq:"bi_15k"},
      { id:"t26_6", nome:"TQ. 6", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"etanol",             label:"ETANOL" },
      { id:"diesel_s_500",       label:"DIESEL S-500" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
    ],
  },
  "P27": { nome: "P. SANTA INES MINAS - FILIAL",
    tanques: [
      { id:"t27_1", nome:"TQ. 1", fuel:"ETANOL",             capacidade:15000, arq:"pleno_15k"},
      { id:"t27_2", nome:"TQ. 2", fuel:"GASOLINA ADITIVADA", capacidade:15000, arq:"bi_15k"},
      { id:"t27_3", nome:"TQ. 3", fuel:"ETANOL",             capacidade:15000, arq:"bi_15k"},
      { id:"t27_4", nome:"TQ. 4", fuel:"DIESEL S-500",       capacidade:15000, arq:"bi_15k"},
      { id:"t27_5", nome:"TQ. 5", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
      { id:"t27_6", nome:"TQ. 6", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
    ],
    combustiveis: [
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"diesel_s_500",       label:"DIESEL S-500" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
    ],
  },
  "P28": { nome: "P. SANTA INES MINAS",
    tanques: [
      { id:"t28_1", nome:"TQ. 1", fuel:"ETANOL ADITIVADO",   capacidade:20000, arq:"bi_10k"},
      { id:"t28_2", nome:"TQ. 2", fuel:"DIESEL S-10",        capacidade:10000, arq:"bi_15k"},
      { id:"t28_3", nome:"TQ. 3", fuel:"GASOLINA COMUM",     capacidade:15000, arq:"bi_15k"},
      { id:"t28_4", nome:"TQ. 4", fuel:"GASOLINA ADITIVADA", capacidade:15000, arq:"bi_20k"},
    ],
    combustiveis: [
      { id:"etanol_aditivado",   label:"ETANOL ADITIVADO" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
    ],
  },
  "P29": { nome: "P. SANTA MARIA",
    tanques: [
      { id:"t29_1", nome:"TQ. 1", fuel:"ETANOL",         capacidade:30000, arq:"pleno_30k"},
      { id:"t29_2", nome:"TQ. 2", fuel:"Gasolina Grid",  capacidade:15000, arq:"bi_15k"},
      { id:"t29_3", nome:"TQ. 3", fuel:"GASOLINA COMUM", capacidade:15000, arq:"bi_15k"},
      { id:"t29_4", nome:"TQ. 4", fuel:"DIESEL S-10",    capacidade:15000, arq:"pleno_15k"},
    ],
    combustiveis: [
      { id:"etanol",          label:"ETANOL" },
      { id:"gasolina_grid",   label:"Gasolina Grid" },
      { id:"gasolina_comum",  label:"GASOLINA COMUM" },
      { id:"diesel_s_10",     label:"DIESEL S-10" },
    ],
  },
  "P30": { nome: "P. SAO BERNARDO",
    tanques: [
      { id:"t30_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"veederroot"},
      { id:"t30_2", nome:"TQ. 2", fuel:"GASOLINA ADITIVADA", capacidade:15000, arq:"veederroot"},
      { id:"t30_3", nome:"TQ. 3", fuel:"ETANOL",             capacidade:20000, arq:"veederroot"},
    ],
    combustiveis: [
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"etanol",             label:"ETANOL" },
    ],
  },
  "P31": { nome: "P. SAO LUIZ RL",
    tanques: [
      { id:"t31_1", nome:"TQ. 1", fuel:"GASOLINA COMUM", capacidade:20000, arq:"bi_20k"},
      { id:"t31_2", nome:"TQ. 2", fuel:"DIESEL S-10",    capacidade:10000, arq:"bi_10k"},
      { id:"t31_3", nome:"TQ. 3", fuel:"ETANOL",         capacidade:15000, arq:"bi_15k"},
      { id:"t31_4", nome:"TQ. 4", fuel:"DIESEL S-500",   capacidade:15000, arq:"bi_15k"},
    ],
    combustiveis: [
      { id:"gasolina_comum", label:"GASOLINA COMUM" },
      { id:"diesel_s_10",    label:"DIESEL S-10" },
      { id:"etanol",         label:"ETANOL" },
      { id:"diesel_s_500",   label:"DIESEL S-500" },
    ],
  },
  "P32": { nome: "P. SERENA COLIBRI",
    tanques: [
      { id:"t32_1", nome:"TQ. 1", fuel:"GASOLINA ADITIVADA", capacidade:15000, arq:"veederroot"},
      { id:"t32_2", nome:"TQ. 2", fuel:"ETANOL ADITIVADO",   capacidade:15000, arq:"veederroot"},
      { id:"t32_3", nome:"TQ. 3", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"veederroot"},
      { id:"t32_4", nome:"TQ. 4", fuel:"DIESEL S-10",        capacidade:15000, arq:"veederroot"},
      { id:"t32_5", nome:"TQ. 5", fuel:"DIESEL S-500",       capacidade:15000, arq:"veederroot"},
    ],
    combustiveis: [
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"etanol_aditivado",   label:"ETANOL ADITIVADO" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"diesel_s_500",       label:"DIESEL S-500" },
    ],
  },
  "P33": { nome: "P. TOPAZIO",
    tanques: [
      { id:"t33_1", nome:"TQ. 1", fuel:"ETANOL",             capacidade:15000, arq:"bi_15k"},
      { id:"t33_2", nome:"TQ. 2", fuel:"ETANOL",             capacidade:15000, arq:"bi_15k"},
      { id:"t33_3", nome:"TQ. 3", fuel:"GASOLINA ADITIVADA", capacidade:15000, arq:"pleno_15k"},
      { id:"t33_4", nome:"TQ. 4", fuel:"DIESEL S-10",        capacidade:15000, arq:"pleno_15k"},
      { id:"t33_5", nome:"TQ. 5", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
    ],
    combustiveis: [
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
    ],
  },
  "P34": { nome: "P. TRANCOSO",
    tanques: [
      { id:"t34_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:30000, arq:"pleno_30k"},
      { id:"t34_2", nome:"TQ. 2", fuel:"ETANOL ADITIVADO",   capacidade:15000, arq:"bi_15k"},
      { id:"t34_3", nome:"TQ. 3", fuel:"GASOLINA ADITIVADA", capacidade:15000, arq:"bi_15k"},
      { id:"t34_4", nome:"TQ. 4", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
      { id:"t34_5", nome:"TQ. 5", fuel:"GASOLINA COMUM",     capacidade:15000, arq:"bi_15k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"etanol_aditivado",   label:"ETANOL ADITIVADO" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
    ],
  },
  "P35": { nome: "P. TUNEL",
    tanques: [
      { id:"t35_1", nome:"TQ. 1", fuel:"ETANOL",             capacidade:30000, arq:"veederroot"},
      { id:"t35_2", nome:"TQ. 2", fuel:"GASOLINA ADITIVADA", capacidade:15000, arq:"veederroot"},
      { id:"t35_3", nome:"TQ. 3", fuel:"GASOLINA COMUM",     capacidade:15000, arq:"veederroot"},
    ],
    combustiveis: [
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
    ],
  },
  "P36": { nome: "P. URBANO FERRAZ",
    tanques: [
      { id:"t36_1",   nome:"TQ. 1",   fuel:"GASOLINA COMUM",          capacidade: 30000, arq:"pleno_30k"},
      { id:"t36_2",   nome:"TQ. 2",   fuel:"Gasolina Premium Podium",  capacidade: 15000, arq:"bi_15k"},
      { id:"t36_3",   nome:"TQ. 3",   fuel:"GASOLINA ADITIVADA",       capacidade: 15000, arq:"bi_15k"},
      { id:"t36_4",   nome:"TQ. 4",   fuel:"GASOLINA COMUM",           capacidade: 15000, arq:"bi_15k"},
      { id:"t36_5",   nome:"TQ. 5",   fuel:"DIESEL S-10",              capacidade: 15000, arq:"bi_15k"},
      { id:"t36_6",   nome:"TQ. 6",   fuel:"ETANOL",                   capacidade: 30000, arq:"pleno_30k"},
      { id:"t36_136", nome:"TQ. 136", fuel:"GNV",                      capacidade: 90000, arq:"gnv"},
    ],
    combustiveis: [
      { id:"gasolina_comum",           label:"GASOLINA COMUM" },
      { id:"gasolina_premium_podium",  label:"Gasolina Premium Podium" },
      { id:"gasolina_aditivada",       label:"GASOLINA ADITIVADA" },
      { id:"diesel_s_10",              label:"DIESEL S-10" },
      { id:"etanol",                   label:"ETANOL" },
      { id:"gnv",                      label:"GNV" },
    ],
  },
  "P37": { nome: "P. BIANCA",
    tanques: [
      { id:"t37_1", nome:"TQ. 1", fuel:"GASOLINA COMUM",     capacidade:10000, arq:"bi_10k"},
      { id:"t37_2", nome:"TQ. 2", fuel:"ETANOL",             capacidade:10000, arq:"tri_v2"},
      { id:"t37_3", nome:"TQ. 3", fuel:"GASOLINA ADITIVADA", capacidade:10000, arq:"bi_10k"},
      { id:"t37_4", nome:"TQ. 4", fuel:"GASOLINA COMUM",     capacidade:15000, arq:"bi_15k"},
      { id:"t37_5", nome:"TQ. 5", fuel:"DIESEL S-10",        capacidade:15000, arq:"bi_15k"},
      { id:"t37_6", nome:"TQ. 6", fuel:"DIESEL S-500",       capacidade:15000, arq:"bi_15k"},
      { id:"t37_7", nome:"TQ. 7", fuel:"DIESEL S-500",       capacidade:15000, arq:"bi_15k"},
    ],
    combustiveis: [
      { id:"gasolina_comum",     label:"GASOLINA COMUM" },
      { id:"etanol",             label:"ETANOL" },
      { id:"gasolina_aditivada", label:"GASOLINA ADITIVADA" },
      { id:"diesel_s_10",        label:"DIESEL S-10" },
      { id:"diesel_s_500",       label:"DIESEL S-500" },
    ],
  },
};

// DB aponta para DB_ESTRUTURA — mantém compatibilidade com o restante do código
const DB = DB_ESTRUTURA;

// Preenchido após login via doGet do Apps Script
let ARQUEACAO    = {};
let CONCORRENTES = {};
let CAMPO_EXTRA_COLETA = {};

// Converte cm → litros usando a tabela carregada do servidor
// Para postos Veeder-Root: o gerente informa litros direto (cm já é litros)
// Para GNV: sem tabela, retorna 0
function cmToLitros(cm, capacidade, arq) {
  // Veeder-Root e GNV — sem conversão por tabela
  if (arq === 'veederroot' || arq === 'gnv') return cm;
  // Busca tabela pela chave arq (novo sistema) ou capacidade (fallback legado)
  const tabela = arq ? ARQUEACAO[arq] : ARQUEACAO[capacidade];
  if (!tabela || tabela.length === 0) return 0;
  if (cm <= 0) return 0;
  if (cm >= tabela.length) return tabela[tabela.length - 1];
  return tabela[cm] || 0;
}

// Carrega dados sensíveis do Apps Script após o login
async function carregarDadosSecretos(email, senha) {
  const SHEETS_URL = window._SHEETS_URL;
  if (!SHEETS_URL) return null;
  try {
    const url = SHEETS_URL + '?tipo=login&email=' + encodeURIComponent(email) + '&senha=' + encodeURIComponent(senha);
    const resp = await fetch(url);
    const json = await resp.json();
    if (!json || json.erro) return null;
    // Preenche dados sensíveis em memória (nunca gravados no código)
    ARQUEACAO          = json.arqueacao    || {};
    CONCORRENTES       = json.concorrentes || {};
    CAMPO_EXTRA_COLETA = json.campoExtra   || {};
    return json.usuario; // { email, gerente, postoKey }
  } catch(e) {
    console.error('Erro ao carregar dados do servidor:', e);
    return null;
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('SW registrado:', reg.scope))
      .catch(err => console.log('SW falhou:', err));
  });
}

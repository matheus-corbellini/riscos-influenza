import type { Block, ScoreRange } from "../types";

export const blocks: Block[] = [
  {
    id: 1,
    title: "Aves Silvestres e Ambiente",
    description:
      "Avaliação da exposição a aves silvestres e fatores ambientais",
    color: "#059669",
    icon: "shield",
    questions: [
      {
        id: 1,
        blockId: 1,
        text: "Há açudes, lagoas ou áreas alagadas dentro ou perto da granja (até 5 km)?",
        answers: [
          { text: "Não", score: 0 },
          { text: "Sim - perto (até 5km)", score: 1 },
          { text: "Sim - dentro da granja", score: 2 },
        ],
        feedback:
          "Corpos d'água próximos atraem aves aquáticas migratórias que podem transmitir doenças. Mantenha distância segura e monitore constantemente a presença de aves silvestres.",
      },
      {
        id: 2,
        blockId: 1,
        text: "Costuma avistar aves silvestres perto dos aviários (ex: garças, marrecos, patos-do-mato, joão-de-barro)?",
        answers: [
          { text: "Nunca", score: 0 },
          { text: "Às vezes", score: 1 },
          { text: "Frequentemente", score: 2 },
        ],
        feedback:
          "A presença constante de aves silvestres aumenta significativamente o risco de transmissão de influenza aviária. Implemente medidas de afugentamento e monitoramento rigoroso.",
      },
      {
        id: 3,
        blockId: 1,
        text: "Os aviários possuem telas nas laterais?",
        answers: [
          { text: "Sim, malha até 2,5cm", score: 0 },
          { text: "Sim, malha maior que 2,5cm", score: 1 },
          { text: "Não tem tela", score: 2 },
        ],
        feedback:
          "Telas com malha adequada (≤2,5cm) são essenciais para impedir o contato direto entre aves domésticas e silvestres. Substitua telas inadequadas imediatamente.",
      },
      {
        id: 4,
        blockId: 1,
        text: "Existem granjas vizinhas ou criações de aves próximas à sua propriedade (até 1 km)?",
        answers: [
          { text: "Não", score: 0 },
          { text: "Sim, somente comerciais", score: 1 },
          { text: "Sim, somente caipiras", score: 2 },
          { text: "Sim, comerciais e caipiras", score: 3 },
        ],
        feedback:
          "A proximidade com outras criações, especialmente sistemas caipiras, aumenta o risco de transmissão de doenças. Estabeleça protocolos de comunicação e biosseguridade compartilhada.",
      },
      {
        id: 5,
        blockId: 1,
        text: "Verifica a existência de ninhos de pássaros de vida livre no aviário?",
        answers: [
          { text: "Frequentemente", score: 0 },
          { text: "Às vezes", score: 1 },
          { text: "Nunca", score: 2 },
        ],
        feedback:
          "A verificação regular de ninhos é fundamental para detectar precocemente a presença de aves silvestres. Remova ninhos encontrados e identifique pontos de entrada.",
      },
    ],
  },
  {
    id: 2,
    title: "Água e Alimentação",
    description: "Avaliação da segurança da água e ração fornecidas",
    color: "#2563eb",
    icon: "nutrition",
    questions: [
      {
        id: 6,
        blockId: 2,
        text: "Qual é a principal fonte de água utilizada para as aves?",
        answers: [
          { text: "Rede pública ou poço com proteção", score: 0 },
          { text: "Vertente ou açude fechado", score: 1 },
          { text: "Açude ou rio aberto", score: 2 },
        ],
        feedback:
          "Fontes de água abertas podem estar contaminadas por fezes de aves silvestres. Priorize fontes protegidas e realize análises microbiológicas regulares da água.",
      },
      {
        id: 7,
        blockId: 2,
        text: "É possível que aves de vida livre tenham acesso à ração fornecida às aves?",
        answers: [
          { text: "Improvável", score: 0 },
          { text: "Possível", score: 2 },
          { text: "Provável", score: 3 },
        ],
        feedback:
          "O acesso de aves silvestres à ração favorece o contato direto e a contaminação. Implemente sistemas de alimentação protegidos e armazene a ração adequadamente.",
      },
    ],
  },
  {
    id: 3,
    title: "Entrada de Pessoas, Veículos e Materiais",
    description: "Controle de acesso e biosseguridade na entrada",
    color: "#dc2626",
    icon: "building",
    questions: [
      {
        id: 8,
        blockId: 3,
        text: "Há registro da entrada de pessoas e veículos na granja (livro, planilha ou digital)?",
        answers: [
          { text: "Sim", score: 0 },
          { text: "Às vezes", score: 1 },
          { text: "Não", score: 2 },
        ],
        feedback:
          "O registro de entradas é fundamental para rastreabilidade em caso de surtos. Implemente um sistema rigoroso de controle e registro de todas as entradas.",
      },
      {
        id: 9,
        blockId: 3,
        text: "Os veículos passam por arco ou rodolúvio com desinfetante na entrada da granja?",
        answers: [
          { text: "Sim", score: 0 },
          { text: "Às vezes", score: 1 },
          { text: "Não", score: 2 },
        ],
        feedback:
          "A desinfecção de veículos previne a entrada de patógenos via rodas e carroceria. Instale sistema de desinfecção obrigatório na entrada da propriedade.",
      },
      {
        id: 10,
        blockId: 3,
        text: "Há local para que funcionários ou visitantes troquem de roupa antes de acessar os aviários?",
        answers: [
          { text: "Sim", score: 0 },
          { text: "Não", score: 1 },
        ],
        feedback:
          "Vestiários com troca obrigatória de roupas impedem que patógenos sejam carregados nas vestimentas. Construa vestiários adequados com roupas exclusivas da granja.",
      },
    ],
  },
  {
    id: 4,
    title: "Objetos e Materiais Usados na Granja",
    description: "Manejo e higienização de materiais reutilizáveis",
    color: "#7c3aed",
    icon: "health",
    questions: [
      {
        id: 11,
        blockId: 4,
        text: "Bandejas de ovos, caixas plásticas ou outros materiais retornáveis são lavados e desinfetados antes do uso?",
        answers: [
          { text: "Sempre", score: 0 },
          { text: "Às vezes", score: 1 },
          { text: "Nunca", score: 2 },
        ],
        feedback:
          "Materiais retornáveis podem carregar patógenos entre propriedades. Estabeleça protocolo rigoroso de limpeza e desinfecção de todos os materiais antes da entrada na granja.",
      },
    ],
  },
  {
    id: 5,
    title: "Manejo de Aves Mortas e Cama",
    description: "Destino adequado de aves mortas e material de cama",
    color: "#ea580c",
    icon: "waste",
    questions: [
      {
        id: 12,
        blockId: 5,
        text: "Qual das destinações de aves mortas que eu citarei mais se assemelha com o que é feito aqui na granja?",
        answers: [
          { text: "Compostagem/fossa séptica", score: 0 },
          { text: "Enterradas", score: 1 },
          { text: "Retiradas por terceiros", score: 2 },
          { text: "Enviadas para um aterro", score: 3 },
        ],
        feedback:
          "O descarte inadequado de aves mortas pode contaminar o ambiente e atrair vetores. A compostagem adequada é o método mais seguro para eliminar patógenos.",
      },
      {
        id: 13,
        blockId: 5,
        text: "Qual das destinações da cama de aviário que eu citarei mais se assemelha com o que é feito na granja?",
        answers: [
          { text: "Fertilizante após compostagem/biodigestão", score: 0 },
          {
            text: "Usado como fertilizante após compostagem/biodigestão",
            score: 1,
          },
          { text: "Empresa autorizada recolhe", score: 2 },
          { text: "Descarta num aterro ou terreno", score: 3 },
        ],
        feedback:
          "A cama contaminada pode ser fonte de patógenos. O tratamento adequado por compostagem ou biodigestão elimina riscos antes do uso como fertilizante.",
      },
    ],
  },
  {
    id: 6,
    title: "Treinamento e Gestão",
    description: "Capacitação da equipe e protocolos de biosseguridade",
    color: "#0891b2",
    icon: "training",
    questions: [
      {
        id: 14,
        blockId: 6,
        text: "A equipe ou o responsável pela granja recebeu treinamento sobre biosseguridade nos últimos 12 meses?",
        answers: [
          { text: "Sim", score: 0 },
          { text: "Não", score: 1 },
          { text: "Não sabe", score: 2 },
        ],
        feedback:
          "O treinamento regular da equipe é essencial para a aplicação correta das medidas de biosseguridade. Promova capacitações anuais sobre prevenção de doenças aviárias.",
      },
      {
        id: 15,
        blockId: 6,
        text: "A granja possui um plano ou protocolo escrito de biosseguridade adaptado à sua realidade?",
        answers: [
          { text: "Sim", score: 0 },
          { text: "Não", score: 1 },
        ],
        feedback:
          "Um protocolo escrito garante que todas as medidas sejam seguidas consistentemente. Desenvolva um plano detalhado de biosseguridade específico para sua operação.",
      },
    ],
  },
];

export const scoreRanges: ScoreRange[] = [
  {
    min: 0,
    max: 6,
    level: "muito baixo",
    message:
      "Excelente! Sua granja apresenta risco MUITO BAIXO para influenza aviária. As medidas de biosseguridade estão adequadas. Continue mantendo essas boas práticas e realize avaliações periódicas.",
    color: "#10B981",
  },
  {
    min: 7,
    max: 13,
    level: "baixo",
    message:
      "Sua granja apresenta risco BAIXO para influenza aviária. A maioria das medidas de biosseguridade estão adequadas, mas algumas melhorias pontuais podem fortalecer ainda mais a proteção.",
    color: "#059669",
  },
  {
    min: 14,
    max: 20,
    level: "moderado",
    message:
      "Sua granja apresenta risco MODERADO para influenza aviária. Algumas melhorias nas medidas de biosseguridade podem reduzir significativamente o risco de introdução do vírus..",
    color: "#F59E0B",
  },
  {
    min: 21,
    max: 27,
    level: "alto",
    message:
      "ATENÇÃO! Sua granja apresenta risco ALTO para influenza aviária. É urgente implementar melhorias nas medidas de biosseguridade. A vulnerabilidade atual coloca o plantel em risco significativo.",
    color: "#EF4444",
  },
  {
    min: 28,
    max: 50,
    level: "muito alto",
    message:
      "ALERTA MÁXIMO! Sua granja apresenta risco MUITO ALTO para influenza aviária. A situação requer intervenção para evitar INGRESSO do vírus no futuro. As medidas de biosseguridade abaixo precisam ser revisadas e implementadas o mais rápido possível. Procure a ajuda de um técnico.",
    color: "#DC2626",
  },
];

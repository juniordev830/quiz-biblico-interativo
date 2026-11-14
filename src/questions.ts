export const levels = ['Iniciante', 'Intermediário', 'Avançado'] as const;
export type Level = typeof levels[number];
export type Question = { id: string; book: string; level: Level; prompt: string; options: string[]; answer: number; reference: string; reasoning: string };

const rows: [string, Level, string, string[], number, string, string][] = [
  ['Gênesis','Iniciante','Quem recebeu o chamado para sair de sua terra em direção a uma terra que Deus mostraria?', ['Noé','Abraão','Isaque','José'],1,'Gênesis 12:1–4','Abrão, que mais tarde recebe o nome Abraão, parte conforme o chamado.'],
  ['Gênesis','Intermediário','Quem sugeriu guardar alimento no Egito durante os anos de fartura?', ['José','Judá','Jacó','Benjamim'],0,'Gênesis 41:33–36','José propõe armazenar parte da produção para enfrentar os anos de fome.'],
  ['Gênesis','Avançado','Com que nome Jacó identifica o lugar depois de seu sonho com uma escada?', ['Siquém','Hebrom','Peniel','Betel'],3,'Gênesis 28:10–19','O relato liga o nome Betel à experiência e menciona o nome anterior da cidade, Luz.'],
  ['Êxodo','Iniciante','Quem encontra a sarça em chamas enquanto cuidava do rebanho?', ['Arão','Josué','Moisés','Gideão'],2,'Êxodo 3:1–6','Moisés se aproxima para observar a sarça e ouve o chamado de Deus.'],
  ['Êxodo','Intermediário','O que Israel recolhia como alimento no deserto, conforme Êxodo 16?', ['Figos','Maná','Azeitonas','Uvas'],1,'Êxodo 16:13–16','O povo recolhe o alimento que aparece pela manhã e que mais adiante é chamado maná.'],
  ['Êxodo','Avançado','Quem aconselha Moisés a distribuir parte do trabalho de julgar as causas do povo?', ['Jetro','Hur','Calebe','Bezalel'],0,'Êxodo 18:13–24','Jetro vê a sobrecarga e propõe escolher outras pessoas para cuidar das causas mais simples.'],
  ['Rute','Iniciante','Qual das duas noras acompanhou Noemi até Belém?', ['Orfa','Rute','Ana','Mical'],1,'Rute 1:14–19','Rute permanece com Noemi e as duas chegam juntas a Belém.'],
  ['Rute','Intermediário','Qual era o nome do proprietário do campo em que Rute foi recolher espigas?', ['Elimeleque','Malom','Quiliom','Boaz'],3,'Rute 2:1–8','O narrador identifica Boaz e apresenta o primeiro diálogo dele com Rute no campo.'],
  ['Rute','Avançado','Segundo a genealogia final do livro, qual é o parentesco de Obede com Davi?', ['Pai','Irmão','Avô','Bisavô'],2,'Rute 4:17–22','Obede é pai de Jessé, e Jessé é pai de Davi.'],
  ['Salmos','Iniciante','Qual ocupação fornece a imagem inicial do Salmo 23?', ['Pescador','Ferreiro','Oleiro','Pastor'],3,'Salmos 23:1–4','A imagem do pastor conduz às ideias de cuidado, descanso e proteção.'],
  ['Salmos','Intermediário','No Salmo 1, qual imagem descreve a estabilidade de quem medita na instrução do Senhor?', ['Uma árvore junto a águas','Uma coroa no templo','Uma lâmpada de azeite','Um abrigo na montanha'],0,'Salmos 1:1–3','O poema usa uma árvore irrigada que dá fruto no tempo apropriado.'],
  ['Salmos','Avançado','Em qual lugar o salmista do Salmo 73 descreve a mudança de sua perspectiva sobre os perversos?', ['No exílio','Nos portões da cidade','No santuário de Deus','À margem de um rio'],2,'Salmos 73:12–17','A mudança ocorre ao entrar no santuário e reconsiderar o fim das pessoas que pareciam prosperar.'],
  ['Mateus','Iniciante','Qual oração modelo aparece no Sermão do Monte?', ['Pai Nosso','Cântico de Ana','Cântico de Maria','Oração de Jabez'],0,'Mateus 6:9–13','Jesus apresenta uma oração que começa pela invocação ao Pai.'],
  ['Mateus','Intermediário','Que livro Jesus cita ao responder à primeira tentação no deserto?', ['Isaías','Deuteronômio','Salmos','Êxodo'],1,'Mateus 4:3–4; Deuteronômio 8:3','Sua resposta retoma a instrução de Deuteronômio sobre alimento e dependência de Deus.'],
  ['Mateus','Avançado','Qual profeta é retomado para explicar a entrada de Jesus em Jerusalém montado em um jumento?', ['Malaquias','Amós','Joel','Zacarias'],3,'Mateus 21:4–5; Zacarias 9:9','A figura do rei humilde montado em jumento retoma Zacarias 9:9.'],
  ['João','Iniciante','Quem visita Jesus de noite para conversar sobre seu ensino?', ['Tomé','Filipe','Nicodemos','Natanael'],2,'João 3:1–3','Nicodemos procura Jesus à noite e passa a ouvir sobre nascer de novo.'],
  ['João','Intermediário','Na imagem usada em João 15, qual papel cabe ao Pai?', ['Agricultor','Vinha','Ramo','Fruto'],0,'João 15:1–5','Jesus se apresenta como a videira, e identifica o Pai como o agricultor.'],
  ['João','Avançado','A qual discípulo André fala primeiro depois de ter encontrado Jesus?', ['Tiago','Simão Pedro','Judas Tadeu','Filipe'],1,'João 1:40–42','André encontra seu irmão Simão e o leva a Jesus.'],
  ['Atos','Iniciante','Qual festa é mencionada no relato da vinda do Espírito em Atos 2?', ['Purim','Tabernáculos','Dedicação','Pentecostes'],3,'Atos 2:1–4','O narrador identifica a ocasião como o dia de Pentecostes.'],
  ['Atos','Intermediário','Em que cidade os ouvintes examinam as Escrituras depois de ouvir Paulo e Silas?', ['Filipos','Corinto','Bereia','Éfeso'],2,'Atos 17:10–12','Os ouvintes de Bereia conferem nas Escrituras o que lhes era anunciado.'],
  ['Atos','Avançado','Quem é apresentada como comerciante de púrpura em Filipos?', ['Priscila','Lídia','Febe','Safira'],1,'Atos 16:11–15','Lídia, natural de Tiatira, ouve a mensagem em Filipos e recebe o grupo em sua casa.'],
  ['Filipenses','Iniciante','Qual pessoa é apresentada como modelo de humildade no capítulo 2?', ['Jesus Cristo','Timóteo','Paulo','Epafrodito'],0,'Filipenses 2:5–11','A exortação leva a pensar na atitude de Cristo em seu serviço e humilhação.'],
  ['Filipenses','Intermediário','Quais duas pessoas Paulo encoraja a buscar acordo na comunidade?', ['Priscila e Áquila','Marta e Maria','Lídia e Febe','Evódia e Síntique'],3,'Filipenses 4:2–3','Paulo menciona as duas pelo nome e pede ajuda para a reconciliação.'],
  ['Filipenses','Avançado','Quem Paulo descreve como colaborador e enviado dos filipenses para atendê-lo?', ['Silas','Epafrodito','Tito','Barnabé'],1,'Filipenses 2:25–30','Paulo descreve Epafrodito como cooperador e enviado da comunidade e recomenda que o recebam com alegria.'],
];

export const questions: Question[] = rows.map(([book, level, prompt, options, answer, reference, reasoning], index) =>
  ({ id: String(index + 1), book, level, prompt, options, answer, reference, reasoning }));

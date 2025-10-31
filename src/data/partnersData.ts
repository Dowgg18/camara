const SUPABASE_URL = 'https://yaidydirpyocmusyhzeq.supabase.co';

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
}

export const partnersData: Partner[] = [
  {
    id: 'abpa',
    name: 'ABPA - Associação Brasileira de Proteína Animal',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-abpa_1.jpg`,
    category: 'Agronegócio',
    description: 'Empresas e entidades das cadeias agroindustriais de aves, ovos e suínos de todo o Brasil reuniram-se no dia 24 de março de 2014 para criar a Associação Brasileira de Proteína Animal (ABPA), que nasceu a partir da junção da União Brasileira de Avicultura (UBABEF) e da Associação Brasileira da Indústria Produtora e Exportadora de Carne Suína (ABIPECS).\n\nFrancisco Turra, ex-presidente da UBABEF, foi indicado para assumir o cargo de presidente executivo da nova entidade, que conta com duas vice-presidências: de aves, assumida pelo ex-diretor de Mercados da UBABEF, Ricardo Santin; e de suínos, comandada pelo ex-presidente da ABIPECS, Rui Eduardo Saldanha Vargas.\n\nCom a criação da ABPA, UBABEF e ABIPECS foram extintas como entidades representativas da avicultura e da suinocultura nacionais, respectivamente.\n\nA ABPA já nasceu como maior entidade representativa do setor de proteína animal do Brasil: são 132 associados. Com a União, a meta é chegar a 150 associados.\n\nCom um Produto Interno Bruto (PIB) total de R$ 80 bilhões, juntas, as cadeias produtivas avícolas e suinícolas geram 1,756 milhão de empregos diretos – sendo mais de 400 mil deles apenas nas plantas frigoríficas – totalizando 4,155 milhões de postos de trabalho (entre diretos e indiretos). Somadas, as exportações de aves, ovos e suínos totalizaram quase US$ 10 bilhões em 2013, ou 4,1% das exportações totais do Brasil e 10% das exportações do agronegócio brasileiro.'
  },
  {
    id: 'apex',
    name: 'APEX Brasil',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-apex_1.jpg`,
    category: 'Exportação',
    description: 'A Agência Brasileira de Promoção de Exportações e Investimentos (Apex-Brasil) atua para promover os produtos e serviços brasileiros no exterior e atrair investimentos estrangeiros para setores estratégicos da economia brasileira.\n\nPara alcançar os objetivos, a Apex-Brasil realiza ações diversificadas de promoção comercial que visam promover as exportações e valorizar os produtos e serviços brasileiros no exterior, como missões prospectivas e comerciais, rodadas de negócios, apoio à participação de empresas brasileiras em grandes feiras internacionais, visitas de compradores estrangeiros e formadores de opinião para conhecer a estrutura produtiva brasileira entre outras plataformas de negócios que também têm por objetivo fortalecer a marca Brasil.\n\nA Agência também atua de forma coordenada com atores públicos e privados para atração de investimentos estrangeiros diretos (IED) para o Brasil com foco em setores estratégicos para o desenvolvimento da competitividade das empresas brasileiras e do país.\n\nInternamente, há uma preocupação em fornecer aos colaboradores um ambiente organizacional igualitário e justo. Tal postura foi reconhecida com o selo Pró-Equidade de Gênero e Raça, criado pela Secretaria de Políticas para as Mulheres da Presidência da República, recebido no ano de 2015.'
  },
  {
    id: 'aeb',
    name: 'AEB - Associação de Comércio Exterior do Brasil',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-associacao-comercio-brasil-aeb_1.jpg`,
    category: 'Comércio Exterior',
    description: 'A Associação de Comércio Exterior do Brasil (AEB) é uma entidade privada, sem fins lucrativos, que congrega e representa o segmento empresarial de exportação e importação de mercadorias e serviços, bem como as atividades correlatas e afins.\n\nA AEB tem como principal objetivo defender os interesses dos associados, propugnando junto aos órgãos públicos e privados pela adoção de medidas que favoreçam a expansão competitiva e sustentável do comércio exterior.\n\nA AEB busca também promover a aproximação dos diversos segmentos que atuam na cadeia de negócios do comércio exterior, para fins de estudos técnicos, cooperação e defesa dos interesses e objetivos comuns, visando sempre o desenvolvimento econômico e social do País.\n\nConstituem ainda objetivos finalísticos da AEB: estudar os assuntos relacionados ao comércio exterior e propor soluções de problemas que afetam o seu desenvolvimento; realizar pesquisas, estudos, eventos e levantamentos estatísticos da importação e exportação, que sirvam de base orientadora para a política de comércio exterior e para as atividades dos associados; cooperar para o aprimoramento técnico da produção e comercialização, da logística e sistemas de transportes, do financiamento e seguro de crédito, de modo a obter reduções de custos, melhoria da produtividade e qualidade de produtos e serviços, que assegurem posição mais competitiva nos mercados globais; propugnar por legislação e medidas que contribuam para a facilitação e expansão do comércio exterior de mercadorias e serviços, bem como da base de empresas exportadoras e importadoras; colocar à disposição dos associados dados e informações técnicas especializadas e prestar assistência em matéria de comércio externo; estabelecer relações com entidades congêneres, nacionais e internacionais, estimulando a aproximação e cooperação na defesa de princípios comuns aos adotados pela AEB; e tomar quaisquer outras iniciativas que beneficiem os interesses do comércio exterior e assegurem o desenvolvimento social e econômico do País.'
  },
  {
    id: 'fcce',
    name: 'FCCE - Federação das Câmaras de Comércio Exterior',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-federacao-camara-comercio-exterior_1.jpg`,
    category: 'Comércio Exterior',
    description: 'A FCCE é a mais antiga associação de classe no Brasil dedicada exclusivamente às atividades do Comércio Exterior, É uma associação sem fins lucrativos, com personalidade jurídica e sede no Rio de Janeiro (RJ).\n\nA FCCE, por força de seu Estatuto, tem âmbito nacional, possuindo Vice-Presidentes Regionais em todo o Brasil, operando também no plano internacional, através de "Convênios de Cooperação" firmados com diferentes organismos da mais alta credibilidade e tradição, a exemplo da "International Chamber of Commerce – ICC (Câmara de Comércio Internacional), fundada em 1919, com sede em Paris, e que possui mais de oitenta Comitês Nacionais, nos cinco continentes, alem de operar a mais importante "Corte Internacional de Arbitragem" do mundo, fundada no ano de 1923.\n\nA FEDERAÇÃO DAS CÂMARAS DE COMÉRCIO EXTERIOR tem sua sede no edifício da Confederação Nacional do Comércio de Bens, Serviços e Turismo e mantém com essa entidade, há mais de duas décadas, "Convênio de Suporte Administrativo e Protocolo de Cooperação Mútua".\n\nEm passado recente, a FEDERAÇÃO DAS CÂMARAS DE COMÉRCIO EXTERIOR assinou convênio com o CONSELHO DE CÂMARAS DE COMÉRCIO DAS AMÉRICAS, entidade que representa as Câmaras de Comércio Bilaterais dos seguintes países: ARGENTINA, BOLÍVIA, CANADÁ, CHILE, CUBA, EQUADOR, MÉXICO, PARAGUAI, SURINAME, URUGUAI, TRINIDAD E TOBAGO e VENEZUELA.\n\nAlém de mais de uma centena de Câmaras de Comércio Bilaterais filiadas à FCCE em todo o Brasil, fazem parte da Diretoria atual, os presidentes das Câmaras de Comércio: Brasil-Grécia, Brasil-Rússia, Brasil-Eslováquia, Brasil-República Tcheca, Brasil-México, Brasil-Belarus, Brasil-Portugal, Brasil-Líbano, Brasil-Índia, Brasil-China, Brasil-Tailândia, Brasil-Moçambique, Brasil-Indonésia, além do Presidente do Comitê Brasileiro da Câmara de Comércio Internacional, o Presidente da Associação Brasileira da Indústria Ferroviária – ABIFER, o Presidente do Conselho Empresarial de Comércio Exterior, o Presidente do Sindicato das Indústrias Mecânicas e Material Elétrico, o Presidente da Federação das Entidades Líbano – Brasilienses entre outros.\n\nSome-se, ainda a presença de diversos Cônsules e diplomatas estrangeiros, dentre os quais, o Cônsul Geral da República do Gabão, o Cônsul Geral da Tailândia, o Cônsul Geral da Indonésia e o Cônsul Geral de Moçambique, entre outros.'
  },
  {
    id: 'iloverio',
    name: 'I Love Rio',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-i-love-rio_1.jpg`,
    category: 'Turismo',
    description: 'Definido pela mídia como "a primeira cidade reconstruída on-line" e "a primeira enciclopédia virtual do Rio de Janeiro", o I LOVE RIO é um projeto internacional, resultado de anos de trabalho destinados a mostrar a cidade e o estado do Rio de Janeiro. perspectivas históricas, turísticas e culturais únicas, como nunca antes, em qualquer região do mundo.\n\nCom cerca de 25.000 páginas de conteúdo, milhares de imagens e centenas de milhares de links externos e internos, o I LOVE RIO oferece uma nova interpretação turístico-cultural, além de acesso direto a uma infinidade de artigos científicos e acadêmicos, além das informações padrão para visitantes.\n\nO portal foi concebido para mostrar como cada característica do Rio de Janeiro veio a se desenvolver, explicando como várias partes do Rio de Janeiro afetam a vida carioca, tradições e produções artístico-culturais.'
  },
  {
    id: 'ibp',
    name: 'IBP - Instituto Brasileiro de Petróleo, Gás e Biocombustíveis',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-instituto-brasileiro-de-petroleo-gas-e-biocombustiveis_1.jpg`,
    category: 'Energia',
    description: 'IBP: A Casa da Nossa Indústria\n\nComo representante institucional do setor de petróleo, gás e biocombustíveis, atuam há mais de 61 anos em prol do desenvolvimento de uma indústria nacional competitiva, ética e socialmente responsável.\n\nSão a Casa da Nossa Indústria e trabalham com práticas isentas, apartidárias, transparentes, onde buscam o consenso entre os diversos atores da indústria, gerando um grande valor para toda a cadeia de óleo e gás, órgãos reguladores e governo.\n\nNas áreas regulatória e institucional, atuam em defesa da indústria em todos os fóruns e audiências públicas em que se discutem a regulamentação, a tributação e a fiscalização do setor. A participação e representatividade são reconhecidas nas agências reguladoras e nas várias instâncias de governo.\n\nAtuam de forma abrangente em toda a cadeia de petróleo, gás e biocombustíveis, num ambiente aberto e democrático, guiado pelo respeito a opiniões divergentes e pela busca do equilíbrio de interesses, promovendo a cooperação entre os representantes da indústria e seus diferentes públicos e interlocutores.\n\nAs comissões técnicas do IBP são a base do capital intelectual, onde procuram estimular o networking, o intercâmbio de experiências, a geração de conhecimento e a ação colaborativa entre representantes de todos os segmentos envolvidos.\n\nTem ainda uma rede de mais de 1.300 especialistas que atuam em comissões técnicas. O Conselho e Diretoria são formados por altos executivos de empresas associadas que também se dedicam a gerir o Instituto com o objetivo de fomentar a indústria em bases competitivas.\n\nO que existe de mais atual em inovação, tecnologia, gestão e sustentabilidade, a partir de exemplos brasileiros e internacionais, é trazido à tona com frequência em debates que permeiam todas as atividades, com o objetivo de estimular o desenvolvimento da indústria no presente e em sua visão de futuro.\n\nA sede fica na cidade do Rio de Janeiro – capital nacional do petróleo e o principal polo turístico e cultural do país – e conta com cerca de 100 colaboradores.\n\nAs comissões técnicas também fornecem insumos para publicações, estudos, normas e ajudam a identificar os principais desafios da indústria de energia para a geração de treinamento e eventos'
  },
  {
    id: 'pronto',
    name: 'Pronto RJ',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-pronto_1.jpg`,
    category: 'Comunicação',
    description: 'A Pronto RJ é uma agência formada por especialistas em: estratégia de comunicação e marketing, responsabilidade social e relacionamento corporativo\n\nPartindo de experiências positivas com o mercado-alvo, nossa equipe desenvolve estratégias que vão além das abordagens tradicionais. Contribuís para o sucesso dos clientes, oferecendo serviços com foco em três pilares:\n\nComunicação Integrada: Relações Públicas, Conteúdo; Mídia social; Imprensa e Influenciadores; Engajamento Interno; Relações Institucionais.\nMarketing: Estratégias, Eventos e Hospitalidade Corporativa.\nResponsabilidade Social: Desenvolvimento e Gestão de Projetos Sociais.\n\nA agência PRONTO RJ mescla estratégia e criatividade para definir e disseminar narrativas em múltiplas plataformas.'
  },
  {
    id: 'redeagentes',
    name: 'Rede Agentes',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-redeagentes_1.jpg`,
    category: 'Comércio Exterior',
    description: 'A Rede Nacional de Agentes de Comércio Exterior-Redeagentes consiste em um programa criado com o propósito de difundir a cultura exportadora e estimular a inserção de empresas de pequeno porte no mercado externo, principalmente por intermédio da realização de treinamentos, cursos e oficinas sobre como exportar.\n\nAs atividades do Programa Redeagentes, relacionadas a seguir, foram integradas ao Plano Nacional da Cultura Exportadora-PNCE e passaram a ser agendadas de modo a atender à demanda gerada por parte do PNCE.'
  },
  {
    id: 'rosneft',
    name: 'Rosneft',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-rosneft_1.jpg`,
    category: 'Energia',
    description: 'A Rosneft é a líder da indústria de petróleo da Rússia e a maior companhia de petróleo de capital aberto do mundo. As principais atividades da empresa incluem prospecção e exploração de depósitos de hidrocarbonetos, produção de petróleo, gás e condensado, projetos offshore a montante, processamento, bem como petróleo, gás e marketing de produtos na Rússia e no exterior.\n\nA empresa está incluída na lista de empresas e organizações estratégicas da Rússia. O maior acionista da empresa (50,00000001% do capital) é o JSC ROSNETEGAZ, integralmente detido pelo governo russo, enquanto a BP detém 19,75% das ações, QH Oil Investments LLC detém 18,93% das ações, uma ação pertence ao estado representado pela Agência Federal para Administração Estatal de Imóveis, enquanto as ações remanescentes são free floating (vide Estrutura Acionária).\n\nOs principais objetivos da Rosneft são a taxa de reposição de reservas em um nível mínimo de 100%, produção efetiva em brownfields e aumento de produção através do desenvolvimento de greenfields, criação de novos clusters de produção na prateleira, desenvolvimento de tecnologias e implementação de projeto de alto nível. práticas de gestão, monetização das reservas de gás e crescimento competitivo da produção, ótima configuração das refinarias e maximização dos lucros na distribuição. O desempenho bem-sucedido da empresa em 2016 evidencia a eficiência da estratégia aplicada e o significado de nossas prioridades. Tudo isso torna possível confiar no desenvolvimento sustentável da Rosneft no futuro para beneficiar seus acionistas.'
  },
  {
    id: 'siqueiracastro',
    name: 'Siqueira Castro',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-siqueira-castro-1.jpg`,
    category: 'Jurídico',
    description: 'Em 1948, o Brasil, recém-saído da Segunda Guerra Mundial, começava a ver nascer os primeiros escritórios de advocacia voltados para o mundo dos negócios. Foi nesse ambiente que quatro notáveis advogados criaram, no Rio de Janeiro, a base que daria origem à SiqueiraCastro. Nos anos 70, aos fundadores Drs. Braz Sergio Olivier de Camargo, Luiz Lebre Pereira das Neves, Antonio Vicente da Silva Salgado e Joaquim Corrêa Lino – que antes foram sócios do renomado escritório do Dr. Richard P. Momsen – associou-se o Professor Carlos Roberto Siqueira Castro, que teve papel fundamental no crescimento do escritório e deu continuidade ao projeto.\n\nOs anos 90 marcaram o desenvolvimento da economia brasileira, com processos de privatização, a estabilização da moeda nacional e o controle inflacionário. O ambiente de negócios se tornou cada vez mais sofisticado, com o investimento por parte de empresas dos mais diversos continentes, bem como a internacionalização de grandes grupos brasileiros, que expandiram seus negócios para outros países.\n\nA SiqueiraCastro foi protagonista dessas importantes mudanças. Criou novas áreas de negócios, abriu escritórios em todo o território nacional e tornou-se o que é hoje: um escritório full solution. Atualmente, contamos com cerca de 2.500 colaboradores em nossos 18 escritórios próprios espalhados pelo Brasil e atendemos em torno de 3 mil clientes, dos mais variados segmentos econômicos, em todas as áreas do Direito.'
  },
  {
    id: 'sputnik',
    name: 'Sputnik',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-sputnik_1.jpg`,
    category: 'Mídia',
    description: 'Sputnik é uma agência de notícias moderna, seus produtos incluem feeds de notícias, sites, redes sociais e aplicativos móveis, radiodifusão e centros de imprensa multimídia.\n\nA sede da Sputnik se encontra em Moscou, mas a agência têm escritórios nos principais países e regiões por todo o mundo, incluindo no Brasil (Rio de Janeiro), EUA (Washington), China (Pequim), França (Paris), Alemanha (Berlim), Egito (Cairo) e Reino Unido (Londres e Edimburgo).\n\nA agência relata notícias da política e da economia mundial e está orientada para um auditório internacional.\n\nA marca de mídia Sputnik foi lançada no dia 10 de novembro de 2014 pelo grupo de mídia russo Rossiya Segodnya. Neste momento a Sputnik possui mais de 30 redações em línguas diferentes, incluindo em língua portuguesa, inglesa, espanhola, francesa, alemã, árabe, chinesa e outras.\n\nAs emissões de rádio da Sputnik são efetuadas em sites e usando formatos modernos, como FM, radiodifusão sonora digital DAB/DAB+ (Digital Audio Broadcasting), e atingem a quantidade total de mais de 800 horas por dia.\n\nOs feeds de notícias da Sputnik em inglês, espanhol, árabe e chinês estão disponíveis 24 horas por dia.\n\nOs fotógrafos da agência trabalham por todo o mundo e muitas vezes têm sido galardoados com prêmios internacionais prestigiosos na área do jornalismo fotográfico, como World Press Photo e Magnum Photography Awards. A agência tem seu próprio banco de fotos Sputnik Images, a partir do qual comercializa fotos, vídeos e infográficos.'
  },
  {
    id: 'liderroll',
    name: 'Liderroll',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-liderroll_2.jpg`,
    category: 'Engenharia',
    description: 'A Liderroll Indústria e Comércio de Suportes Especiais LTDA, empresa que detém no cenário nacional uma posição de destaque dentre as mais importantes empresas de engenharia e construção do Brasil, com um importante portfólio de obras executadas e presença marcante no cenário de óleo e gás. Nossa trajetória tem sido marcada pela capacidade de inovar, assumir riscos e ousar no desenvolvimento de novas tecnologias e implementação de soluções diferenciadas e inovadoras.\n\nTemos uma equipe de profissionais experientes, na área de engenharia, de desenvolvimento de projetos e de execução de obras de oleodutos e gasodutos de grande relevância para a Petrobras e para o Brasil. Uma equipe altamente qualificada para a realização de um trabalho de excelência.\n\nTALENTO BRASILEIRO A SERVIÇO DA ENGENHARIA MUNDIAL\n\nA LIDERROLL, empresa 100% brasileira de soluções de engenharia, fundada em 2007, com sede no município de Duque de Caxias, próximo à REDUC e com escritórios nas cidades do Rio de Janeiro e Houston – EUA , considerada a capital mundial do Petróleo, desenvolve projetos de PIPELINE, fabrica suportes especiais e de grandes diâmetros – 38\' a 98" – , executa obras de instalação, construção e montagem no mercado de óleo e gás.\n\nDesde a sua fundação, a LIDERROLL obteve destaque internacional com o projeto e desenvolvimento dos roletes de plástico de alta performance de giro livre ( RPAP ) e motorizados ( RMOPAPA ) . A LIDERROLL marcou presença em obras de grande importância estratégica para a PETROBRAS, tais como:\n\n• BALSA BGL-1 (Stinger);\n• TERMINAL DE GNL DO PECÉM;\n• TAIC – TERMINAL AQUAVIÁRIO DA ILHA COMPRIDA;\n• TÚNEL DO GASODUTO GASDUC III (com 3900 metros de extensão e pipeline de 38 polegadas X 0.812");\n• TÚNEL DO GASODUTO GASTAU (com 5100 metros de extensão e pipeline de 28 polegadas X 0.625"), na SERRA DO MAR.\n\nCom uma equipe de engenharia de alta capacidade técnica, a LIDERROLL foi a vencedora do prêmio GLOBAL PIPELINE AWARD 2011, concedido pela ASME para a MELHOR TECNOLOGIA INOVADORA PARA A INDÚSTRIA MUNDIAL DE DUTOS no ano de 2011, prêmio nunca antes concedido a uma empresa brasileira.'
  },
  {
    id: 'mileunity',
    name: 'Mile Unity Foundation',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-mile-unity-foundation-1.jpg`,
    category: 'Tecnologia',
    description: 'A Mile Unity Foundation (MUF) é uma organização global de benefício público que está divulgando tecnologias digitais para criar uma economia global mais justa, que capacita os 4 bilhões de pessoas no mundo em desenvolvimento e estimula o crescimento econômico em todo o mundo.\n\nO Mile Blockchain fornece ferramentas fundamentais para a construção de uma economia global justa, transparente e eficiente, governada pelo povo.'
  },
  {
    id: 'lufthansa',
    name: 'Lufthansa',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-lufthansa_1 (1).jpg`,
    category: 'Aviação',
    description: 'A Lufthansa é uma das principais companhias aéreas do mundo, oferecendo conexões entre Brasil e Rússia através de sua extensa rede de rotas internacionais.'
  },
  {
    id: 'moscow',
    name: 'Moscow',
    logo: `${SUPABASE_URL}/storage/v1/object/public/images/imagens/camara-brasil-russia-de-comercio-industria-e-turismo-moscow_1.jpg`,
    category: 'Governo',
    description: 'Parceria institucional com representações governamentais de Moscou para fortalecer as relações comerciais e culturais entre Brasil e Rússia.'
  }
];

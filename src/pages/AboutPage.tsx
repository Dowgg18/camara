import { useLanguage } from '../contexts/LanguageContext';
import { Building2, Users, TrendingUp, Handshake, Globe2, Award, CheckCircle2 } from 'lucide-react';

export const AboutPage = () => {
  const { language } = useLanguage();

  const benefits = [
    {
      icon: Building2,
      title_pt: 'Imagem Institucional',
      title_ru: 'Институциональный имидж',
      title_en: 'Institutional Image',
      desc_pt: 'Associe sua empresa a uma organização sólida e prestigiada há mais de 40 anos no Brasil e na Rússia.',
      desc_ru: 'Свяжите свою компанию с солидной и престижной организацией с более чем 40-летней историей в Бразилии и России.',
      desc_en: 'Associate your company with a solid and prestigious organization with over 40 years of history in Brazil and Russia.'
    },
    {
      icon: TrendingUp,
      title_pt: 'Promoção e Agilização de Negócios',
      title_ru: 'Продвижение и ускорение бизнеса',
      title_en: 'Business Promotion and Acceleration',
      desc_pt: 'Encurte etapas operacionais utilizando nossa rede de contatos com órgãos estatais e empresariais.',
      desc_ru: 'Сократите операционные этапы, используя нашу сеть контактов с государственными и бизнес-организациями.',
      desc_en: 'Shorten operational steps using our network of contacts with government and business organizations.'
    },
    {
      icon: Users,
      title_pt: 'Comunicação e Marketing',
      title_ru: 'Коммуникация и маркетинг',
      title_en: 'Communication and Marketing',
      desc_pt: 'Divulgue seu perfil em nossas ferramentas de mídia: site, newsletter, impressos e eventos.',
      desc_ru: 'Продвигайте свой профиль через наши медиа-инструменты: сайт, рассылки, печатные материалы и мероприятия.',
      desc_en: 'Promote your profile through our media tools: website, newsletter, printed materials, and events.'
    },
    {
      icon: Handshake,
      title_pt: 'Participação Gratuita em Eventos',
      title_ru: 'Бесплатное участие в мероприятиях',
      title_en: 'Free Participation in Events',
      desc_pt: 'Participe de conferências, seminários e fóruns com empresas e governos, geralmente sem custos de inscrição.',
      desc_ru: 'Участвуйте в конференциях, семинарах и форумах с компаниями и правительствами, обычно бесплатно.',
      desc_en: 'Participate in conferences, seminars, and forums with companies and governments, usually free of charge.'
    },
    {
      icon: Globe2,
      title_pt: 'Acesso à Informação',
      title_ru: 'Доступ к информации',
      title_en: 'Access to Information',
      desc_pt: 'Receba aconselhamento profissional sobre características culturais, sociais e legais do Brasil e da Rússia.',
      desc_ru: 'Получите профессиональные консультации о культурных, социальных и правовых особенностях Бразилии и России.',
      desc_en: 'Receive professional advice on cultural, social, and legal characteristics of Brazil and Russia.'
    },
    {
      icon: Award,
      title_pt: 'Descontos de até 40%',
      title_ru: 'Скидки до 40%',
      title_en: 'Discounts up to 40%',
      desc_pt: 'Economize em traduções, rodadas de negócio, pesquisas de mercado e serviços de hospitalidade.',
      desc_ru: 'Экономьте на переводах, деловых встречах, исследованиях рынка и услугах гостеприимства.',
      desc_en: 'Save on translations, business rounds, market research, and hospitality services.'
    }
  ];

  const services = [
    {
      title_pt: 'Eventos e Webinars',
      title_ru: 'Мероприятия и вебинары',
      title_en: 'Events and Webinars',
      items_pt: [
        'Organização de conferências, seminários e fóruns',
        'Webinars com parceiros russos e brasileiros',
        'Reuniões setoriais regulares (Agropecuário, Infraestrutura, Legal)'
      ],
      items_ru: [
        'Организация конференций, семинаров и форумов',
        'Вебинары с российскими и бразильскими партнерами',
        'Регулярные отраслевые встречи (Агропромышленность, Инфраструктура, Юридическая)'
      ],
      items_en: [
        'Organization of conferences, seminars, and forums',
        'Webinars with Russian and Brazilian partners',
        'Regular sector meetings (Agriculture, Infrastructure, Legal)'
      ]
    },
    {
      title_pt: 'Suporte aos Negócios',
      title_ru: 'Поддержка бизнеса',
      title_en: 'Business Support',
      items_pt: [
        'Busca de parceiros potenciais no Brasil e na Rússia',
        'Organização de missões oficiais e empresariais',
        'Preparação de estandes em feiras setoriais',
        'Pesquisas específicas de mercado'
      ],
      items_ru: [
        'Поиск потенциальных партнеров в Бразилии и России',
        'Организация официальных и деловых миссий',
        'Подготовка стендов на отраслевых выставках',
        'Специализированные рыночные исследования'
      ],
      items_en: [
        'Search for potential partners in Brazil and Russia',
        'Organization of official and business missions',
        'Preparation of stands at sector fairs',
        'Specific market research'
      ]
    },
    {
      title_pt: 'Serviços Empresariais',
      title_ru: 'Бизнес-услуги',
      title_en: 'Business Services',
      items_pt: [
        'Suporte à implantação de escritórios de representação',
        'Traduções e chancela de documentos',
        'Serviços de hospitalidade',
        'Assessoria em inteligência de mercado'
      ],
      items_ru: [
        'Поддержка в создании представительств',
        'Переводы и легализация документов',
        'Услуги гостеприимства',
        'Консультации по рыночной аналитике'
      ],
      items_en: [
        'Support for setting up representative offices',
        'Translations and document certification',
        'Hospitality services',
        'Market intelligence consulting'
      ]
    }
  ];

  const institutionalText = {
    pt: [
      'A Câmara Brasil-Rússia participa como membro associado da Federação das Câmaras de Comércio Exterior (FCCE), da Confederação Nacional do Comércio (CNC), e do Conselho de Câmaras de Comércio Exterior da Associação Comercial do Rio de Janeiro, sendo nosso Presidente membro destes Conselhos Diretores.',
      'A entidade mantém acordo de cooperação com a maior entidade empresarial da Rússia, "Delovaya Rossyia", com a qual organiza as partes empresariais das reuniões das Comissões Intergovernamentais de Cooperação, em estreita parceria com o Ministério das Relações Exteriores (Itamaraty) e o Ministério dos Negócios Estrangeiros (MID), seu congênere russo. A "Delovaya Rossyia" mantém vínculos com a Administração do Governo da Rússia, atuando em estreita sinergia com o Chefe de Estado Vladimir Putin.',
      'Associados da Câmara Brasil-Rússia usualmente participam de reuniões plenárias, setoriais e outros eventos, realizados principalmente onde há representações, e têm a oportunidade de integrar missões setoriais e multisetoriais. A entidade também atua em linhas de cooperação com os governos russo e brasileiro, coordenando a parte empresarial de missões oficiais de ambos os países, por ocasião das reuniões bilaterais dos Altos Dignitários de ambos os países, e das Reuniões de Cúpula dos Países BRICS, bem como do Conselho Empresarial do BRICS. A próxima reunião da Comissão Intergovernamental está programada para Dezembro de 2016, e será organizada conjuntamente com os governos russo e brasileiro, e com a congênere e parceira russa Delovaya Rosssyia.',
      'Afiliados também recebem boletins eletrônicos com notícias da Rússia e oportunidades de negócios, e têm à disposição serviços específicos de assessoramento, extensivos a parceiros e conveniados, além de suporte nos setores de promoção e publicidade de produtos e serviços, prestação de serviços de análise econômica e de estruturas financeiras de promoção e suporte ao comércio bilateral, referentes aos ambientes russo e brasileiro.',
      'Naturalmente, as demandas de cada associado variam caso a caso, e serviços específicos poderão ser efetuados dependendo de suas necessidades.'
    ],
    ru: [
      'Бразильско-Российская палата участвует в качестве ассоциированного члена Федерации палат внешней торговли (FCCE), Национальной конфедерации торговли (CNC) и Совета палат внешней торговли Торговой ассоциации Рио-де-Жанейро, при этом наш президент является членом этих советов директоров.',
      'Организация поддерживает соглашение о сотрудничестве с крупнейшей предпринимательской организацией России "Деловая Россия", с которой организует предпринимательские части заседаний Межправительственных комиссий по сотрудничеству в тесном партнерстве с Министерством иностранных дел (Итамарати) и Министерством иностранных дел (МИД), его российским аналогом. "Деловая Россия" поддерживает связи с администрацией правительства России, действуя в тесной синергии с главой государства Владимиром Путиным.',
      'Члены Бразильско-Российской палаты обычно участвуют в пленарных, отраслевых совещаниях и других мероприятиях, проводимых главным образом там, где есть представительства, и имеют возможность участвовать в отраслевых и многоотраслевых миссиях. Организация также работает по линиям сотрудничества с российским и бразильским правительствами, координируя предпринимательскую часть официальных миссий обеих стран по случаю двусторонних встреч высокопоставленных лиц обеих стран и саммитов стран БРИКС, а также Делового совета БРИКС. Следующее заседание Межправительственной комиссии запланировано на декабрь 2016 года и будет организовано совместно с российским и бразильским правительствами и с российским аналогом и партнером "Деловая Россия".',
      'Члены также получают электронные бюллетени с новостями из России и возможностями для бизнеса и имеют в своем распоряжении специальные консультационные услуги, распространяемые на партнеров и партнеров по соглашению, а также поддержку в секторах продвижения и рекламы продуктов и услуг, предоставление услуг по экономическому анализу и финансовым структурам продвижения и поддержки двусторонней торговли, касающимся российской и бразильской среды.',
      'Естественно, требования каждого члена варьируются в каждом конкретном случае, и специальные услуги могут быть предоставлены в зависимости от их потребностей.'
    ],
    en: [
      'The Brazil-Russia Chamber participates as an associate member of the Federation of Foreign Trade Chambers (FCCE), the National Confederation of Commerce (CNC), and the Council of Foreign Trade Chambers of the Rio de Janeiro Commercial Association, with our President being a member of these Board of Directors.',
      'The entity maintains a cooperation agreement with the largest business entity in Russia, "Delovaya Rossyia", with which it organizes the business parts of the meetings of the Intergovernmental Commissions for Cooperation, in close partnership with the Ministry of Foreign Affairs (Itamaraty) and the Ministry of Foreign Affairs (MID), its Russian counterpart. "Delovaya Rossyia" maintains links with the Administration of the Government of Russia, acting in close synergy with the Head of State Vladimir Putin.',
      'Members of the Brazil-Russia Chamber usually participate in plenary, sectoral meetings and other events, held mainly where there are representations, and have the opportunity to integrate sectoral and multi-sectoral missions. The entity also works in lines of cooperation with the Russian and Brazilian governments, coordinating the business part of official missions of both countries, on the occasion of bilateral meetings of High Dignitaries of both countries, and the Summit Meetings of the BRICS Countries, as well as the BRICS Business Council. The next meeting of the Intergovernmental Commission is scheduled for December 2016, and will be organized jointly with the Russian and Brazilian governments, and with the Russian counterpart and partner Delovaya Rosssyia.',
      'Affiliates also receive electronic bulletins with news from Russia and business opportunities, and have at their disposal specific advisory services, extended to partners and partners, in addition to support in the sectors of promotion and advertising of products and services, provision of economic analysis services and financial structures for promotion and support of bilateral trade, referring to the Russian and Brazilian environments.',
      'Naturally, the demands of each member vary on a case-by-case basis, and specific services can be performed depending on their needs.'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center mb-6">
            {language === 'pt' ? 'Câmara Brasil-Rússia' :
             language === 'ru' ? 'Бразильско-Российская Палата' :
             'Brazil-Russia Chamber'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            {language === 'pt' ? 'Mais de 40 anos promovendo relações econômico-comerciais, investimentos e cooperação cultural entre Brasil e Rússia' :
             language === 'ru' ? 'Более 40 лет содействия экономическим и торговым отношениям, инвестициям и культурному сотрудничеству между Бразилией и Россией' :
             'Over 40 years promoting economic and trade relations, investments, and cultural cooperation between Brazil and Russia'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {language === 'pt' ? 'Sobre a Câmara' :
             language === 'ru' ? 'О Палате' :
             'About the Chamber'}
          </h2>
          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            {(language === 'pt' ? institutionalText.pt :
              language === 'ru' ? institutionalText.ru :
              institutionalText.en).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'pt' ? 'Benefícios para Associados' :
             language === 'ru' ? 'Преимущества для членов' :
             'Member Benefits'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-lg mb-4">
                  <benefit.icon className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {language === 'pt' ? benefit.title_pt :
                   language === 'ru' ? benefit.title_ru :
                   benefit.title_en}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'pt' ? benefit.desc_pt :
                   language === 'ru' ? benefit.desc_ru :
                   benefit.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'pt' ? 'Serviços Oferecidos' :
             language === 'ru' ? 'Предлагаемые услуги' :
             'Services Offered'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {language === 'pt' ? service.title_pt :
                   language === 'ru' ? service.title_ru :
                   service.title_en}
                </h3>
                <ul className="space-y-3">
                  {(language === 'pt' ? service.items_pt :
                    language === 'ru' ? service.items_ru :
                    service.items_en).map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-600 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>


        <div className="bg-gradient-to-br from-blue-700 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'pt' ? 'Associe-se à CBR' :
             language === 'ru' ? 'Вступите в БРП' :
             'Join the CBR'}
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            {language === 'pt' ? 'Aproveite todos os benefícios e serviços oferecidos pela Câmara Brasil-Rússia' :
             language === 'ru' ? 'Воспользуйтесь всеми преимуществами и услугами, предлагаемыми Бразильско-Российской палатой' :
             'Take advantage of all the benefits and services offered by the Brazil-Russia Chamber'}
          </p>
          <a
            href="/membership"
            className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            {language === 'pt' ? 'Associe-se Agora' :
             language === 'ru' ? 'Вступить сейчас' :
             'Join Now'}
          </a>
        </div>
      </div>
    </div>
  );
};

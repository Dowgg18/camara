import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.chamber': 'A Câmara',
    'nav.aboutChamber': 'Sobre a Câmara',
    'nav.board': 'Diretoria',
    'nav.presidentMessage': 'Palavra do Presidente',
    'nav.services': 'Serviços',
    'nav.servicesOverview': 'Serviços',
    'nav.servicesTable': 'Tabela de Serviços',
    'nav.partners': 'Parceiros',
    'nav.members': 'Associados',
    'nav.membersList': 'Associados',
    'nav.brazilrussia': 'Brasil-Rússia',
    'nav.aboutBrazil': 'Sobre o Brasil',
    'nav.aboutRussia': 'Sobre a Rússia',
    'nav.projects': 'Projetos',
    'nav.links': 'Links',
    'nav.ambassadorLetter': 'Carta do Embaixador da Rússia',
    'nav.media': 'Mídia',
    'nav.interviews': 'Entrevistas',
    'nav.culture': 'Cultura',
    'nav.newsletter': 'Newsletter',
    'nav.blog': 'Blog Brasil-Rússia',
    'nav.news': 'Notícias',
    'nav.events': 'Eventos',
    'nav.publications': 'Publicações',
    'nav.membership': 'Associe-se',
    'nav.contact': 'Contato',
    'nav.dashboard': 'Área do Associado',
    'nav.login': 'Login',
    'nav.logout': 'Sair',

    // Home Page
    'home.banner.title': 'Fortalecendo as relações comerciais entre Brasil e Rússia',
    'home.banner.subtitle': 'Conectando empresas, promovendo negócios e facilitando o comércio bilateral',
    'home.featured': 'Destaques',
    'home.latest': 'Últimas Notícias',
    'home.latest.title': 'Últimas Notícias',
    'home.trending': 'Em Alta',
    'home.upcoming': 'Próximos Eventos',
    'home.cta.title': 'Faça parte da nossa comunidade',
    'home.cta.description': 'Associe-se à Câmara e aproveite benefícios exclusivos para o seu negócio',
    'home.cta.button': 'Associe-se à Câmara',

    // About Page
    'about.title': 'Sobre a Câmara',
    'about.subtitle': 'Promovendo o comércio bilateral entre Brasil e Rússia há mais de 40 anos',
    'about.mission.title': 'Nossa Missão',
    'about.mission.text': 'Fortalecer as relações comerciais entre Brasil e Rússia, promovendo oportunidades de negócios e facilitando o comércio bilateral.',
    'about.vision.title': 'Nossa Visão',
    'about.vision.text': 'Ser a principal ponte comercial entre empresas brasileiras e russas, reconhecida pela excelência em nossos serviços.',
    'about.values.title': 'Nossos Valores',
    'about.benefits.title': 'Benefícios de Ser Associado',

    // Membership Page
    'membership.title': 'Planos de Associação',
    'membership.subtitle': 'Escolha o plano ideal para sua empresa',
    'membership.bronze': 'Bronze',
    'membership.silver': 'Prata',
    'membership.gold': 'Ouro',
    'membership.platinum': 'Platina',
    'membership.perYear': '/ano',
    'membership.selectPlan': 'Escolher Plano',
    'membership.form.title': 'Solicitar Associação',
    'membership.form.name': 'Nome Completo',
    'membership.form.email': 'E-mail',
    'membership.form.phone': 'Telefone',
    'membership.form.company': 'Empresa',
    'membership.form.position': 'Cargo',
    'membership.form.plan': 'Plano',
    'membership.form.message': 'Mensagem',
    'membership.form.submit': 'Enviar Solicitação',
    'membership.form.success': 'Solicitação enviada com sucesso!',
    'membership.form.error': 'Erro ao enviar solicitação. Tente novamente.',

    // Services Page
    'services.title': 'Nossos Serviços',
    'services.subtitle': 'Soluções completas para facilitar seus negócios entre Brasil e Rússia',
    'services.consulting': 'Consultoria',
    'services.consulting.desc': 'Orientação especializada em comércio exterior',
    'services.events': 'Organização de Eventos',
    'services.events.desc': 'Feiras, conferências e networking',
    'services.translation': 'Tradução',
    'services.translation.desc': 'Serviços profissionais de tradução',
    'services.legal': 'Assessoria Jurídica',
    'services.legal.desc': 'Suporte legal para operações internacionais',
    'services.market': 'Estudos de Mercado',
    'services.market.desc': 'Análises detalhadas dos mercados brasileiro e russo',
    'services.matchmaking': 'Matchmaking',
    'services.matchmaking.desc': 'Conexão entre empresas brasileiras e russas',

    // Contact Page
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Estamos prontos para ajudar sua empresa',
    'contact.name': 'Nome',
    'contact.email': 'E-mail',
    'contact.phone': 'Telefone',
    'contact.company': 'Empresa',
    'contact.subject': 'Assunto',
    'contact.message': 'Mensagem',
    'contact.submit': 'Enviar',
    'contact.success': 'Mensagem enviada com sucesso!',
    'contact.error': 'Erro ao enviar mensagem. Tente novamente.',
    'contact.info.title': 'Informações de Contato',
    'contact.info.address': 'Endereço',
    'contact.info.phone': 'Telefone',
    'contact.info.email': 'E-mail',
    'contact.info.hours': 'Horário de Atendimento',

    // News Page
    'news.title': 'Notícias',
    'news.subtitle': 'Fique por dentro das últimas novidades',
    'news.categories': 'Categorias',
    'news.all': 'Todas',
    'news.filter': 'Filtrar',
    'news.search': 'Buscar notícias...',
    'news.noResults': 'Nenhuma notícia encontrada',

    // Events Page
    'events.title': 'Eventos',
    'events.subtitle': 'Participe dos nossos eventos e amplie sua rede de contatos',
    'events.upcoming': 'Próximos Eventos',
    'events.past': 'Eventos Anteriores',
    'events.register': 'Inscrever-se',
    'events.location': 'Local',
    'events.date': 'Data',
    'events.time': 'Horário',
    'events.noEvents': 'Nenhum evento agendado',

    // Partners Page
    'partners.title': 'Nossos Parceiros',
    'partners.subtitle': 'Empresas e organizações que confiam em nosso trabalho',
    'partners.category.platinum': 'Parceiros Platina',
    'partners.category.gold': 'Parceiros Ouro',
    'partners.category.silver': 'Parceiros Prata',

    // Members Page
    'members.title': 'Nossos Associados',
    'members.subtitle': 'Empresas que fazem parte da nossa rede',
    'members.search': 'Buscar associados...',
    'members.filter': 'Filtrar por categoria',
    'members.all': 'Todos',
    'members.noResults': 'Nenhum associado encontrado',

    // Publications Page
    'publications.title': 'Publicações',
    'publications.subtitle': 'Materiais informativos e estudos',
    'publications.download': 'Download',
    'publications.view': 'Visualizar',

    // Common
    'readmore': 'Ler mais',
    'readtime': 'min de leitura',
    'loading': 'Carregando...',
    'error': 'Erro ao carregar',
    'search': 'Buscar',
    'filter': 'Filtrar',
    'clear': 'Limpar',
    'cancel': 'Cancelar',
    'save': 'Salvar',
    'edit': 'Editar',
    'delete': 'Excluir',
    'confirm': 'Confirmar',
    'back': 'Voltar',
    'next': 'Próximo',
    'previous': 'Anterior',
    'close': 'Fechar',
    'viewAll': 'Ver todos',

    // Footer
    'footer.about': 'Sobre',
    'footer.services': 'Serviços',
    'footer.contact': 'Contato',
    'footer.rights': 'Todos os direitos reservados',
    'footer.quickLinks': 'Links Rápidos',
    'footer.followUs': 'Siga-nos',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.chamber': 'О палате',
    'nav.aboutChamber': 'О палате',
    'nav.board': 'Правление',
    'nav.presidentMessage': 'Слово президента',
    'nav.services': 'Услуги',
    'nav.servicesOverview': 'Услуги',
    'nav.servicesTable': 'Таблица услуг',
    'nav.partners': 'Партнеры',
    'nav.members': 'Члены',
    'nav.membersList': 'Члены',
    'nav.brazilrussia': 'Бразилия-Россия',
    'nav.aboutBrazil': 'О Бразилии',
    'nav.aboutRussia': 'О России',
    'nav.projects': 'Проекты',
    'nav.links': 'Ссылки',
    'nav.ambassadorLetter': 'Письмо посла России',
    'nav.media': 'Медиа',
    'nav.interviews': 'Интервью',
    'nav.culture': 'Культура',
    'nav.newsletter': 'Рассылка',
    'nav.blog': 'Блог Бразилия-Россия',
    'nav.news': 'Новости',
    'nav.events': 'События',
    'nav.publications': 'Публикации',
    'nav.membership': 'Членство',
    'nav.contact': 'Контакты',
    'nav.dashboard': 'Личный кабинет',
    'nav.login': 'Вход',
    'nav.logout': 'Выйти',

    // Home Page
    'home.banner.title': 'Укрепление торговых отношений между Бразилией и Россией',
    'home.banner.subtitle': 'Соединяем компании, продвигаем бизнес и облегчаем двустороннюю торговлю',
    'home.featured': 'Избранное',
    'home.latest': 'Последние новости',
    'home.latest.title': 'Последние новости',
    'home.trending': 'В тренде',
    'home.upcoming': 'Предстоящие события',
    'home.cta.title': 'Станьте частью нашего сообщества',
    'home.cta.description': 'Присоединяйтесь к Палате и пользуйтесь эксклюзивными преимуществами для вашего бизнеса',
    'home.cta.button': 'Вступить в Палату',

    // About Page
    'about.title': 'О Палате',
    'about.subtitle': 'Содействие двусторонней торговле между Бразилией и Россией более 40 лет',
    'about.mission.title': 'Наша миссия',
    'about.mission.text': 'Укреплять торговые отношения между Бразилией и Россией, продвигая деловые возможности и облегчая двустороннюю торговлю.',
    'about.vision.title': 'Наше видение',
    'about.vision.text': 'Стать главным торговым мостом между бразильскими и российскими компаниями, признанным за отличное качество наших услуг.',
    'about.values.title': 'Наши ценности',
    'about.benefits.title': 'Преимущества членства',

    // Membership Page
    'membership.title': 'Планы членства',
    'membership.subtitle': 'Выберите идеальный план для вашей компании',
    'membership.bronze': 'Бронза',
    'membership.silver': 'Серебро',
    'membership.gold': 'Золото',
    'membership.platinum': 'Платина',
    'membership.perYear': '/год',
    'membership.selectPlan': 'Выбрать план',
    'membership.form.title': 'Заявка на членство',
    'membership.form.name': 'Полное имя',
    'membership.form.email': 'Электронная почта',
    'membership.form.phone': 'Телефон',
    'membership.form.company': 'Компания',
    'membership.form.position': 'Должность',
    'membership.form.plan': 'План',
    'membership.form.message': 'Сообщение',
    'membership.form.submit': 'Отправить заявку',
    'membership.form.success': 'Заявка успешно отправлена!',
    'membership.form.error': 'Ошибка при отправке заявки. Попробуйте снова.',

    // Services Page
    'services.title': 'Наши услуги',
    'services.subtitle': 'Комплексные решения для облегчения ваших сделок между Бразилией и Россией',
    'services.consulting': 'Консалтинг',
    'services.consulting.desc': 'Экспертная ориентация во внешней торговле',
    'services.events': 'Организация мероприятий',
    'services.events.desc': 'Ярмарки, конференции и нетворкинг',
    'services.translation': 'Перевод',
    'services.translation.desc': 'Профессиональные услуги перевода',
    'services.legal': 'Юридическая консультация',
    'services.legal.desc': 'Юридическая поддержка международных операций',
    'services.market': 'Исследования рынка',
    'services.market.desc': 'Подробный анализ бразильского и российского рынков',
    'services.matchmaking': 'Бизнес-встречи',
    'services.matchmaking.desc': 'Связи между бразильскими и российскими компаниями',

    // Contact Page
    'contact.title': 'Свяжитесь с нами',
    'contact.subtitle': 'Мы готовы помочь вашей компании',
    'contact.name': 'Имя',
    'contact.email': 'Электронная почта',
    'contact.phone': 'Телефон',
    'contact.company': 'Компания',
    'contact.subject': 'Тема',
    'contact.message': 'Сообщение',
    'contact.submit': 'Отправить',
    'contact.success': 'Сообщение успешно отправлено!',
    'contact.error': 'Ошибка при отправке сообщения. Попробуйте снова.',
    'contact.info.title': 'Контактная информация',
    'contact.info.address': 'Адрес',
    'contact.info.phone': 'Телефон',
    'contact.info.email': 'Электронная почта',
    'contact.info.hours': 'Часы работы',

    // News Page
    'news.title': 'Новости',
    'news.subtitle': 'Будьте в курсе последних новостей',
    'news.categories': 'Категории',
    'news.all': 'Все',
    'news.filter': 'Фильтр',
    'news.search': 'Поиск новостей...',
    'news.noResults': 'Новости не найдены',

    // Events Page
    'events.title': 'События',
    'events.subtitle': 'Участвуйте в наших мероприятиях и расширяйте свою сеть контактов',
    'events.upcoming': 'Предстоящие события',
    'events.past': 'Прошедшие события',
    'events.register': 'Зарегистрироваться',
    'events.location': 'Место',
    'events.date': 'Дата',
    'events.time': 'Время',
    'events.noEvents': 'Нет запланированных событий',

    // Partners Page
    'partners.title': 'Наши партнеры',
    'partners.subtitle': 'Компании и организации, которые доверяют нашей работе',
    'partners.category.platinum': 'Платиновые партнеры',
    'partners.category.gold': 'Золотые партнеры',
    'partners.category.silver': 'Серебряные партнеры',

    // Members Page
    'members.title': 'Наши члены',
    'members.subtitle': 'Компании, входящие в нашу сеть',
    'members.search': 'Поиск членов...',
    'members.filter': 'Фильтр по категории',
    'members.all': 'Все',
    'members.noResults': 'Члены не найдены',

    // Publications Page
    'publications.title': 'Публикации',
    'publications.subtitle': 'Информационные материалы и исследования',
    'publications.download': 'Скачать',
    'publications.view': 'Просмотр',

    // Common
    'readmore': 'Читать далее',
    'readtime': 'мин чтения',
    'loading': 'Загрузка...',
    'error': 'Ошибка загрузки',
    'search': 'Поиск',
    'filter': 'Фильтр',
    'clear': 'Очистить',
    'cancel': 'Отмена',
    'save': 'Сохранить',
    'edit': 'Редактировать',
    'delete': 'Удалить',
    'confirm': 'Подтвердить',
    'back': 'Назад',
    'next': 'Следующий',
    'previous': 'Предыдущий',
    'close': 'Закрыть',
    'viewAll': 'Посмотреть все',

    // Footer
    'footer.about': 'О нас',
    'footer.services': 'Услуги',
    'footer.contact': 'Контакты',
    'footer.rights': 'Все права защищены',
    'footer.quickLinks': 'Быстрые ссылки',
    'footer.followUs': 'Следите за нами',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.chamber': 'The Chamber',
    'nav.aboutChamber': 'About the Chamber',
    'nav.board': 'Board of Directors',
    'nav.presidentMessage': 'President\'s Message',
    'nav.services': 'Services',
    'nav.servicesOverview': 'Services',
    'nav.servicesTable': 'Services Table',
    'nav.partners': 'Partners',
    'nav.members': 'Members',
    'nav.membersList': 'Members',
    'nav.brazilrussia': 'Brazil-Russia',
    'nav.aboutBrazil': 'About Brazil',
    'nav.aboutRussia': 'About Russia',
    'nav.projects': 'Projects',
    'nav.links': 'Links',
    'nav.ambassadorLetter': 'Russian Ambassador Letter',
    'nav.media': 'Media',
    'nav.interviews': 'Interviews',
    'nav.culture': 'Culture',
    'nav.newsletter': 'Newsletter',
    'nav.blog': 'Brazil-Russia Blog',
    'nav.news': 'News',
    'nav.events': 'Events',
    'nav.publications': 'Publications',
    'nav.membership': 'Membership',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Member Area',
    'nav.login': 'Login',
    'nav.logout': 'Logout',

    // Home Page
    'home.banner.title': 'Strengthening trade relations between Brazil and Russia',
    'home.banner.subtitle': 'Connecting companies, promoting business and facilitating bilateral trade',
    'home.featured': 'Featured',
    'home.latest': 'Latest News',
    'home.latest.title': 'Latest News',
    'home.trending': 'Trending',
    'home.upcoming': 'Upcoming Events',
    'home.cta.title': 'Join our community',
    'home.cta.description': 'Become a Chamber member and enjoy exclusive benefits for your business',
    'home.cta.button': 'Join the Chamber',

    // About Page
    'about.title': 'About the Chamber',
    'about.subtitle': 'Promoting bilateral trade between Brazil and Russia for over 40 years',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'To strengthen trade relations between Brazil and Russia, promoting business opportunities and facilitating bilateral trade.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'To be the main trade bridge between Brazilian and Russian companies, recognized for excellence in our services.',
    'about.values.title': 'Our Values',
    'about.benefits.title': 'Membership Benefits',

    // Membership Page
    'membership.title': 'Membership Plans',
    'membership.subtitle': 'Choose the ideal plan for your company',
    'membership.bronze': 'Bronze',
    'membership.silver': 'Silver',
    'membership.gold': 'Gold',
    'membership.platinum': 'Platinum',
    'membership.perYear': '/year',
    'membership.selectPlan': 'Select Plan',
    'membership.form.title': 'Membership Application',
    'membership.form.name': 'Full Name',
    'membership.form.email': 'Email',
    'membership.form.phone': 'Phone',
    'membership.form.company': 'Company',
    'membership.form.position': 'Position',
    'membership.form.plan': 'Plan',
    'membership.form.message': 'Message',
    'membership.form.submit': 'Submit Application',
    'membership.form.success': 'Application submitted successfully!',
    'membership.form.error': 'Error submitting application. Please try again.',

    // Services Page
    'services.title': 'Our Services',
    'services.subtitle': 'Complete solutions to facilitate your business between Brazil and Russia',
    'services.consulting': 'Consulting',
    'services.consulting.desc': 'Expert guidance in foreign trade',
    'services.events': 'Event Organization',
    'services.events.desc': 'Trade fairs, conferences and networking',
    'services.translation': 'Translation',
    'services.translation.desc': 'Professional translation services',
    'services.legal': 'Legal Advisory',
    'services.legal.desc': 'Legal support for international operations',
    'services.market': 'Market Research',
    'services.market.desc': 'Detailed analysis of Brazilian and Russian markets',
    'services.matchmaking': 'Matchmaking',
    'services.matchmaking.desc': 'Connecting Brazilian and Russian companies',

    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We are ready to help your company',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.company': 'Company',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.submit': 'Submit',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending message. Please try again.',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Business Hours',

    // News Page
    'news.title': 'News',
    'news.subtitle': 'Stay up to date with the latest news',
    'news.categories': 'Categories',
    'news.all': 'All',
    'news.filter': 'Filter',
    'news.search': 'Search news...',
    'news.noResults': 'No news found',

    // Events Page
    'events.title': 'Events',
    'events.subtitle': 'Participate in our events and expand your network',
    'events.upcoming': 'Upcoming Events',
    'events.past': 'Past Events',
    'events.register': 'Register',
    'events.location': 'Location',
    'events.date': 'Date',
    'events.time': 'Time',
    'events.noEvents': 'No events scheduled',

    // Partners Page
    'partners.title': 'Our Partners',
    'partners.subtitle': 'Companies and organizations that trust our work',
    'partners.category.platinum': 'Platinum Partners',
    'partners.category.gold': 'Gold Partners',
    'partners.category.silver': 'Silver Partners',

    // Members Page
    'members.title': 'Our Members',
    'members.subtitle': 'Companies that are part of our network',
    'members.search': 'Search members...',
    'members.filter': 'Filter by category',
    'members.all': 'All',
    'members.noResults': 'No members found',

    // Publications Page
    'publications.title': 'Publications',
    'publications.subtitle': 'Information materials and studies',
    'publications.download': 'Download',
    'publications.view': 'View',

    // Common
    'readmore': 'Read more',
    'readtime': 'min read',
    'loading': 'Loading...',
    'error': 'Loading error',
    'search': 'Search',
    'filter': 'Filter',
    'clear': 'Clear',
    'cancel': 'Cancel',
    'save': 'Save',
    'edit': 'Edit',
    'delete': 'Delete',
    'confirm': 'Confirm',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
    'close': 'Close',
    'viewAll': 'View all',

    // Footer
    'footer.about': 'About',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved',
    'footer.quickLinks': 'Quick Links',
    'footer.followUs': 'Follow Us',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

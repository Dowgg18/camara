import { Briefcase, Users, FileText, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ServicesPage = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: Briefcase,
      title_pt: 'Consultoria Empresarial',
      title_ru: 'Бизнес-консалтинг',
      title_en: 'Business Consulting',
      description_pt: 'Assessoria especializada para empresas que desejam expandir seus negócios entre Brasil e Rússia.',
      description_ru: 'Специализированные консультации для компаний, желающих расширить свой бизнес между Бразилией и Россией.',
      description_en: 'Specialized consulting for companies looking to expand their business between Brazil and Russia.',
      features_pt: ['Análise de mercado', 'Planejamento estratégico', 'Due diligence', 'Gestão de riscos'],
      features_ru: ['Анализ рынка', 'Стратегическое планирование', 'Проверка благонадежности', 'Управление рисками'],
      features_en: ['Market analysis', 'Strategic planning', 'Due diligence', 'Risk management']
    },
    {
      icon: Globe,
      title_pt: 'Missões Comerciais',
      title_ru: 'Торговые миссии',
      title_en: 'Trade Missions',
      description_pt: 'Organização de missões comerciais para aproximar empresários e identificar oportunidades de negócio.',
      description_ru: 'Организация торговых миссий для сближения предпринимателей и выявления деловых возможностей.',
      description_en: 'Organization of trade missions to bring entrepreneurs together and identify business opportunities.',
      features_pt: ['Agenda personalizada', 'Reuniões B2B', 'Visitas técnicas', 'Networking exclusivo'],
      features_ru: ['Персонализированная программа', 'B2B-встречи', 'Технические визиты', 'Эксклюзивный нетворкинг'],
      features_en: ['Personalized agenda', 'B2B meetings', 'Technical visits', 'Exclusive networking']
    },
    {
      icon: FileText,
      title_pt: 'Apoio a Importações/Exportações',
      title_ru: 'Поддержка импорта/экспорта',
      title_en: 'Import/Export Support',
      description_pt: 'Suporte completo para operações de comércio exterior, incluindo documentação e logística.',
      description_ru: 'Полная поддержка операций внешней торговли, включая документацию и логистику.',
      description_en: 'Complete support for foreign trade operations, including documentation and logistics.',
      features_pt: ['Assessoria aduaneira', 'Licenças e certificações', 'Logística internacional', 'Financiamento'],
      features_ru: ['Таможенное консультирование', 'Лицензии и сертификаты', 'Международная логистика', 'Финансирование'],
      features_en: ['Customs consulting', 'Licenses and certifications', 'International logistics', 'Financing']
    },
    {
      icon: Users,
      title_pt: 'Promoção Cultural',
      title_ru: 'Культурное продвижение',
      title_en: 'Cultural Promotion',
      description_pt: 'Eventos culturais para fortalecer laços e promover a compreensão mútua entre os povos.',
      description_ru: 'Культурные мероприятия для укрепления связей и содействия взаимопониманию между народами.',
      description_en: 'Cultural events to strengthen ties and promote mutual understanding between peoples.',
      features_pt: ['Eventos corporativos', 'Intercâmbio cultural', 'Feiras e exposições', 'Programas educacionais'],
      features_ru: ['Корпоративные мероприятия', 'Культурный обмен', 'Ярмарки и выставки', 'Образовательные программы'],
      features_en: ['Corporate events', 'Cultural exchange', 'Fairs and exhibitions', 'Educational programs']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-80 bg-gradient-to-br from-emerald-900 to-emerald-700">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">{t('nav.services')}</h1>
            <p className="text-xl text-gray-100">
              {language === 'pt' ? 'Soluções completas para o sucesso dos seus negócios' :
               language === 'ru' ? 'Комплексные решения для успеха вашего бизнеса' :
               'Complete solutions for your business success'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {language === 'pt' ? service.title_pt :
                   language === 'ru' ? service.title_ru :
                   service.title_en}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'pt' ? service.description_pt :
                   language === 'ru' ? service.description_ru :
                   service.description_en}
                </p>
                <ul className="space-y-3">
                  {(language === 'pt' ? service.features_pt :
                    language === 'ru' ? service.features_ru :
                    service.features_en).map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'pt' ? 'Pronto para expandir seus negócios?' :
             language === 'ru' ? 'Готовы расширить свой бизнес?' :
             'Ready to expand your business?'}
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            {language === 'pt' ? 'Entre em contato conosco e descubra como podemos ajudar sua empresa' :
             language === 'ru' ? 'Свяжитесь с нами и узнайте, как мы можем помочь вашей компании' :
             'Contact us and discover how we can help your company'}
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all font-semibold shadow-lg"
          >
            {language === 'pt' ? 'Fale Conosco' :
             language === 'ru' ? 'Свяжитесь с нами' :
             'Contact Us'}
          </a>
        </div>
      </div>
    </div>
  );
};

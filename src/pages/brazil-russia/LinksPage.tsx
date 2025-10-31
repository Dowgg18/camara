import { useLanguage } from '../../contexts/LanguageContext';
import { ExternalLink, Building, Globe, FileText, Users } from 'lucide-react';

const links = [
  {
    category_pt: 'Governo Brasileiro',
    category_ru: 'Правительство Бразилии',
    category_en: 'Brazilian Government',
    icon: Building,
    items: [
      { name: 'Ministério das Relações Exteriores', url: 'https://www.gov.br/mre' },
      { name: 'Ministério da Economia', url: 'https://www.gov.br/economia' },
      { name: 'Apex-Brasil', url: 'https://www.apexbrasil.com.br' },
      { name: 'BNDES', url: 'https://www.bndes.gov.br' }
    ]
  },
  {
    category_pt: 'Governo Russo',
    category_ru: 'Правительство России',
    category_en: 'Russian Government',
    icon: Building,
    items: [
      { name: 'Ministério das Relações Exteriores da Rússia', url: 'https://www.mid.ru' },
      { name: 'Ministério do Desenvolvimento Econômico', url: 'https://www.economy.gov.ru' },
      { name: 'Russian Export Center', url: 'https://www.exportcenter.ru' },
      { name: 'Vnesheconombank', url: 'https://вэб.рф' }
    ]
  },
  {
    category_pt: 'Organizações Internacionais',
    category_ru: 'Международные организации',
    category_en: 'International Organizations',
    icon: Globe,
    items: [
      { name: 'BRICS', url: 'https://www.brics-info.org' },
      { name: 'ONU', url: 'https://www.un.org' },
      { name: 'OMC', url: 'https://www.wto.org' },
      { name: 'G20', url: 'https://www.g20.org' }
    ]
  },
  {
    category_pt: 'Câmaras de Comércio',
    category_ru: 'Торговые палаты',
    category_en: 'Chambers of Commerce',
    icon: Users,
    items: [
      { name: 'CNI - Confederação Nacional da Indústria', url: 'https://www.portaldaindustria.com.br' },
      { name: 'CNC - Confederação Nacional do Comércio', url: 'https://www.cnc.org.br' },
      { name: 'CCI Rússia', url: 'https://www.tpprf.ru' },
      { name: 'RSPP - União Russa de Industriais', url: 'https://rspp.ru' }
    ]
  },
  {
    category_pt: 'Recursos e Documentos',
    category_ru: 'Ресурсы и документы',
    category_en: 'Resources and Documents',
    icon: FileText,
    items: [
      { name: 'Acordo de Cooperação Brasil-Rússia', url: '#' },
      { name: 'Dados de Comércio Bilateral', url: '#' },
      { name: 'Guia de Investimentos', url: '#' },
      { name: 'Regulamentações Comerciais', url: '#' }
    ]
  }
];

export const LinksPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-700 via-purple-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <ExternalLink className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">
            {language === 'pt' ? 'Links Úteis' :
             language === 'ru' ? 'Полезные ссылки' :
             'Useful Links'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            {language === 'pt' ? 'Recursos e conexões essenciais para negócios entre Brasil e Rússia' :
             language === 'ru' ? 'Основные ресурсы и связи для бизнеса между Бразилией и Россией' :
             'Essential resources and connections for business between Brazil and Russia'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {links.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg mr-4">
                    <section.icon className="w-5 h-5 text-gray-900" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {language === 'pt' ? section.category_pt :
                     language === 'ru' ? section.category_ru :
                     section.category_en}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <span className="text-gray-700 font-medium">{link.name}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-blue-700 via-purple-600 to-emerald-700 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'pt' ? 'Não Encontrou o Que Procura?' :
             language === 'ru' ? 'Не нашли то, что искали?' :
             'Didn\'t Find What You\'re Looking For?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {language === 'pt' ? 'Entre em contato conosco para mais informações e assistência' :
             language === 'ru' ? 'Свяжитесь с нами для получения дополнительной информации и помощи' :
             'Contact us for more information and assistance'}
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            {language === 'pt' ? 'Entre em Contato' :
             language === 'ru' ? 'Связаться' :
             'Contact Us'}
          </a>
        </div>
      </div>
    </div>
  );
};

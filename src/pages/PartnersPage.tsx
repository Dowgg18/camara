import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Building2, Handshake, Globe2, Award, X } from 'lucide-react';
import { partnersData } from '../data/partnersData';

export const PartnersPage = () => {
  const { language } = useLanguage();
  const [selectedPartner, setSelectedPartner] = useState<typeof partnersData[0] | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Handshake className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">
            {language === 'pt' ? 'Nossos Parceiros' :
             language === 'ru' ? 'Наши Партнеры' :
             'Our Partners'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-blue-50">
            {language === 'pt' ? 'Organizações e empresas que confiam em nossa câmara para fortalecer relações comerciais entre Brasil e Rússia' :
             language === 'ru' ? 'Организации и компании, которые доверяют нашей палате для укрепления торговых отношений между Бразилией и Россией' :
             'Organizations and companies that trust our chamber to strengthen trade relations between Brazil and Russia'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Building2 className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'pt' ? '150+ Empresas' :
               language === 'ru' ? '150+ Компаний' :
               '150+ Companies'}
            </h3>
            <p className="text-gray-600">
              {language === 'pt' ? 'Parceiros estratégicos em diversos setores' :
               language === 'ru' ? 'Стратегические партнеры в различных секторах' :
               'Strategic partners across various sectors'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Globe2 className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'pt' ? '25+ Países' :
               language === 'ru' ? '25+ Стран' :
               '25+ Countries'}
            </h3>
            <p className="text-gray-600">
              {language === 'pt' ? 'Presença global e conexões internacionais' :
               language === 'ru' ? 'Глобальное присутствие e международные связи' :
               'Global presence and international connections'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Award className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'pt' ? '40+ Anos' :
               language === 'ru' ? '40+ Лет' :
               '40+ Years'}
            </h3>
            <p className="text-gray-600">
              {language === 'pt' ? 'De experiência em comércio bilateral' :
               language === 'ru' ? 'Опыта в двусторонней торговле' :
               'Of experience in bilateral trade'}
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {language === 'pt' ? 'Principais Parceiros' :
           language === 'ru' ? 'Основные Партнеры' :
           'Main Partners'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {partnersData.map((partner) => (
            <button
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all text-left"
            >
              <div className="relative h-40 overflow-hidden bg-white p-4 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-4 border-t border-gray-100">
                <span className="inline-block px-2 py-1 bg-blue-50 text-xs font-medium text-blue-700 rounded mb-2">
                  {partner.category}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{partner.name}</h3>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'pt' ? 'Torne-se um Parceiro' :
             language === 'ru' ? 'Станьте Партнером' :
             'Become a Partner'}
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            {language === 'pt' ? 'Junte-se às organizações que confiam na Câmara Brasil-Rússia' :
             language === 'ru' ? 'Присоединяйтесь к организациям, которые доверяют Бразильско-Российской палате' :
             'Join the organizations that trust the Brazil-Russia Chamber'}
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            {language === 'pt' ? 'Entre em Contato' :
             language === 'ru' ? 'Связаться' :
             'Get in Touch'}
          </a>
        </div>
      </div>

      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedPartner.logo}
                  alt={selectedPartner.name}
                  className="h-12 object-contain"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPartner.name}</h2>
                  <span className="inline-block px-3 py-1 bg-blue-50 text-sm font-medium text-blue-700 rounded mt-1">
                    {selectedPartner.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                {selectedPartner.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Search, Building } from 'lucide-react';
import { allMembers } from '../data/membersData';

const members = allMembers;

export const MembersPage = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter(member => {
    return member.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Users className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">
            {language === 'pt' ? 'Nossos Associados' :
             language === 'ru' ? 'Наши Члены' :
             'Our Members'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-blue-50">
            {language === 'pt' ? 'Empresas associadas que impulsionam o comércio bilateral entre Brasil e Rússia' :
             language === 'ru' ? 'Компании-члены, которые стимулируют двустороннюю торговлю между Бразилией и Россией' :
             'Member companies driving bilateral trade between Brazil and Russia'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={language === 'pt' ? 'Buscar empresa...' :
                          language === 'ru' ? 'Поиск компании...' :
                          'Search company...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            {language === 'pt' ? `Exibindo ${filteredMembers.length} de ${members.length} empresas` :
             language === 'ru' ? `Показано ${filteredMembers.length} из ${members.length} компаний` :
             `Showing ${filteredMembers.length} of ${members.length} companies`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all">
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-blue-700" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 leading-tight">{member.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'pt' ? 'Nenhuma empresa encontrada' :
               language === 'ru' ? 'Компании не найдены' :
               'No companies found'}
            </h3>
            <p className="text-gray-600">
              {language === 'pt' ? 'Tente ajustar seus filtros de busca' :
               language === 'ru' ? 'Попробуйте настроить фильтры поиска' :
               'Try adjusting your search filters'}
            </p>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-br from-blue-700 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'pt' ? 'Faça Parte da Nossa Rede' :
             language === 'ru' ? 'Присоединяйтесь к Нашей Сети' :
             'Join Our Network'}
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            {language === 'pt' ? 'Associe-se e conecte-se com as principais empresas do Brasil e Rússia' :
             language === 'ru' ? 'Станьте членом и свяжитесь с ведущими компаниями Бразилии и России' :
             'Become a member and connect with leading companies from Brazil and Russia'}
          </p>
          <a
            href="/membership"
            className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            {language === 'pt' ? 'Associe-se Agora' :
             language === 'ru' ? 'Вступить Сейчас' :
             'Join Now'}
          </a>
        </div>
      </div>
    </div>
  );
};

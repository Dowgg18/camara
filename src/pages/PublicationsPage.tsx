import { FileText, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const PublicationsPage = () => {
  const { t } = useLanguage();

  const publications = [
    {
      title: 'Relatório de Comércio Bilateral 2024',
      category: 'Relatório',
      year: 2024,
      description: 'Análise completa do comércio entre Brasil e Rússia no ano de 2024'
    },
    {
      title: 'Guia de Exportação para a Rússia',
      category: 'Guia',
      year: 2024,
      description: 'Manual prático para empresas brasileiras que desejam exportar para o mercado russo'
    },
    {
      title: 'Oportunidades no Setor de Tecnologia',
      category: 'Estudo',
      year: 2024,
      description: 'Mapeamento de oportunidades de negócio no setor de tecnologia'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.publications')}</h1>
          <p className="text-xl text-gray-600">Acesse relatórios, estudos e materiais exclusivos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((pub, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold uppercase text-gray-700 rounded-full">
                  {pub.category}
                </span>
                <span className="ml-2 text-sm text-gray-500">{pub.year}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{pub.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{pub.description}</p>
              <button className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 font-semibold">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

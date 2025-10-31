import { useLanguage } from '../../contexts/LanguageContext';
import { Rocket, Factory, Zap, Building2, Plane, Cpu } from 'lucide-react';

const projects = [
  {
    icon: Rocket,
    title_pt: 'Cooperação Espacial',
    title_ru: 'Космическое сотрудничество',
    title_en: 'Space Cooperation',
    description_pt: 'Parceria para desenvolvimento de satélites e tecnologia espacial',
    description_ru: 'Партнерство по разработке спутников и космических технологий',
    description_en: 'Partnership for satellite and space technology development',
    status: 'Em andamento'
  },
  {
    icon: Zap,
    title_pt: 'Energia Nuclear',
    title_ru: 'Ядерная энергетика',
    title_en: 'Nuclear Energy',
    description_pt: 'Construção de usinas nucleares e transferência de tecnologia',
    description_ru: 'Строительство атомных электростанций и передача технологий',
    description_en: 'Nuclear power plant construction and technology transfer',
    status: 'Em andamento'
  },
  {
    icon: Factory,
    title_pt: 'Indústria de Defesa',
    title_ru: 'Оборонная промышленность',
    title_en: 'Defense Industry',
    description_pt: 'Cooperação em tecnologia militar e aeronáutica',
    description_ru: 'Сотрудничество в военных и аэронавтических технологиях',
    description_en: 'Cooperation in military and aeronautical technology',
    status: 'Ativo'
  },
  {
    icon: Building2,
    title_pt: 'Infraestrutura',
    title_ru: 'Инфраструктура',
    title_en: 'Infrastructure',
    description_pt: 'Investimentos em portos, ferrovias e rodovias',
    description_ru: 'Инвестиции в порты, железные дороги и автомагистрали',
    description_en: 'Investments in ports, railways, and highways',
    status: 'Planejamento'
  },
  {
    icon: Plane,
    title_pt: 'Aviação Civil',
    title_ru: 'Гражданская авиация',
    title_en: 'Civil Aviation',
    description_pt: 'Desenvolvimento conjunto de aeronaves comerciais',
    description_ru: 'Совместная разработка коммерческих самолетов',
    description_en: 'Joint development of commercial aircraft',
    status: 'Em discussão'
  },
  {
    icon: Cpu,
    title_pt: 'Tecnologia da Informação',
    title_ru: 'Информационные технологии',
    title_en: 'Information Technology',
    description_pt: 'Parceria em software, cibersegurança e IA',
    description_ru: 'Партнерство в области ПО, кибербезопасности и ИИ',
    description_en: 'Partnership in software, cybersecurity, and AI',
    status: 'Novo'
  }
];

export const ProjectsPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-700 via-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center mb-6">
            {language === 'pt' ? 'Projetos Bilaterais' :
             language === 'ru' ? 'Двусторонние проекты' :
             'Bilateral Projects'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            {language === 'pt' ? 'Iniciativas estratégicas de cooperação entre Brasil e Rússia' :
             language === 'ru' ? 'Стратегические инициативы сотрудничества между Бразилией и Россией' :
             'Strategic cooperation initiatives between Brazil and Russia'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-100 to-blue-100 rounded-xl mb-4">
                <project.icon className="w-7 h-7 text-gray-900" />
              </div>
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-gray-200 text-xs font-semibold text-gray-800 rounded-full">
                  {project.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {language === 'pt' ? project.title_pt :
                 language === 'ru' ? project.title_ru :
                 project.title_en}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'pt' ? project.description_pt :
                 language === 'ru' ? project.description_ru :
                 project.description_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { useLanguage } from '../../contexts/LanguageContext';
import { MapPin, Users, TrendingUp, Briefcase, Snowflake } from 'lucide-react';

export const AboutRussiaPage = () => {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: '146M',
      label_pt: 'População',
      label_ru: 'Население',
      label_en: 'Population'
    },
    {
      icon: TrendingUp,
      value: '$1.8T',
      label_pt: 'PIB',
      label_ru: 'ВВП',
      label_en: 'GDP'
    },
    {
      icon: Briefcase,
      value: '11º',
      label_pt: 'Maior Economia',
      label_ru: 'Крупнейшая экономика',
      label_en: 'Largest Economy'
    },
    {
      icon: MapPin,
      value: '17.1M km²',
      label_pt: 'Maior País do Mundo',
      label_ru: 'Крупнейшая страна мира',
      label_en: 'Largest Country'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-br from-blue-700 via-white to-red-600 text-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-red-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <div className="text-8xl">🇷🇺</div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">
            {language === 'pt' ? 'Sobre a Rússia' :
             language === 'ru' ? 'О России' :
             'About Russia'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            {language === 'pt' ? 'O maior país do mundo e uma superpotência global' :
             language === 'ru' ? 'Крупнейшая страна мира и мировая сверхдержава' :
             'The world\'s largest country and a global superpower'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <stat.icon className="w-6 h-6 text-blue-700" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? stat.label_pt :
                 language === 'ru' ? stat.label_ru :
                 stat.label_en}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <Snowflake className="w-12 h-12 text-blue-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Geografia e Clima' :
               language === 'ru' ? 'География и климат' :
               'Geography and Climate'}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {language === 'pt' ? 'A Rússia é o maior país do mundo em extensão territorial, com 17,1 milhões de km², abrangendo 11 fusos horários. Estende-se da Europa Oriental até o Extremo Oriente, englobando paisagens diversas desde a tundra ártica até as estepes do sul.' :
                 language === 'ru' ? 'Россия - крупнейшая страна мира по территории площадью 17,1 миллиона км², охватывающая 11 часовых поясов. Она простирается от Восточной Европы до Дальнего Востока, включая разнообразные ландшафты от арктической тундры до южных степей.' :
                 'Russia is the world\'s largest country by area, with 17.1 million km², spanning 11 time zones. It extends from Eastern Europe to the Far East, encompassing diverse landscapes from arctic tundra to southern steppes.'}
              </p>
              <p>
                {language === 'pt' ? 'O clima varia drasticamente, com invernos rigorosos na maior parte do país e verões quentes. Temperaturas podem variar de -50°C na Sibéria a +40°C no sul durante o verão.' :
                 language === 'ru' ? 'Климат сильно варьируется, с суровыми зимами в большей части страны и жарким летом. Температуры могут варьироваться от -50°C в Сибири до +40°C на юге летом.' :
                 'The climate varies drastically, with harsh winters in most of the country and hot summers. Temperatures can range from -50°C in Siberia to +40°C in the south during summer.'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <TrendingUp className="w-12 h-12 text-red-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Economia' :
               language === 'ru' ? 'Экономика' :
               'Economy'}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {language === 'pt' ? 'A Rússia possui a 11ª maior economia do mundo, com PIB de aproximadamente US$ 1,8 trilhão. É o maior exportador mundial de gás natural e um dos maiores produtores de petróleo, além de ser líder em exportação de trigo e fertilizantes.' :
                 language === 'ru' ? 'Россия имеет 11-ю по величине экономику в мире с ВВП около 1,8 триллиона долларов США. Она является крупнейшим мировым экспортером природного газа и одним из крупнейших производителей нефти, а также лидером по экспорту пшеницы и удобрений.' :
                 'Russia has the 11th largest economy in the world, with a GDP of approximately $1.8 trillion. It is the world\'s largest exporter of natural gas and one of the largest oil producers, as well as a leader in wheat and fertilizer exports.'}
              </p>
              <p>
                {language === 'pt' ? 'Os principais setores incluem energia, mineração, metalurgia, defesa, aeroespacial e tecnologia. O país é extremamente rico em recursos naturais, incluindo vastas reservas de petróleo, gás, metais preciosos e minerais raros.' :
                 language === 'ru' ? 'Основные секторы включают энергетику, горнодобывающую промышленность, металлургию, оборону, аэрокосмическую и технологическую отрасли. Страна чрезвычайно богата природными ресурсами, включая огромные запасы нефти, газа, драгоценных металлов и редких минералов.' :
                 'Key sectors include energy, mining, metallurgy, defense, aerospace, and technology. The country is extremely rich in natural resources, including vast reserves of oil, gas, precious metals, and rare minerals.'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {language === 'pt' ? 'Cultura e Sociedade' :
             language === 'ru' ? 'Культура и общество' :
             'Culture and Society'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'pt' ? 'Rica Herança Cultural' :
                 language === 'ru' ? 'Богатое культурное наследие' :
                 'Rich Cultural Heritage'}
              </h3>
              <p>
                {language === 'pt' ? 'A Rússia é famosa por suas contribuições à literatura mundial (Tolstói, Dostoiévski, Tchékhov), música clássica (Tchaikovsky, Rachmaninoff), ballet (Bolshoi, Mariinsky) e artes visuais. A cultura russa combina tradições eslavas, bizantinas e influências asiáticas.' :
                 language === 'ru' ? 'Россия известна своим вкладом в мировую литературу (Толстой, Достоевский, Чехов), классическую музыку (Чайковский, Рахманинов), балет (Большой, Мариинский) и изобразительное искусство. Русская культура сочетает славянские, византийские и азиатские влияния.' :
                 'Russia is famous for its contributions to world literature (Tolstoy, Dostoevsky, Chekhov), classical music (Tchaikovsky, Rachmaninoff), ballet (Bolshoi, Mariinsky), and visual arts. Russian culture combines Slavic, Byzantine, and Asian influences.'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'pt' ? 'Ciência e Tecnologia' :
                 language === 'ru' ? 'Наука и технологии' :
                 'Science and Technology'}
              </h3>
              <p>
                {language === 'pt' ? 'A Rússia é líder em exploração espacial (primeira nação a colocar um satélite e um humano no espaço), energia nuclear, matemática e física. O país investe fortemente em educação STEM e possui algumas das melhores universidades técnicas do mundo.' :
                 language === 'ru' ? 'Россия является лидером в освоении космоса (первая страна, запустившая спутник и человека в космос), ядерной энергетике, математике и физике. Страна активно инвестирует в STEM-образование и имеет одни из лучших технических университетов в мире.' :
                 'Russia is a leader in space exploration (first nation to put a satellite and human in space), nuclear energy, mathematics, and physics. The country invests heavily in STEM education and has some of the world\'s best technical universities.'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-700 via-white to-red-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {language === 'pt' ? 'Faça Negócios com a Rússia' :
             language === 'ru' ? 'Ведите бизнес с Россией' :
             'Do Business with Russia'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
            {language === 'pt' ? 'Explore as oportunidades do maior país do mundo' :
             language === 'ru' ? 'Исследуйте возможности крупнейшей страны мира' :
             'Explore opportunities in the world\'s largest country'}
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
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

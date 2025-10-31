import { useLanguage } from '../../contexts/LanguageContext';
import { MapPin, Users, TrendingUp, Briefcase, Globe2 } from 'lucide-react';

export const AboutBrazilPage = () => {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: '204M',
      label_pt: 'População',
      label_ru: 'Население',
      label_en: 'Population'
    },
    {
      icon: MapPin,
      value: '8.514.215 km²',
      label_pt: 'Área',
      label_ru: 'Площадь',
      label_en: 'Area'
    },
    {
      icon: Globe2,
      value: 'Brasília',
      label_pt: 'Capital',
      label_ru: 'Столица',
      label_en: 'Capital'
    },
    {
      icon: Briefcase,
      value: 'Real (R$)',
      label_pt: 'Moeda',
      label_ru: 'Валюта',
      label_en: 'Currency'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-br from-green-600 via-yellow-500 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/960px-Flag_of_Brazil.svg.png"
              alt="Bandeira do Brasil"
              className="w-48 h-auto shadow-2xl rounded-lg"
            />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">
            {language === 'pt' ? 'República Federativa do Brasil' :
             language === 'ru' ? 'Федеративная Республика Бразилия' :
             'Federative Republic of Brazil'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            {language === 'pt' ? 'O maior país da América do Sul, ocupando 47% da área territorial sul-americana' :
             language === 'ru' ? 'Крупнейшая страна Южной Америки, занимающая 47% территории Южной Америки' :
             'The largest country in South America, occupying 47% of South American territory'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <stat.icon className="w-6 h-6 text-green-700" />
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
            <Globe2 className="w-12 h-12 text-green-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Geografia e Clima' :
               language === 'ru' ? 'География и климат' :
               'Geography and Climate'}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {language === 'pt' ? 'Localizado no leste da América do Sul, o Brasil possui área territorial de 8.514.215,3 km², sendo o terceiro maior país do continente americano. Seu território ocupa 1,6% da superfície do globo terrestre, 5,7% das terras emersas do planeta e 20,8% da superfície do continente americano.' :
                 language === 'ru' ? 'Расположенная в восточной части Южной Америки, Бразилия имеет площадь 8 514 215,3 км², являясь третьей по величине страной американского континента. Её территория занимает 1,6% поверхности земного шара, 5,7% суши планеты и 20,8% поверхности американского континента.' :
                 'Located in eastern South America, Brazil has a territorial area of 8,514,215.3 km², being the third largest country in the American continent. Its territory occupies 1.6% of the globe\'s surface, 5.7% of the planet\'s landmass, and 20.8% of the American continent\'s surface.'}
              </p>
              <p>
                {language === 'pt' ? 'O clima varia entre equatorial, tropical, tropical de altitude, tropical atlântico, subtropical e semi-árido. O país limita-se com quase todos os países sul-americanos, exceto Equador e Chile.' :
                 language === 'ru' ? 'Климат варьируется от экваториального, тропического, горно-тропического, атлантического тропического, субтропического до полузасушливого. Страна граничит почти со всеми странами Южной Америки, за исключением Эквадора и Чили.' :
                 'The climate varies between equatorial, tropical, high-altitude tropical, Atlantic tropical, subtropical, and semi-arid. The country borders almost all South American countries, except Ecuador and Chile.'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <TrendingUp className="w-12 h-12 text-blue-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Economia' :
               language === 'ru' ? 'Экономика' :
               'Economy'}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {language === 'pt' ? 'A economia brasileira é diversificada, com principais produtos agrícolas incluindo algodão, arroz, café, cana-de-açúcar, laranja e soja. O país possui forte setor pecuário com bovinos, equinos, suínos, ovinos e aves.' :
                 language === 'ru' ? 'Бразильская экономика диверсифицирована, с основными сельскохозяйственными продуктами, включая хлопок, рис, кофе, сахарный тростник, апельсины и сою. Страна имеет сильный животноводческий сектор с крупным рогатым скотом, лошадьми, свиньями, овцами и птицей.' :
                 'The Brazilian economy is diversified, with main agricultural products including cotton, rice, coffee, sugarcane, oranges, and soybeans. The country has a strong livestock sector with cattle, horses, pigs, sheep, and poultry.'}
              </p>
              <p>
                {language === 'pt' ? 'A mineração inclui bauxita, ferro, manganês e ouro. A indústria abrange transformação, bens de consumo e bens duráveis. A renda per capita é de US$ 3.401.' :
                 language === 'ru' ? 'Горнодобывающая промышленность включает бокситы, железо, марганец и золото. Промышленность охватывает переработку, потребительские товары и товары длительного пользования. Доход на душу населения составляет 3 401 долларов США.' :
                 'Mining includes bauxite, iron, manganese, and gold. Industry encompasses manufacturing, consumer goods, and durable goods. Per capita income is US$ 3,401.'}
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
                {language === 'pt' ? 'Composição da População' :
                 language === 'ru' ? 'Состав населения' :
                 'Population Composition'}
              </h3>
              <p>
                {language === 'pt' ? 'A população brasileira é composta por brancos (55,2%), pardos (38,2%), negros (6%), amarelos (0,4%) e indígenas (0,2%). O cristianismo é a religião predominante, com católicos (71%) e outras denominações (10%), além de espiritismo, judaísmo e cultos afro-brasileiros.' :
                 language === 'ru' ? 'Население Бразилии состоит из белых (55,2%), мулатов (38,2%), чернокожих (6%), азиатов (0,4%) и коренных народов (0,2%). Христианство является преобладающей религией: католики (71%) и другие конфессии (10%), а также спиритизм, иудаизм и афро-бразильские культы.' :
                 'The Brazilian population consists of whites (55.2%), mixed race (38.2%), blacks (6%), Asians (0.4%), and indigenous peoples (0.2%). Christianity is the predominant religion, with Catholics (71%) and other denominations (10%), plus spiritism, Judaism, and Afro-Brazilian cults.'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'pt' ? 'Governo e Estrutura' :
                 language === 'ru' ? 'Правительство и структура' :
                 'Government and Structure'}
              </h3>
              <p>
                {language === 'pt' ? 'O Brasil é uma República Federativa composta por 26 estados e um Distrito Federal (Brasília), sede do governo. O país possui 5.564 municípios distribuídos em cinco regiões: Norte, Nordeste, Sudeste, Sul e Centro-Oeste. As principais cidades incluem São Paulo, Rio de Janeiro, Belo Horizonte, Porto Alegre e Salvador.' :
                 language === 'ru' ? 'Бразилия - Федеративная Республика, состоящая из 26 штатов и Федерального округа (Бразилиа), резиденции правительства. Страна имеет 5 564 муниципалитета, распределенных по пяти регионам: Север, Северо-Восток, Юго-Восток, Юг и Центро-Запад. Основные города включают Сан-Паулу, Рио-де-Жанейро, Белу-Оризонти, Порту-Алегри и Салвадор.' :
                 'Brazil is a Federative Republic composed of 26 states and a Federal District (Brasília), seat of government. The country has 5,564 municipalities distributed across five regions: North, Northeast, Southeast, South, and Center-West. Major cities include São Paulo, Rio de Janeiro, Belo Horizonte, Porto Alegre, and Salvador.'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {language === 'pt' ? 'Bandeira do Brasil' :
             language === 'ru' ? 'Флаг Бразилии' :
             'Flag of Brazil'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/960px-Flag_of_Brazil.svg.png"
                alt="Bandeira do Brasil"
                className="w-full max-w-md shadow-lg rounded-lg"
              />
            </div>
            <div className="lg:col-span-2 space-y-4 text-gray-600">
              <p>
                {language === 'pt' ? 'A Bandeira do Brasil foi projetada em 1889 por Raimundo Teixeira Mendes e Miguel Lemos, com desenho de Décio Vilares. Inspirada na Bandeira do Império, desenhada pelo pintor francês Jean Baptiste Debret, incorporou a esfera azul-celeste e a divisa positivista "Ordem e Progresso" no lugar da Coroa Imperial.' :
                 language === 'ru' ? 'Флаг Бразилии был разработан в 1889 году Раймундо Тейшейрой Мендешем и Мигелем Лемошем, с дизайном Десио Виларес. Вдохновленный флагом Империи, нарисованным французским художником Жаном Батистом Дебре, он включил голубую сферу и позитивистский девиз "Порядок и Прогресс" вместо Императорской короны.' :
                 'The Flag of Brazil was designed in 1889 by Raimundo Teixeira Mendes and Miguel Lemos, with artwork by Décio Vilares. Inspired by the Imperial Flag, designed by French painter Jean Baptiste Debret, it incorporated the celestial blue sphere and the positivist motto "Order and Progress" in place of the Imperial Crown.'}
              </p>
              <p>
                {language === 'pt' ? 'A expressão "Ordem e Progresso" foi extraída da fórmula máxima do Positivismo: "O amor por princípio, a ordem por base, o progresso por fim". Dentro da esfera, está representado o céu do Rio de Janeiro, com a constelação do Cruzeiro do Sul, às 8h30 de 15 de novembro de 1889, dia da Proclamação da República.' :
                 language === 'ru' ? 'Выражение "Порядок и Прогресс" было извлечено из максимальной формулы Позитивизма: "Любовь как принцип, порядок как основа, прогресс как цель". Внутри сферы представлено небо Рио-де-Жанейро с созвездием Южного Креста в 8:30 утра 15 ноября 1889 года, день Провозглашения Республики.' :
                 'The expression "Order and Progress" was extracted from the maximum formula of Positivism: "Love as a principle, order as the basis, progress as the goal." Inside the sphere is represented the sky of Rio de Janeiro, with the Southern Cross constellation, at 8:30 am on November 15, 1889, the day of the Proclamation of the Republic.'}
              </p>
              <p>
                {language === 'pt' ? 'As datas nacionais incluem 7 de setembro (Dia da Independência) e 15 de novembro (Proclamação da República).' :
                 language === 'ru' ? 'Национальные даты включают 7 сентября (День независимости) и 15 ноября (Провозглашение Республики).' :
                 'National dates include September 7 (Independence Day) and November 15 (Proclamation of the Republic).'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 via-yellow-500 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'pt' ? 'Faça Negócios com o Brasil' :
             language === 'ru' ? 'Ведите бизнес с Бразилией' :
             'Do Business with Brazil'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {language === 'pt' ? 'Descubra as oportunidades do maior mercado da América Latina' :
             language === 'ru' ? 'Откройте для себя возможности крупнейшего рынка Латинской Америки' :
             'Discover opportunities in Latin America\'s largest market'}
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold"
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

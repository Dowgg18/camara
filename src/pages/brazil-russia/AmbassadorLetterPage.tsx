import { useLanguage } from '../../contexts/LanguageContext';
import { Mail, User, Calendar } from 'lucide-react';

export const AmbassadorLetterPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-red-700 via-blue-600 to-white text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Mail className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-6">
            {language === 'pt' ? 'Carta do Embaixador da Rússia' :
             language === 'ru' ? 'Письмо посла России' :
             'Letter from the Russian Ambassador'}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            {language === 'pt' ? 'Mensagem oficial sobre as relações Brasil-Rússia' :
             language === 'ru' ? 'Официальное послание о бразильско-российских отношениях' :
             'Official message on Brazil-Russia relations'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-50 to-blue-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mr-4">
                <User className="w-8 h-8 text-blue-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === 'pt' ? 'Alexey Labetsky' :
                   language === 'ru' ? 'Алексей Лабецкий' :
                   'Alexey Labetsky'}
                </h2>
                <p className="text-gray-600">
                  {language === 'pt' ? 'Embaixador da Federação Russa no Brasil' :
                   language === 'ru' ? 'Посол Российской Федерации в Бразилии' :
                   'Ambassador of the Russian Federation to Brazil'}
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {language === 'pt' ? 'Brasília, Janeiro de 2025' :
                 language === 'ru' ? 'Бразилиа, январь 2025 г.' :
                 'Brasília, January 2025'}
              </span>
            </div>
          </div>

          <div className="p-8 prose prose-lg max-w-none">
            {language === 'pt' && (
              <>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Caros amigos e parceiros,
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  É com grande satisfação que dirijo esta mensagem aos membros e parceiros da Câmara de Comércio Brasil-Rússia. As relações entre nossos dois países têm uma longa e rica história, marcada por cooperação mutuamente benéfica e respeito mútuo.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nos últimos anos, temos testemunhado um fortalecimento significativo dos laços econômicos e comerciais entre a Rússia e o Brasil. Nosso comércio bilateral tem crescido consistentemente, abrangendo diversos setores estratégicos, desde energia e agricultura até tecnologia e manufatura.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Rússia vê o Brasil como um parceiro estratégico de suma importância, não apenas no âmbito bilateral, mas também em fóruns multilaterais como os BRICS e o G20. Compartilhamos visões semelhantes sobre questões fundamentais da agenda internacional e trabalhamos juntos para promover um mundo multipolar mais justo e equilibrado.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Estamos comprometidos em expandir ainda mais nossa cooperação em áreas como energia nuclear pacífica, exploração espacial, defesa, agricultura e inovação tecnológica. A Câmara de Comércio Brasil-Rússia desempenha um papel crucial na facilitação desses intercâmbios e na promoção de novos projetos de colaboração.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Convido todas as empresas brasileiras e russas a explorarem as vastas oportunidades que nossas economias complementares oferecem. Juntos, podemos construir parcerias duradouras que beneficiem ambos os povos e contribuam para o desenvolvimento sustentável de nossos países.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Estou à disposição para apoiar todas as iniciativas que fortaleçam os laços entre Brasil e Rússia.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Com os melhores cumprimentos,
                </p>
                <p className="text-gray-900 font-semibold mt-6">
                  Alexey Labetsky<br />
                  Embaixador da Federação Russa no Brasil
                </p>
              </>
            )}

            {language === 'ru' && (
              <>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Дорогие друзья и партнеры,
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  С большим удовольствием обращаюсь с этим посланием к членам и партнерам Бразильско-Российской торговой палаты. Отношения между нашими двумя странами имеют долгую и богатую историю, отмеченную взаимовыгодным сотрудничеством и взаимным уважением.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  В последние годы мы стали свидетелями значительного укрепления экономических и торговых связей между Россией и Бразилией. Наша двусторонняя торговля постоянно растет, охватывая различные стратегические секторы, от энергетики и сельского хозяйства до технологий и производства.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Россия рассматривает Бразилию как стратегического партнера первостепенной важности не только в двустороннем формате, но и на многосторонних форумах, таких как БРИКС и G20. Мы разделяем схожие взгляды на фундаментальные вопросы международной повестки дня и работаем вместе над продвижением более справедливого и сбалансированного многополярного мира.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Мы привержены дальнейшему расширению нашего сотрудничества в таких областях, как мирная ядерная энергетика, освоение космоса, оборона, сельское хозяйство и технологические инновации. Бразильско-Российская торговая палата играет решающую роль в содействии этому обмену и продвижении новых совместных проектов.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Приглашаю все бразильские и российские компании изучить огромные возможности, которые предлагают наши взаимодополняющие экономики. Вместе мы можем строить долгосрочные партнерства, которые принесут пользу обоим народам и будут способствовать устойчивому развитию наших стран.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Я готов поддержать все инициативы, укрепляющие связи между Бразилией и Россией.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  С наилучшими пожеланиями,
                </p>
                <p className="text-gray-900 font-semibold mt-6">
                  Алексей Лабецкий<br />
                  Посол Российской Федерации в Бразилии
                </p>
              </>
            )}

            {language === 'en' && (
              <>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dear friends and partners,
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  It is with great pleasure that I address this message to the members and partners of the Brazil-Russia Chamber of Commerce. The relations between our two countries have a long and rich history, marked by mutually beneficial cooperation and mutual respect.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In recent years, we have witnessed a significant strengthening of economic and trade ties between Russia and Brazil. Our bilateral trade has been growing consistently, encompassing various strategic sectors, from energy and agriculture to technology and manufacturing.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Russia sees Brazil as a strategic partner of paramount importance, not only bilaterally but also in multilateral forums such as BRICS and the G20. We share similar views on fundamental issues of the international agenda and work together to promote a more just and balanced multipolar world.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are committed to further expanding our cooperation in areas such as peaceful nuclear energy, space exploration, defense, agriculture, and technological innovation. The Brazil-Russia Chamber of Commerce plays a crucial role in facilitating these exchanges and promoting new collaborative projects.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  I invite all Brazilian and Russian companies to explore the vast opportunities that our complementary economies offer. Together, we can build lasting partnerships that benefit both peoples and contribute to the sustainable development of our countries.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  I am available to support all initiatives that strengthen ties between Brazil and Russia.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  With best regards,
                </p>
                <p className="text-gray-900 font-semibold mt-6">
                  Alexey Labetsky<br />
                  Ambassador of the Russian Federation to Brazil
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-red-700 via-blue-600 to-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {language === 'pt' ? 'Entre em Contato com a Embaixada' :
             language === 'ru' ? 'Свяжитесь с посольством' :
             'Contact the Embassy'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
            {language === 'pt' ? 'Para mais informações sobre cooperação bilateral' :
             language === 'ru' ? 'Для получения дополнительной информации о двустороннем сотрудничестве' :
             'For more information on bilateral cooperation'}
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
          >
            {language === 'pt' ? 'Fale Conosco' :
             language === 'ru' ? 'Связаться' :
             'Contact Us'}
          </a>
        </div>
      </div>
    </div>
  );
};

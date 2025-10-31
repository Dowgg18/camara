import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, User, LogOut, Search, TrendingUp, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface TickerArticle {
  id: string;
  title_pt: string;
  title_ru: string | null;
  title_en: string | null;
  published_at: string;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showChamberMenu, setShowChamberMenu] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [showMembersMenu, setShowMembersMenu] = useState(false);
  const [showBrazilRussiaMenu, setShowBrazilRussiaMenu] = useState(false);
  const [showMediaMenu, setShowMediaMenu] = useState(false);
  const [tickerArticles, setTickerArticles] = useState<TickerArticle[]>([]);
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

  const handleLanguageChange = (lang: 'pt' | 'ru' | 'en') => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  useEffect(() => {
    const fetchTickerArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title_pt, title_ru, title_en, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        setTickerArticles(data);
      }
    };

    fetchTickerArticles();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getTickerTitle = (article: TickerArticle) => {
    if (language === 'ru' && article.title_ru) return article.title_ru;
    if (language === 'en' && article.title_en) return article.title_en;
    return article.title_pt;
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const publishedDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'há menos de 1 hora';
    if (diffInHours === 1) return 'há 1 hora';
    if (diffInHours < 24) return `há ${diffInHours} horas`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'há 1 dia';
    return `há ${diffInDays} dias`;
  };

  const handleNextTicker = () => {
    setCurrentTickerIndex((prev) => (prev + 1) % tickerArticles.length);
  };

  const handlePrevTicker = () => {
    setCurrentTickerIndex((prev) => (prev - 1 + tickerArticles.length) % tickerArticles.length);
  };

  const closeAllMenus = () => {
    setIsOpen(false);
    setShowChamberMenu(false);
    setShowServicesMenu(false);
    setShowMembersMenu(false);
    setShowBrazilRussiaMenu(false);
    setShowMediaMenu(false);
  };

  return (
    <>
      {tickerArticles.length > 0 && (
        <div className="bg-gray-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10 text-xs sm:text-sm">
              <Link
                to={`/news/${tickerArticles[currentTickerIndex].id}`}
                className="flex items-center space-x-2 sm:space-x-3 overflow-hidden hover:text-gray-100 transition-colors flex-1"
              >
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-semibold uppercase tracking-wide hidden sm:inline">Destaque</span>
                <span className="truncate">{getTickerTitle(tickerArticles[currentTickerIndex])}</span>
                <span className="text-gray-300 text-xs hidden md:inline">— {getTimeAgo(tickerArticles[currentTickerIndex].published_at)}</span>
              </Link>
              {tickerArticles.length > 1 && (
                <div className="hidden sm:flex items-center space-x-2">
                  <button
                    onClick={handlePrevTicker}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    aria-label="Notícia anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextTicker}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    aria-label="Próxima notícia"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3" onClick={closeAllMenus}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-700 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">BR</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">Câmara de Comércio</div>
                  <div className="text-xs text-gray-600">Brasil-Rússia</div>
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <div className="relative group">
                <Link
                  to="/about"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span>{t('nav.chamber')}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.aboutChamber')}
                  </Link>
                  <Link to="/about/board" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.board')}
                  </Link>
                  <Link to="/about/president-message" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.presidentMessage')}
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  <span>{t('nav.services')}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.servicesOverview')}
                  </Link>
                  <Link to="/services/table" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.servicesTable')}
                  </Link>
                </div>
              </div>

              <Link to="/partners" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                {t('nav.partners')}
              </Link>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  <span>{t('nav.members')}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/members" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.membersList')}
                  </Link>
                  <Link to="/membership" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.membership')}
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  <span>{t('nav.brazilrussia')}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/brazil-russia/about-brazil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.aboutBrazil')}
                  </Link>
                  <Link to="/brazil-russia/about-russia" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.aboutRussia')}
                  </Link>
                  <Link to="/brazil-russia/projects" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.projects')}
                  </Link>
                  <Link to="/brazil-russia/links" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.links')}
                  </Link>
                  <Link to="/brazil-russia/ambassador-letter" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.ambassadorLetter')}
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  <span>{t('nav.media')}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/media/interviews" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.interviews')}
                  </Link>
                  <Link to="/events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.events')}
                  </Link>
                  <Link to="/media/culture" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.culture')}
                  </Link>
                  <Link to="/news" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.news')}
                  </Link>
                  <Link to="/media/newsletter" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.newsletter')}
                  </Link>
                  <Link to="/media/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.blog')}
                  </Link>
                </div>
              </div>

              <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                {t('nav.contact')}
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg flex items-center space-x-1"
                >
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 uppercase">{language}</span>
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <button onClick={() => handleLanguageChange('pt')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Português
                    </button>
                    <button onClick={() => handleLanguageChange('ru')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Русский
                    </button>
                    <button onClick={() => handleLanguageChange('en')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      English
                    </button>
                  </div>
                )}
              </div>

              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Área ADM</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title={t('nav.logout')}
                  >
                    <LogOut className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/membership"
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  {t('nav.membership')}
                </Link>
              )}
            </div>

            <div className="flex lg:hidden items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg flex items-center"
                >
                  <Globe className="w-5 h-5 text-gray-600" />
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button onClick={() => handleLanguageChange('pt')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Português
                    </button>
                    <button onClick={() => handleLanguageChange('ru')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Русский
                    </button>
                    <button onClick={() => handleLanguageChange('en')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      English
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              <div className="pb-2 mb-2 border-b border-gray-200">
                <button
                  onClick={() => setShowChamberMenu(!showChamberMenu)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <span>{t('nav.chamber')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showChamberMenu ? 'rotate-180' : ''}`} />
                </button>
                {showChamberMenu && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link to="/about" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.aboutChamber')}
                    </Link>
                    <Link to="/about/board" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.board')}
                    </Link>
                    <Link to="/about/president-message" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.presidentMessage')}
                    </Link>
                  </div>
                )}
              </div>

              <div className="pb-2 mb-2 border-b border-gray-200">
                <button
                  onClick={() => setShowServicesMenu(!showServicesMenu)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showServicesMenu ? 'rotate-180' : ''}`} />
                </button>
                {showServicesMenu && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link to="/services" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.servicesOverview')}
                    </Link>
                    <Link to="/services/table" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.servicesTable')}
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/partners" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                {t('nav.partners')}
              </Link>

              <div className="pb-2 mb-2 border-b border-gray-200">
                <button
                  onClick={() => setShowMembersMenu(!showMembersMenu)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <span>{t('nav.members')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMembersMenu ? 'rotate-180' : ''}`} />
                </button>
                {showMembersMenu && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link to="/members" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.membersList')}
                    </Link>
                    <Link to="/membership" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.membership')}
                    </Link>
                  </div>
                )}
              </div>

              <div className="pb-2 mb-2 border-b border-gray-200">
                <button
                  onClick={() => setShowBrazilRussiaMenu(!showBrazilRussiaMenu)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <span>{t('nav.brazilrussia')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showBrazilRussiaMenu ? 'rotate-180' : ''}`} />
                </button>
                {showBrazilRussiaMenu && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link to="/brazil-russia/about-brazil" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.aboutBrazil')}
                    </Link>
                    <Link to="/brazil-russia/about-russia" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.aboutRussia')}
                    </Link>
                    <Link to="/brazil-russia/projects" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.projects')}
                    </Link>
                    <Link to="/brazil-russia/links" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.links')}
                    </Link>
                    <Link to="/brazil-russia/ambassador-letter" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.ambassadorLetter')}
                    </Link>
                  </div>
                )}
              </div>

              <div className="pb-2 mb-2 border-b border-gray-200">
                <button
                  onClick={() => setShowMediaMenu(!showMediaMenu)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <span>{t('nav.media')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMediaMenu ? 'rotate-180' : ''}`} />
                </button>
                {showMediaMenu && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link to="/media/interviews" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.interviews')}
                    </Link>
                    <Link to="/events" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.events')}
                    </Link>
                    <Link to="/media/culture" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.culture')}
                    </Link>
                    <Link to="/news" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.news')}
                    </Link>
                    <Link to="/media/newsletter" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.newsletter')}
                    </Link>
                    <Link to="/media/blog" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                      {t('nav.blog')}
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                {t('nav.contact')}
              </Link>

              {user ? (
                <div className="pt-2 mt-2 border-t border-gray-200 space-y-1">
                  <Link to="/admin" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                    Área ADM
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeAllMenus();
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <Link to="/membership" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-lg" onClick={closeAllMenus}>
                  {t('nav.membership')}
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

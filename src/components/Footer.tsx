import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-700 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BR</span>
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Câmara de Comércio</div>
                <div className="text-xs text-gray-400">Brasil-Rússia</div>
              </div>
            </div>
            <p className="text-sm">
              {t('home.banner.subtitle')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.about')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">{t('footer.services')}</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">{t('nav.news')}</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">{t('nav.events')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('nav.membership')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/membership" className="hover:text-white transition-colors">{t('membership.bronze')}</Link></li>
              <li><Link to="/membership" className="hover:text-white transition-colors">{t('membership.silver')}</Link></li>
              <li><Link to="/membership" className="hover:text-white transition-colors">{t('membership.gold')}</Link></li>
              <li><Link to="/publications" className="hover:text-white transition-colors">{t('nav.publications')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>São Paulo, Brasil</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+55 (11) 3000-0000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contato@ccbr.org.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Câmara de Comércio Brasil-Rússia. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
};

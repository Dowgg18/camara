import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface Article {
  id: string;
  title_pt: string;
  title_ru: string | null;
  title_en: string | null;
  excerpt_pt: string;
  excerpt_ru: string | null;
  excerpt_en: string | null;
  category: string;
  author: string;
  image_url: string;
  read_time: string;
  published_at: string;
}

export const HomePage = () => {
  const { language, t } = useLanguage();
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [topArticles, setTopArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: featured } = await supabase
      .from('articles')
      .select('*')
      .eq('is_featured', true)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: top } = await supabase
      .from('articles')
      .select('*')
      .eq('is_featured', true)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .range(1, 3);

    const { data: latest } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(8);

    const { data: trending } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(5);

    if (featured) setFeaturedArticle(featured);
    if (top) setTopArticles(top);
    if (latest) setLatestArticles(latest);
    if (trending) setTrendingArticles(trending);
  };

  const getTitle = (article: Article) => {
    return language === 'pt' ? article.title_pt :
           language === 'ru' ? (article.title_ru || article.title_pt) :
           (article.title_en || article.title_pt);
  };

  const getExcerpt = (article: Article) => {
    return language === 'pt' ? article.excerpt_pt :
           language === 'ru' ? (article.excerpt_ru || article.excerpt_pt) :
           (article.excerpt_en || article.excerpt_pt);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 24) return `há ${diffHours} horas`;
    if (diffDays === 1) return 'há 1 dia';
    if (diffDays < 7) return `há ${diffDays} dias`;
    return date.toLocaleDateString(language);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {featuredArticle && (
            <Link to={`/news/${featuredArticle.id}`} className="lg:col-span-2 relative group cursor-pointer overflow-hidden rounded-lg block">
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
                <img
                  src={featuredArticle.image_url}
                  alt={getTitle(featuredArticle)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                  <span className="inline-block px-2 sm:px-3 py-1 bg-emerald-600 text-xs font-semibold uppercase tracking-wide mb-2 sm:mb-3 rounded">
                    Destaque
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight group-hover:text-emerald-400 transition-colors">
                    {getTitle(featuredArticle)}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-200 mb-3 sm:mb-4 line-clamp-2">{getExcerpt(featuredArticle)}</p>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-300">
                    <span>{featuredArticle.author}</span>
                    <span>•</span>
                    <span>{formatDate(featuredArticle.published_at)}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div className="lg:col-span-2 space-y-3 sm:space-y-4 lg:space-y-6">
            {topArticles.map((article) => (
              <Link key={article.id} to={`/news/${article.id}`} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer block">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={getTitle(article)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3 sm:p-4 flex-1">
                    <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2 rounded">
                      {article.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {getTitle(article)}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{article.read_time}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t('home.latest.title')}</h2>
              <Link to="/news" className="text-emerald-700 hover:text-emerald-800 font-medium text-sm">
                {t('viewAll')} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {latestArticles.map((article) => (
                <Link key={article.id} to={`/news/${article.id}`} className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all block">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={getTitle(article)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                      <span className="px-2 py-0.5 sm:py-1 bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wide rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {getTitle(article)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 sm:mb-3 line-clamp-2">{getExcerpt(article)}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 flex-wrap gap-1">
                      <span className="font-medium">{article.author}</span>
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm mb-4 sm:mb-6 lg:sticky lg:top-24">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                <TrendingUp className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Mais Lidas</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {trendingArticles.map((article, index) => (
                  <Link key={article.id} to={`/news/${article.id}`} className="group cursor-pointer block">
                    <div className="flex items-start space-x-2 sm:space-x-3 pb-3 sm:pb-4 border-b border-gray-100 last:border-0">
                      <span className="text-xl sm:text-2xl font-bold text-gray-200 group-hover:text-emerald-700 transition-colors">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-1 block">
                          {article.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-1 line-clamp-2">
                          {getTitle(article)}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <Eye className="w-3 h-3 mr-1" />
                          <span>{formatDate(article.published_at)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-700 to-emerald-600 rounded-lg p-4 sm:p-6 text-white text-center">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Faça parte da nossa comunidade</h3>
              <p className="text-emerald-100 text-sm mb-3 sm:mb-4">
                Associe-se e tenha acesso a benefícios exclusivos
              </p>
              <Link
                to="/membership"
                className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-emerald-900 rounded-lg hover:bg-emerald-50 transition-colors font-semibold text-sm"
              >
                Associe-se Agora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

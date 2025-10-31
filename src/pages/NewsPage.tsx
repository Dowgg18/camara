import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
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

export const NewsPage = () => {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Comércio', 'Indústria', 'Cultura', 'Turismo', 'Tecnologia', 'Inovação'];

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    let query = supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    const { data } = await query;
    if (data) setArticles(data);
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('nav.news')}</h1>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image_url}
                  alt={getTitle(article)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <span className="inline-block px-2 py-1 bg-emerald-100 text-xs font-semibold uppercase tracking-wide text-emerald-800 mb-2 rounded">
                  {article.category}
                </span>
                <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-emerald-700 transition-colors">
                  {getTitle(article)}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{getExcerpt(article)}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-medium">{article.author}</span>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{article.read_time}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

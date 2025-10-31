import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { partnersData } from '../data/partnersData';

interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'quote' | 'image';
  content?: string;
  metadata?: {
    level?: number;
    caption?: string;
  };
}

interface Article {
  id: string;
  title_pt: string;
  title_ru: string | null;
  title_en: string | null;
  excerpt_pt: string;
  excerpt_ru: string | null;
  excerpt_en: string | null;
  content_pt?: string;
  content_ru?: string | null;
  content_en?: string | null;
  content_blocks_pt?: ContentBlock[];
  content_blocks_ru?: ContentBlock[];
  content_blocks_en?: ContentBlock[];
  category: string;
  author: string;
  image_url: string;
  read_time: string;
  published_at: string;
}

export const NewsPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .maybeSingle();

    if (data) {
      setArticle(data);
      fetchRelatedArticles(data.category);
    } else {
      navigate('/news');
    }
    setLoading(false);
  };

  const fetchRelatedArticles = async (category: string) => {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .neq('id', id)
      .order('published_at', { ascending: false })
      .limit(3);

    if (data) setRelatedArticles(data);
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

  const getContentBlocks = (article: Article): ContentBlock[] => {
    const blocks = language === 'pt' ? article.content_blocks_pt :
           language === 'ru' ? (article.content_blocks_ru || article.content_blocks_pt) :
           (article.content_blocks_en || article.content_blocks_pt);

    return blocks || [];
  };

  const renderContentBlock = (block: ContentBlock) => {
    if (block.type === 'heading') {
      const level = block.metadata?.level || 2;
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      const sizeClass = level === 2 ? 'text-3xl' : level === 3 ? 'text-2xl' : 'text-xl';

      return (
        <HeadingTag key={block.id} className={`${sizeClass} font-bold text-gray-900 mt-8 mb-4`}>
          {block.content}
        </HeadingTag>
      );
    }

    if (block.type === 'paragraph') {
      return (
        <p key={block.id} className="text-gray-800 leading-relaxed mb-4 text-lg">
          {block.content}
        </p>
      );
    }

    if (block.type === 'quote') {
      return (
        <blockquote key={block.id} className="border-l-4 border-gray-600 pl-6 py-2 my-6 italic text-gray-700 text-lg">
          {block.content}
        </blockquote>
      );
    }

    if (block.type === 'image' && block.content) {
      return (
        <figure key={block.id} className="my-8">
          <img
            src={block.content}
            alt={block.metadata?.caption || ''}
            className="w-full rounded-lg shadow-md"
          />
          {block.metadata?.caption && (
            <figcaption className="mt-3 text-sm text-gray-600 text-center italic">
              {block.metadata.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    return null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/news"
            className="inline-flex items-center text-gray-900 hover:text-gray-800 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Notícias
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2">
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-sm font-semibold uppercase tracking-wide text-gray-800 rounded-full">
                  <Tag className="w-3 h-3 mr-1" />
                  {article.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {getTitle(article)}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(article.published_at)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{article.read_time}</span>
                </div>
              </div>
            </header>

            <div className="relative h-96 mb-10 rounded-xl overflow-hidden shadow-lg">
              <img
                src={article.image_url}
                alt={getTitle(article)}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none bg-white rounded-lg p-8 shadow-sm">
              <p className="text-xl text-gray-700 font-medium mb-8 leading-relaxed">
                {getExcerpt(article)}
              </p>

              <div className="space-y-6">
                {getContentBlocks(article).map((block) => renderContentBlock(block))}
              </div>
            </div>
          </article>

          {/* Sidebar - Partners */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  Nossos Parceiros
                </h3>
                <div className="space-y-4">
                  {partnersData.map((partner) => (
                    <Link
                      key={partner.id}
                      to="/partners"
                      className="block group"
                    >
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-600 hover:shadow-md transition-all duration-200">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                          style={{ maxHeight: '80px' }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <div className="bg-white border-t py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Notícias Relacionadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/news/${relatedArticle.id}`}
                  className="group bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedArticle.image_url}
                      alt={getTitle(relatedArticle)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-2 py-1 bg-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-800 mb-2 rounded">
                      {relatedArticle.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-gray-900 transition-colors line-clamp-2">
                      {getTitle(relatedArticle)}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{getExcerpt(relatedArticle)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

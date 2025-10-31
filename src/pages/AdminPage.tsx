import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CreditCard as Edit2, Trash2, Save, Eye, Loader, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ImageUpload } from '../components/ImageUpload';
import { AdminLayout } from '../components/AdminLayout';
import { BlockEditor, ContentBlock } from '../components/BlockEditor';

interface Article {
  id: string;
  title_pt: string;
  title_ru: string | null;
  title_en: string | null;
  excerpt_pt: string;
  excerpt_ru: string | null;
  excerpt_en: string | null;
  content_blocks_pt: ContentBlock[];
  content_blocks_ru: ContentBlock[] | null;
  content_blocks_en: ContentBlock[] | null;
  category: string;
  author: string;
  image_url: string;
  read_time: string;
  is_published: boolean;
  published_at: string | null;
}

interface ArticleForm {
  title_pt: string;
  title_ru: string;
  title_en: string;
  excerpt_pt: string;
  excerpt_ru: string;
  excerpt_en: string;
  content_blocks_pt: ContentBlock[];
  content_blocks_ru: ContentBlock[];
  content_blocks_en: ContentBlock[];
  category: string;
  author: string;
  image_url: string;
  read_time: string;
}

const emptyForm: ArticleForm = {
  title_pt: '',
  title_ru: '',
  title_en: '',
  excerpt_pt: '',
  excerpt_ru: '',
  excerpt_en: '',
  content_blocks_pt: [],
  content_blocks_ru: [],
  content_blocks_en: [],
  category: 'Comércio',
  author: '',
  image_url: '',
  read_time: '5 min',
};

export const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm>(emptyForm);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'content-pt' | 'content-ru' | 'content-en'>('info');
  const [previewMode, setPreviewMode] = useState(false);
  const [translating, setTranslating] = useState<{
    title?: boolean;
    excerpt?: boolean;
    blocks?: boolean;
  }>({});
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const titleTimeoutRef = useRef<NodeJS.Timeout>();
  const excerptTimeoutRef = useRef<NodeJS.Timeout>();
  const blocksTimeoutRef = useRef<NodeJS.Timeout>();

  const categories = ['Comércio', 'Indústria', 'Cultura', 'Turismo', 'Tecnologia', 'Inovação'];

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchArticles();
    }
  }, [user, navigate, selectedCategory]);

  const fetchArticles = async () => {
    let query = supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false });

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    const { data } = await query;
    if (data) {
      setArticles(data.map(article => ({
        ...article,
        content_blocks_pt: article.content_blocks_pt || [],
        content_blocks_ru: article.content_blocks_ru || [],
        content_blocks_en: article.content_blocks_en || [],
      })));
    }
  };

  const translateText = async (text: string, targetLanguage: 'ru' | 'en', fieldType: 'title' | 'excerpt' | 'content'): Promise<string> => {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate-article`;
    const { data: { session } } = await supabase.auth.getSession();

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, targetLanguage, fieldType }),
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    return data.translatedText;
  };

  const handleTitleChange = useCallback((value: string) => {
    setForm(prev => ({ ...prev, title_pt: value }));
    setError(null);

    if (!autoTranslateEnabled || !value.trim()) {
      setForm(prev => ({ ...prev, title_ru: '', title_en: '' }));
      return;
    }

    if (titleTimeoutRef.current) {
      clearTimeout(titleTimeoutRef.current);
    }

    setTranslating(prev => ({ ...prev, title: true }));

    titleTimeoutRef.current = setTimeout(async () => {
      try {
        const [titleRu, titleEn] = await Promise.all([
          translateText(value, 'ru', 'title'),
          translateText(value, 'en', 'title'),
        ]);
        setForm(prev => ({ ...prev, title_ru: titleRu, title_en: titleEn }));
      } catch (error) {
        console.error('Translation error:', error);
        setError('Erro ao traduzir título. Tente novamente.');
      } finally {
        setTranslating(prev => ({ ...prev, title: false }));
      }
    }, 1000);
  }, [autoTranslateEnabled]);

  const handleExcerptChange = useCallback((value: string) => {
    setForm(prev => ({ ...prev, excerpt_pt: value }));
    setError(null);

    if (!autoTranslateEnabled || !value.trim()) {
      setForm(prev => ({ ...prev, excerpt_ru: '', excerpt_en: '' }));
      return;
    }

    if (excerptTimeoutRef.current) {
      clearTimeout(excerptTimeoutRef.current);
    }

    setTranslating(prev => ({ ...prev, excerpt: true }));

    excerptTimeoutRef.current = setTimeout(async () => {
      try {
        const [excerptRu, excerptEn] = await Promise.all([
          translateText(value, 'ru', 'excerpt'),
          translateText(value, 'en', 'excerpt'),
        ]);
        setForm(prev => ({ ...prev, excerpt_ru: excerptRu, excerpt_en: excerptEn }));
      } catch (error) {
        console.error('Translation error:', error);
        setError('Erro ao traduzir resumo. Tente novamente.');
      } finally {
        setTranslating(prev => ({ ...prev, excerpt: false }));
      }
    }, 1500);
  }, [autoTranslateEnabled]);

  const handleContentBlocksChange = useCallback((blocks: ContentBlock[]) => {
    setForm(prev => ({ ...prev, content_blocks_pt: blocks }));
    setError(null);

    if (!autoTranslateEnabled) {
      return;
    }

    if (blocksTimeoutRef.current) {
      clearTimeout(blocksTimeoutRef.current);
    }

    if (blocks.length === 0) {
      setForm(prev => ({ ...prev, content_blocks_ru: [], content_blocks_en: [] }));
      return;
    }

    setTranslating(prev => ({ ...prev, blocks: true }));

    blocksTimeoutRef.current = setTimeout(async () => {
      try {
        const translateBlocks = async (targetLang: 'ru' | 'en'): Promise<ContentBlock[]> => {
          const translatedBlocks = await Promise.all(
            blocks.map(async (block) => {
              if (block.type === 'image') {
                if (!block.metadata?.caption?.trim()) {
                  return { ...block };
                }
                try {
                  const translatedCaption = await translateText(block.metadata.caption, targetLang, 'content');
                  return {
                    ...block,
                    metadata: { ...block.metadata, caption: translatedCaption },
                  };
                } catch (error) {
                  console.error(`Error translating caption:`, error);
                  return { ...block };
                }
              }

              if (!block.content.trim() && (!block.metadata?.items || block.metadata.items.every(item => !item.trim()))) {
                return { ...block };
              }

              try {
                let translatedContent = block.content;
                if (block.content.trim()) {
                  translatedContent = await translateText(block.content, targetLang, 'content');
                }

                let translatedMetadata = { ...block.metadata };
                if (block.metadata?.items && block.metadata.items.some(item => item.trim())) {
                  const translatedItems = await Promise.all(
                    block.metadata.items.map(item =>
                      item.trim() ? translateText(item, targetLang, 'content') : Promise.resolve(item)
                    )
                  );
                  translatedMetadata = { ...translatedMetadata, items: translatedItems };
                }

                return {
                  ...block,
                  content: translatedContent,
                  metadata: translatedMetadata,
                };
              } catch (error) {
                console.error(`Error translating block ${block.id}:`, error);
                return { ...block };
              }
            })
          );
          return translatedBlocks;
        };

        const [blocksRu, blocksEn] = await Promise.all([
          translateBlocks('ru'),
          translateBlocks('en'),
        ]);

        setForm(prev => ({
          ...prev,
          content_blocks_ru: blocksRu,
          content_blocks_en: blocksEn,
        }));
      } catch (error) {
        console.error('Translation error:', error);
        setError('Erro ao traduzir conteúdo. Tente novamente.');
      } finally {
        setTranslating(prev => ({ ...prev, blocks: false }));
      }
    }, 2000);
  }, [autoTranslateEnabled]);

  const convertBlocksToText = (blocks: ContentBlock[]): string => {
    return blocks
      .map(block => {
        switch (block.type) {
          case 'heading':
            return `# ${block.content}\n`;
          case 'paragraph':
            return `${block.content}\n`;
          case 'quote':
            return `> ${block.content}\n`;
          case 'list':
            return block.items?.map(item => `- ${item}`).join('\n') + '\n';
          default:
            return '';
        }
      })
      .join('\n');
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `articles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent, publishNow: boolean = false) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = form.image_url;

      if (selectedImage) {
        setUploadingImage(true);
        imageUrl = await uploadImage(selectedImage);
        setUploadingImage(false);
      }

      let slug = form.title_pt
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');

      if (!slug || slug.trim() === '') {
        slug = `artigo-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      }

      const articleData: any = {
        title_pt: form.title_pt,
        title_ru: form.title_ru || null,
        title_en: form.title_en || null,
        excerpt_pt: form.excerpt_pt,
        excerpt_ru: form.excerpt_ru || null,
        excerpt_en: form.excerpt_en || null,
        content_pt: convertBlocksToText(form.content_blocks_pt),
        content_ru: form.content_blocks_ru.length > 0 ? convertBlocksToText(form.content_blocks_ru) : null,
        content_en: form.content_blocks_en.length > 0 ? convertBlocksToText(form.content_blocks_en) : null,
        content_blocks_pt: JSON.parse(JSON.stringify(form.content_blocks_pt)),
        content_blocks_ru: form.content_blocks_ru.length > 0 ? JSON.parse(JSON.stringify(form.content_blocks_ru)) : null,
        content_blocks_en: form.content_blocks_en.length > 0 ? JSON.parse(JSON.stringify(form.content_blocks_en)) : null,
        category: form.category,
        author: form.author,
        image_url: imageUrl,
        read_time: form.read_time,
        is_published: publishNow,
        published_at: publishNow ? new Date().toISOString() : null,
      };

      if (!editingId) {
        articleData.slug = slug;
      }

      if (editingId) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingId);

        if (error) throw error;
        alert(publishNow ? 'Artigo publicado com sucesso!' : 'Rascunho atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);

        if (error) throw error;
        alert(publishNow ? 'Artigo publicado com sucesso!' : 'Rascunho salvo com sucesso!');
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      setSelectedImage(null);
      fetchArticles();
    } catch (error: any) {
      console.error('Erro ao salvar:', error);
      setError(error.message || 'Erro ao salvar artigo. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  const handleEdit = (article: Article) => {
    setForm({
      title_pt: article.title_pt,
      title_ru: article.title_ru || '',
      title_en: article.title_en || '',
      excerpt_pt: article.excerpt_pt,
      excerpt_ru: article.excerpt_ru || '',
      excerpt_en: article.excerpt_en || '',
      content_blocks_pt: article.content_blocks_pt || [],
      content_blocks_ru: article.content_blocks_ru || [],
      content_blocks_en: article.content_blocks_en || [],
      category: article.category,
      author: article.author,
      image_url: article.image_url,
      read_time: article.read_time,
    });
    setEditingId(article.id);
    setShowForm(true);
    setActiveTab('info');
    setAutoTranslateEnabled(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este artigo?')) {
      const { error } = await supabase.from('articles').delete().eq('id', id);

      if (error) {
        console.error('Erro ao excluir:', error);
        alert('Erro ao excluir artigo. Por favor, tente novamente.');
      } else {
        alert('Artigo excluído com sucesso!');
        fetchArticles();
      }
    }
  };

  const renderPreview = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        {form.image_url && <img src={form.image_url} alt={form.title_pt} className="w-full h-96 object-cover" />}
        <div className="p-8">
          <div className="flex items-center space-x-3 text-sm text-gray-600 mb-4">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">{form.category}</span>
            <span>{form.author}</span>
            <span>•</span>
            <span>{form.read_time} de leitura</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{form.title_pt}</h1>
          <p className="text-xl text-gray-600 mb-8">{form.excerpt_pt}</p>

          <div className="prose prose-lg max-w-none">
            {form.content_blocks_pt.map((block) => {
              switch (block.type) {
                case 'paragraph':
                  return <p key={block.id} className="mb-4 text-gray-700 leading-relaxed">{block.content}</p>;

                case 'heading':
                  const HeadingTag = `h${block.metadata?.level || 2}` as keyof JSX.IntrinsicElements;
                  return (
                    <HeadingTag key={block.id} className="font-bold text-gray-900 mb-4 mt-8">
                      {block.content}
                    </HeadingTag>
                  );

                case 'image':
                  return (
                    <figure key={block.id} className="my-8">
                      <img
                        src={block.content}
                        alt={block.metadata?.alt || ''}
                        className="w-full rounded-lg"
                      />
                      {block.metadata?.caption && (
                        <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
                          {block.metadata.caption}
                        </figcaption>
                      )}
                    </figure>
                  );

                case 'quote':
                  return (
                    <blockquote key={block.id} className="border-l-4 border-emerald-600 pl-6 py-4 my-6 italic text-gray-700 bg-gray-50">
                      {block.content}
                    </blockquote>
                  );

                case 'list':
                  return (
                    <ul key={block.id} className="list-disc pl-6 mb-4 space-y-2">
                      {block.metadata?.items?.map((item, idx) => (
                        <li key={idx} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  );

                case 'ordered-list':
                  return (
                    <ol key={block.id} className="list-decimal pl-6 mb-4 space-y-2">
                      {block.metadata?.items?.map((item, idx) => (
                        <li key={idx} className="text-gray-700">{item}</li>
                      ))}
                    </ol>
                  );

                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    );
  };

  if (!user) return null;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Artigos</h1>
            <p className="text-gray-600 mt-1">Crie e gerencie notícias e artigos do site</p>
          </div>
          {!showForm && (
            <button
              onClick={() => navigate('/admin/article/new')}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg font-bold"
            >
              <Plus className="w-5 h-5" />
              <span>Novo Artigo</span>
            </button>
          )}
        </div>

        {showForm ? (
          <div className="bg-white rounded-xl shadow-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? 'Editar Artigo' : 'Novo Artigo'}
                </h2>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-emerald-200 text-emerald-700 rounded-lg cursor-pointer hover:bg-emerald-50 transition-all shadow-sm">
                    <input
                      type="checkbox"
                      checked={autoTranslateEnabled}
                      onChange={(e) => setAutoTranslateEnabled(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-semibold">Tradução IA</span>
                  </label>
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="flex items-center space-x-2 px-4 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border-2 border-emerald-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-semibold">{previewMode ? 'Editar' : 'Visualizar'}</span>
                  </button>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Erro</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {autoTranslateEnabled && !editingId && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">Tradução Automática Ativada</p>
                    <p className="text-sm text-emerald-700">Digite em português e o conteúdo será traduzido automaticamente para russo e inglês.</p>
                  </div>
                </div>
              )}
            </div>

            {previewMode ? (
              <div className="p-6">
                {renderPreview()}
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={() => setPreviewMode(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    Voltar para Edição
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="border-b border-gray-200">
                  <div className="flex space-x-1 px-6 overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setActiveTab('info')}
                      className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors ${
                        activeTab === 'info'
                          ? 'border-b-3 border-emerald-600 text-emerald-700'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      📋 Informações
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('content-pt')}
                      className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors flex items-center space-x-2 ${
                        activeTab === 'content-pt'
                          ? 'border-b-3 border-emerald-600 text-emerald-700'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span>🇧🇷 Conteúdo PT</span>
                      {translating.blocks && <Loader className="w-4 h-4 animate-spin" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('content-ru')}
                      className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors ${
                        activeTab === 'content-ru'
                          ? 'border-b-3 border-emerald-600 text-emerald-700'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      🇷🇺 Conteúdo RU
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('content-en')}
                      className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors ${
                        activeTab === 'content-en'
                          ? 'border-b-3 border-emerald-600 text-emerald-700'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      🇺🇸 Conteúdo EN
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {activeTab === 'info' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Título (Português) *
                          </label>
                          <input
                            type="text"
                            value={form.title_pt}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Digite o título em português..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                            <span>Título (Russo)</span>
                            {translating.title && <Loader className="w-4 h-4 animate-spin text-emerald-600" />}
                          </label>
                          <input
                            type="text"
                            value={form.title_ru}
                            onChange={(e) => setForm({ ...form, title_ru: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-gradient-to-r from-emerald-50 to-white"
                            placeholder={autoTranslateEnabled ? "Traduzindo..." : "Título em russo"}
                            readOnly={autoTranslateEnabled}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                            <span>Título (Inglês)</span>
                            {translating.title && <Loader className="w-4 h-4 animate-spin text-emerald-600" />}
                          </label>
                          <input
                            type="text"
                            value={form.title_en}
                            onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-gradient-to-r from-emerald-50 to-white"
                            placeholder={autoTranslateEnabled ? "Traduzindo..." : "Título em inglês"}
                            readOnly={autoTranslateEnabled}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Categoria *
                          </label>
                          <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Autor *
                          </label>
                          <input
                            type="text"
                            value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Nome do autor"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tempo de Leitura *
                          </label>
                          <input
                            type="text"
                            value={form.read_time}
                            onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                            required
                            placeholder="5 min"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Resumo (Português) *
                        </label>
                        <textarea
                          value={form.excerpt_pt}
                          onChange={(e) => handleExcerptChange(e.target.value)}
                          required
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                          placeholder="Breve resumo do artigo..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                            <span>Resumo (Russo)</span>
                            {translating.excerpt && <Loader className="w-4 h-4 animate-spin text-emerald-600" />}
                          </label>
                          <textarea
                            value={form.excerpt_ru}
                            onChange={(e) => setForm({ ...form, excerpt_ru: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none bg-gradient-to-r from-emerald-50 to-white"
                            placeholder={autoTranslateEnabled ? "Traduzindo..." : "Resumo em russo"}
                            readOnly={autoTranslateEnabled}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                            <span>Resumo (Inglês)</span>
                            {translating.excerpt && <Loader className="w-4 h-4 animate-spin text-emerald-600" />}
                          </label>
                          <textarea
                            value={form.excerpt_en}
                            onChange={(e) => setForm({ ...form, excerpt_en: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none bg-gradient-to-r from-emerald-50 to-white"
                            placeholder={autoTranslateEnabled ? "Traduzindo..." : "Resumo em inglês"}
                            readOnly={autoTranslateEnabled}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Imagem de Capa *
                        </label>
                        <ImageUpload
                          onImageSelect={setSelectedImage}
                          currentImage={form.image_url}
                          uploading={uploadingImage}
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'content-pt' && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Conteúdo em Português</h3>
                        {translating.blocks && (
                          <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full">
                            <Loader className="w-4 h-4 animate-spin" />
                            <span className="text-sm font-semibold">Traduzindo...</span>
                          </div>
                        )}
                      </div>
                      <BlockEditor
                        blocks={form.content_blocks_pt}
                        onChange={handleContentBlocksChange}
                        onImageUpload={uploadImage}
                      />
                    </div>
                  )}

                  {activeTab === 'content-ru' && (
                    <div>
                      {autoTranslateEnabled && (
                        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-2 text-emerald-800">
                            <Sparkles className="w-5 h-5" />
                            <p className="text-sm font-semibold">
                              Traduzido automaticamente do português. Pode editar se necessário.
                            </p>
                          </div>
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Conteúdo em Russo</h3>
                      <BlockEditor
                        blocks={form.content_blocks_ru}
                        onChange={(blocks) => setForm({ ...form, content_blocks_ru: blocks })}
                        onImageUpload={uploadImage}
                      />
                    </div>
                  )}

                  {activeTab === 'content-en' && (
                    <div>
                      {autoTranslateEnabled && (
                        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center space-x-2 text-emerald-800">
                            <Sparkles className="w-5 h-5" />
                            <p className="text-sm font-semibold">
                              Traduzido automaticamente do português. Pode editar se necessário.
                            </p>
                          </div>
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Conteúdo em Inglês</h3>
                      <BlockEditor
                        blocks={form.content_blocks_en}
                        onChange={(blocks) => setForm({ ...form, content_blocks_en: blocks })}
                        onImageUpload={uploadImage}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-emerald-50 border-t-2 border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setForm(emptyForm);
                      setError(null);
                    }}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, false)}
                    disabled={loading || translating.title || translating.excerpt || translating.blocks}
                    className="flex items-center space-x-2 px-6 py-3 border-2 border-emerald-600 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    <Save className="w-5 h-5" />
                    <span>
                      {loading ? 'Salvando...' :
                       (translating.title || translating.excerpt || translating.blocks) ? 'Traduzindo...' :
                       'Salvar Rascunho'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={loading || translating.title || translating.excerpt || translating.blocks}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                  >
                    <Eye className="w-5 h-5" />
                    <span>
                      {loading ? 'Publicando...' :
                       (translating.title || translating.excerpt || translating.blocks) ? 'Traduzindo...' :
                       'Publicar Artigo'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <>
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all font-semibold ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all font-semibold ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <div key={article.id} className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:border-emerald-300 transition-all">
                  <img
                    src={article.image_url}
                    alt={article.title_pt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 rounded-full text-xs font-bold">
                        {article.category}
                      </span>
                      {!article.is_published && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                          Rascunho
                        </span>
                      )}
                      <span className="font-medium">{article.read_time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {article.title_pt}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt_pt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                      <span className="text-sm text-gray-500 font-medium">{article.author}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/admin/article/${article.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {articles.length === 0 && (
              <div className="text-center py-16 bg-gradient-to-br from-white to-emerald-50 rounded-xl border-2 border-gray-200">
                <p className="text-gray-500 text-xl font-semibold">Nenhum artigo encontrado</p>
                <p className="text-gray-400 mt-2">Clique em "Novo Artigo" para criar o primeiro</p>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Eye, X, Loader, Languages, Globe } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { AdminLayout } from '../../components/AdminLayout';
import { BlockEditor, ContentBlock } from '../../components/BlockEditor';
import { ImageUpload } from '../../components/ImageUpload';

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

export default function ArticleEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState<ArticleForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pt' | 'ru' | 'en'>('pt');
  const [translating, setTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState('');
  const [autoTranslateTimeout, setAutoTranslateTimeout] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [blockImages, setBlockImages] = useState<Map<string, File>>(new Map());

  const categories = ['Comércio', 'Indústria', 'Cultura', 'Turismo', 'Tecnologia', 'Inovação'];

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (id) {
      loadArticle(id);
    }
  }, [user, navigate, id]);

  const loadArticle = async (articleId: string) => {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .maybeSingle();

    if (data) {
      setForm({
        title_pt: data.title_pt,
        title_ru: data.title_ru || '',
        title_en: data.title_en || '',
        excerpt_pt: data.excerpt_pt,
        excerpt_ru: data.excerpt_ru || '',
        excerpt_en: data.excerpt_en || '',
        content_blocks_pt: data.content_blocks_pt || [],
        content_blocks_ru: data.content_blocks_ru || [],
        content_blocks_en: data.content_blocks_en || [],
        category: data.category,
        author: data.author,
        image_url: data.image_url,
        read_time: data.read_time,
      });
    }
  };

  const translateText = async (
    text: string,
    targetLang: 'ru' | 'en',
    contentType: 'title' | 'content' | 'excerpt' = 'content'
  ): Promise<string> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Não autenticado');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate-content`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            targetLanguage: targetLang,
            contentType
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro na tradução');
      }

      const data = await response.json();
      return data.translatedText;
    } catch (error: any) {
      console.error('Translation error:', error);
      throw new Error(error.message || 'Falha na tradução');
    }
  };

  const handleAutoTranslate = async () => {
    if (!form.title_pt || translating) return;

    setTranslating(true);
    setError(null);

    try {
      setTranslationProgress('Traduzindo título...');
      const [titleRu, titleEn] = await Promise.all([
        translateText(form.title_pt, 'ru', 'title'),
        translateText(form.title_pt, 'en', 'title'),
      ]);
      setForm(prev => ({ ...prev, title_ru: titleRu, title_en: titleEn }));

      if (form.excerpt_pt) {
        setTranslationProgress('Traduzindo resumo...');
        const [excerptRu, excerptEn] = await Promise.all([
          translateText(form.excerpt_pt, 'ru', 'excerpt'),
          translateText(form.excerpt_pt, 'en', 'excerpt'),
        ]);
        setForm(prev => ({ ...prev, excerpt_ru: excerptRu, excerpt_en: excerptEn }));
      }

      if (form.content_blocks_pt.length > 0) {
        setTranslationProgress('Traduzindo conteúdo...');
        const blocksRu: ContentBlock[] = [];
        const blocksEn: ContentBlock[] = [];

        for (const block of form.content_blocks_pt) {
          if (block.type === 'image') {
            blocksRu.push(block);
            blocksEn.push(block);
          } else {
            const [contentRu, contentEn] = await Promise.all([
              translateText(block.content, 'ru', 'content'),
              translateText(block.content, 'en', 'content'),
            ]);
            blocksRu.push({ ...block, content: contentRu });
            blocksEn.push({ ...block, content: contentEn });
          }
        }

        setForm(prev => ({
          ...prev,
          content_blocks_ru: blocksRu,
          content_blocks_en: blocksEn,
        }));
      }

      setTranslationProgress('Tradução concluída!');
      setTimeout(() => setTranslationProgress(''), 2000);
    } catch (error: any) {
      console.error('Translation failed:', error);
      setError(`Erro na tradução: ${error.message}`);
    } finally {
      setTranslating(false);
    }
  };

  useEffect(() => {
    if (autoTranslateTimeout) {
      clearTimeout(autoTranslateTimeout);
    }

    if (form.title_pt && !translating) {
      const timeout = setTimeout(() => {
        handleAutoTranslate();
      }, 2000);
      setAutoTranslateTimeout(timeout);
    }

    return () => {
      if (autoTranslateTimeout) {
        clearTimeout(autoTranslateTimeout);
      }
    };
  }, [form.title_pt, form.excerpt_pt, form.content_blocks_pt]);

  const uploadImage = async (file: File): Promise<string> => {
    try {
      console.log('Starting upload for file:', file.name, 'size:', file.size);

      // Validate file size (10MB max)
      if (file.size > 10485760) {
        throw new Error('Arquivo muito grande. Tamanho máximo: 10MB');
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Tipo de arquivo inválido. Use: JPG, PNG, GIF ou WEBP');
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName; // Remove 'articles/' subfolder

      console.log('Uploading to path:', filePath);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw new Error(uploadError.message || 'Erro ao fazer upload');
      }

      console.log('Upload successful, getting public URL');

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);
      return publicUrl;
    } catch (error: any) {
      console.error('Upload error:', error);
      throw new Error(`Erro ao fazer upload da imagem: ${error.message || 'Erro desconhecido'}`);
    }
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBlockImageSelect = (blockId: string, file: File) => {
    const newBlockImages = new Map(blockImages);
    newBlockImages.set(blockId, file);
    setBlockImages(newBlockImages);
  };

  const uploadBlockImages = async (blocks: ContentBlock[]): Promise<ContentBlock[]> => {
    const updatedBlocks = [];

    for (const block of blocks) {
      if (block.type === 'image' && block.content.startsWith('data:')) {
        // This is a base64 image (not uploaded yet)
        const file = blockImages.get(block.id);
        if (file) {
          try {
            const url = await uploadImage(file);
            updatedBlocks.push({ ...block, content: url, metadata: { ...block.metadata, isLocalFile: undefined } });
          } catch (error) {
            console.error('Error uploading block image:', error);
            throw error;
          }
        } else {
          updatedBlocks.push(block);
        }
      } else {
        updatedBlocks.push(block);
      }
    }

    return updatedBlocks;
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (publish: boolean = false) => {
    if (!form.title_pt || !form.excerpt_pt || !form.author) {
      alert('Preencha todos os campos obrigatórios (Título PT, Resumo PT, Autor)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let imageUrl = form.image_url;

      // Upload main article image if selected
      if (selectedImage) {
        setUploadingImage(true);
        try {
          imageUrl = await uploadImage(selectedImage);
        } catch (uploadError: any) {
          setUploadingImage(false);
          throw new Error(`Erro no upload da imagem: ${uploadError.message}`);
        }
        setUploadingImage(false);
      }

      // Upload all block images for each language
      const contentBlocksPt = await uploadBlockImages(form.content_blocks_pt);
      const contentBlocksRu = await uploadBlockImages(form.content_blocks_ru);
      const contentBlocksEn = await uploadBlockImages(form.content_blocks_en);

      // Generate slug from title
      const slug = generateSlug(form.title_pt);

      const articleData = {
        ...form,
        slug,
        content_blocks_pt: contentBlocksPt,
        content_blocks_ru: contentBlocksRu,
        content_blocks_en: contentBlocksEn,
        image_url: imageUrl,
        status: publish ? 'published' : 'draft',
        is_published: publish,
        published_at: publish ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
      };

      if (id) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);

        if (error) throw error;
      }

      navigate('/admin');
    } catch (error: any) {
      console.error('Save error:', error);
      setError(`Erro ao salvar: ${error.message}`);
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {id ? 'Editar Artigo' : 'Criar Novo Artigo'}
            </h1>
            <p className="text-gray-600">
              Editor multilíngue com tradução automática via IA
            </p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
            <span>Fechar</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
              {/* Tabs Header */}
              <div className="flex border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <button
                  onClick={() => setActiveTab('pt')}
                  className={`flex-1 px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                    activeTab === 'pt'
                      ? 'bg-white text-gray-700 border-b-4 border-gray-700 -mb-0.5'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  <span>PT</span>
                  {translating && activeTab === 'pt' && (
                    <Loader className="w-4 h-4 animate-spin" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('ru')}
                  className={`flex-1 px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                    activeTab === 'ru'
                      ? 'bg-white text-blue-600 border-b-4 border-blue-600 -mb-0.5'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  <span>RU</span>
                  {form.title_ru && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                </button>
                <button
                  onClick={() => setActiveTab('en')}
                  className={`flex-1 px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                    activeTab === 'en'
                      ? 'bg-white text-orange-600 border-b-4 border-orange-600 -mb-0.5'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  <span>EN</span>
                  {form.title_en && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                </button>
              </div>

              {/* Translation Progress */}
              {translationProgress && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200 flex items-center space-x-3">
                  <Languages className="w-5 h-5 text-blue-600 animate-pulse" />
                  <span className="font-semibold text-blue-800">{translationProgress}</span>
                </div>
              )}

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'pt' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Título
                      </label>
                      <input
                        type="text"
                        value={form.title_pt}
                        onChange={(e) => setForm({ ...form, title_pt: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-4 focus:ring-emerald-100 transition-all text-xl font-bold"
                        placeholder="Digite o título do artigo..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Resumo
                      </label>
                      <textarea
                        value={form.excerpt_pt}
                        onChange={(e) => setForm({ ...form, excerpt_pt: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-4 focus:ring-emerald-100 transition-all resize-none"
                        placeholder="Escreva um resumo envolvente do artigo..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Conteúdo
                      </label>
                      <BlockEditor
                        blocks={form.content_blocks_pt}
                        onChange={(blocks) => setForm({ ...form, content_blocks_pt: blocks })}
                        onImageSelect={handleBlockImageSelect}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'ru' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Заголовок (Título)
                      </label>
                      <input
                        type="text"
                        value={form.title_ru}
                        onChange={(e) => setForm({ ...form, title_ru: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-xl font-bold"
                        placeholder="Заголовок статьи..."
                        disabled={translating}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Резюме (Resumo)
                      </label>
                      <textarea
                        value={form.excerpt_ru}
                        onChange={(e) => setForm({ ...form, excerpt_ru: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                        placeholder="Краткое содержание статьи..."
                        disabled={translating}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Содержание (Conteúdo)
                      </label>
                      <BlockEditor
                        blocks={form.content_blocks_ru}
                        onChange={(blocks) => setForm({ ...form, content_blocks_ru: blocks })}
                        onImageSelect={handleBlockImageSelect}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'en' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Title (Título)
                      </label>
                      <input
                        type="text"
                        value={form.title_en}
                        onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-xl font-bold"
                        placeholder="Article title..."
                        disabled={translating}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Summary (Resumo)
                      </label>
                      <textarea
                        value={form.excerpt_en}
                        onChange={(e) => setForm({ ...form, excerpt_en: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
                        placeholder="Write an engaging article summary..."
                        disabled={translating}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Content (Conteúdo)
                      </label>
                      <BlockEditor
                        blocks={form.content_blocks_en}
                        onChange={(blocks) => setForm({ ...form, content_blocks_en: blocks })}
                        onImageSelect={handleBlockImageSelect}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Configurações</h3>

              <div className="space-y-5">
                <div>
                  <ImageUpload
                    onImageSelect={handleImageSelect}
                    currentImageUrl={imagePreview || form.image_url}
                    onRemove={() => {
                      setSelectedImage(null);
                      setImagePreview('');
                      setForm({ ...form, image_url: '' });
                    }}
                  />
                  {uploadingImage && (
                    <div className="mt-2 flex items-center space-x-2 text-sm text-blue-600">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Enviando imagem...</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Categoria
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-emerald-200 transition-all font-medium"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                    placeholder="Nome do autor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Tempo de Leitura
                  </label>
                  <input
                    type="text"
                    value={form.read_time}
                    onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                    placeholder="Ex: 5 min"
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-3">
                <button
                  onClick={() => setShowPreview(true)}
                  disabled={!form.title_pt || translating}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-lg"
                >
                  <Eye className="w-5 h-5" />
                  <span>Visualizar Preview</span>
                </button>

                <button
                  onClick={() => handleSubmit(true)}
                  disabled={loading || translating || uploadingImage}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-lg"
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  <span>
                    {uploadingImage ? 'Enviando imagem...' : loading ? 'Publicando...' : 'Publicar Artigo'}
                  </span>
                </button>

                <button
                  onClick={() => handleSubmit(false)}
                  disabled={loading || translating || uploadingImage}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  <span>Salvar como Rascunho</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-gray-900">Preview do Artigo</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveTab('pt')}
                      className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        activeTab === 'pt' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      PT
                    </button>
                    <button
                      onClick={() => setActiveTab('ru')}
                      className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        activeTab === 'ru' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      RU
                    </button>
                    <button
                      onClick={() => setActiveTab('en')}
                      className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        activeTab === 'en' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8">
                {(imagePreview || form.image_url) && (
                  <img
                    src={imagePreview || form.image_url}
                    alt="Cover"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}

                <div className="mb-4 flex items-center space-x-4 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-gray-200 text-gray-900 rounded-full font-semibold">
                    {form.category}
                  </span>
                  <span>{form.read_time}</span>
                  <span>{form.author}</span>
                </div>

                {activeTab === 'pt' && (
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{form.title_pt || 'Sem título'}</h1>
                    <p className="text-xl text-gray-600 mb-8">{form.excerpt_pt || 'Sem resumo'}</p>
                    <div className="prose prose-lg max-w-none">
                      {form.content_blocks_pt.map((block, idx) => (
                        <div key={idx} className="mb-4">
                          {block.type === 'paragraph' && <p>{block.content}</p>}
                          {block.type === 'heading' && <h2 className="text-2xl font-bold mt-8 mb-4">{block.content}</h2>}
                          {block.type === 'image' && (
                            <img src={block.content} alt="" className="w-full rounded-lg" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'ru' && (
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{form.title_ru || 'Без заголовка'}</h1>
                    <p className="text-xl text-gray-600 mb-8">{form.excerpt_ru || 'Без резюме'}</p>
                    <div className="prose prose-lg max-w-none">
                      {form.content_blocks_ru.map((block, idx) => (
                        <div key={idx} className="mb-4">
                          {block.type === 'paragraph' && <p>{block.content}</p>}
                          {block.type === 'heading' && <h2 className="text-2xl font-bold mt-8 mb-4">{block.content}</h2>}
                          {block.type === 'image' && (
                            <img src={block.content} alt="" className="w-full rounded-lg" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'en' && (
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{form.title_en || 'No title'}</h1>
                    <p className="text-xl text-gray-600 mb-8">{form.excerpt_en || 'No summary'}</p>
                    <div className="prose prose-lg max-w-none">
                      {form.content_blocks_en.map((block, idx) => (
                        <div key={idx} className="mb-4">
                          {block.type === 'paragraph' && <p>{block.content}</p>}
                          {block.type === 'heading' && <h2 className="text-2xl font-bold mt-8 mb-4">{block.content}</h2>}
                          {block.type === 'image' && (
                            <img src={block.content} alt="" className="w-full rounded-lg" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

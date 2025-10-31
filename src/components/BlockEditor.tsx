import { useState } from 'react';
import { Plus, GripVertical, Trash2, Image as ImageIcon, Type, AlignLeft, Quote, List, ListOrdered, ChevronUp, ChevronDown } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

export interface ContentBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'ordered-list';
  content: string;
  metadata?: {
    level?: number;
    alt?: string;
    caption?: string;
    items?: string[];
  };
}

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  onImageUpload?: (file: File) => Promise<string>;
  onImageSelect?: (blockId: string, file: File) => void;
}

export const BlockEditor = ({ blocks, onChange, onImageUpload, onImageSelect }: BlockEditorProps) => {
  const [pendingImages, setPendingImages] = useState<Map<string, File>>(new Map());

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: '',
      metadata: type === 'heading' ? { level: 2 } : type === 'list' || type === 'ordered-list' ? { items: [''] } : {},
    };
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    onChange(blocks.map(block => block.id === id ? { ...block, ...updates } : block));
  };

  const deleteBlock = (id: string) => {
    onChange(blocks.filter(block => block.id !== id));
    const newPendingImages = new Map(pendingImages);
    newPendingImages.delete(id);
    setPendingImages(newPendingImages);
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(block => block.id === id);
    if (index === -1) return;

    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      onChange(newBlocks);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      onChange(newBlocks);
    }
  };

  const handleImageSelect = (blockId: string, file: File) => {
    // Store file locally and create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      // Save preview as base64 temporarily
      updateBlock(blockId, {
        content: reader.result as string,
        metadata: { ...blocks.find(b => b.id === blockId)?.metadata, isLocalFile: true }
      });
    };
    reader.readAsDataURL(file);

    // Store file for later upload
    const newPendingImages = new Map(pendingImages);
    newPendingImages.set(blockId, file);
    setPendingImages(newPendingImages);

    // Notify parent if callback provided
    if (onImageSelect) {
      onImageSelect(blockId, file);
    }
  };

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder="Digite o parágrafo..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent resize-none"
            rows={4}
          />
        );

      case 'heading':
        return (
          <div className="space-y-2">
            <select
              value={block.metadata?.level || 2}
              onChange={(e) => updateBlock(block.id, {
                metadata: { ...block.metadata, level: parseInt(e.target.value) }
              })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
            >
              <option value={1}>Título H1</option>
              <option value={2}>Título H2</option>
              <option value={3}>Título H3</option>
            </select>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Digite o título..."
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 font-bold ${
                block.metadata?.level === 1 ? 'text-3xl' : block.metadata?.level === 2 ? 'text-2xl' : 'text-xl'
              }`}
            />
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            {block.content ? (
              <div className="relative">
                <img
                  src={block.content}
                  alt={block.metadata?.alt || 'Imagem do artigo'}
                  className="w-full rounded-lg border border-gray-300"
                />
                <button
                  onClick={() => updateBlock(block.id, { content: '' })}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <ImageUpload
                  onImageSelect={(file) => handleImageSelect(block.id, file)}
                  currentImage={block.content}
                />
              </div>
            )}
            <input
              type="text"
              value={block.metadata?.alt || ''}
              onChange={(e) => updateBlock(block.id, {
                metadata: { ...block.metadata, alt: e.target.value }
              })}
              placeholder="Texto alternativo (ALT)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
            />
            <input
              type="text"
              value={block.metadata?.caption || ''}
              onChange={(e) => updateBlock(block.id, {
                metadata: { ...block.metadata, caption: e.target.value }
              })}
              placeholder="Legenda da imagem (opcional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
            />
          </div>
        );

      case 'quote':
        return (
          <div className="relative">
            <Quote className="absolute left-4 top-4 w-6 h-6 text-gray-300" />
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Digite a citação..."
              className="w-full pl-14 pr-4 py-4 border-l-4 border-gray-600 bg-gray-50 rounded-lg focus:ring-2 focus:ring-gray-600 italic resize-none"
              rows={3}
            />
          </div>
        );

      case 'list':
      case 'ordered-list':
        return (
          <div className="space-y-2">
            {(block.metadata?.items || ['']).map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="text-gray-500 font-medium min-w-[24px]">
                  {block.type === 'ordered-list' ? `${idx + 1}.` : '•'}
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...(block.metadata?.items || [''])];
                    newItems[idx] = e.target.value;
                    updateBlock(block.id, {
                      metadata: { ...block.metadata, items: newItems }
                    });
                  }}
                  placeholder={`Item ${idx + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
                />
                {idx > 0 && (
                  <button
                    onClick={() => {
                      const newItems = (block.metadata?.items || ['']).filter((_, i) => i !== idx);
                      updateBlock(block.id, {
                        metadata: { ...block.metadata, items: newItems }
                      });
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                const newItems = [...(block.metadata?.items || ['']), ''];
                updateBlock(block.id, {
                  metadata: { ...block.metadata, items: newItems }
                });
              }}
              className="text-sm text-gray-900 hover:text-gray-800 font-medium"
            >
              + Adicionar item
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const blockTypeLabels = {
    paragraph: 'Parágrafo',
    heading: 'Título',
    image: 'Imagem',
    quote: 'Citação',
    list: 'Lista',
    'ordered-list': 'Lista numerada',
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {blocks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <AlignLeft className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">Nenhum conteúdo adicionado</p>
            <p className="text-sm">Clique nos botões abaixo para começar a criar seu artigo</p>
          </div>
        ) : (
          blocks.map((block, index) => (
            <div key={block.id} className="group relative bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-gray-600 transition-all">
              <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                  <span className="text-sm font-medium text-gray-700">
                    {blockTypeLabels[block.type]}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => moveBlock(block.id, 'up')}
                    disabled={index === 0}
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Mover para cima"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveBlock(block.id, 'down')}
                    disabled={index === blocks.length - 1}
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Mover para baixo"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteBlock(block.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                    title="Excluir bloco"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                {renderBlockEditor(block, index)}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-300 p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Adicionar novo bloco:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => addBlock('paragraph')}
            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-600 hover:bg-gray-100 transition-all"
          >
            <AlignLeft className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">Parágrafo</span>
          </button>
          <button
            onClick={() => addBlock('heading')}
            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-600 hover:bg-gray-100 transition-all"
          >
            <Type className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">Título</span>
          </button>
          <button
            onClick={() => addBlock('image')}
            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-600 hover:bg-gray-100 transition-all"
          >
            <ImageIcon className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">Imagem</span>
          </button>
          <button
            onClick={() => addBlock('quote')}
            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-600 hover:bg-gray-100 transition-all"
          >
            <Quote className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">Citação</span>
          </button>
          <button
            onClick={() => addBlock('list')}
            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-600 hover:bg-gray-100 transition-all"
          >
            <List className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">Lista</span>
          </button>
          <button
            onClick={() => addBlock('ordered-list')}
            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-600 hover:bg-gray-100 transition-all"
          >
            <ListOrdered className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">Numerada</span>
          </button>
        </div>
      </div>
    </div>
  );
};

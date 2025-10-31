import { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit2, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AdminLayout } from '../../components/AdminLayout';
import { ImageUpload } from '../../components/ImageUpload';

interface Event {
  id: string;
  title_pt: string;
  title_ru: string | null;
  title_en: string | null;
  description_pt: string;
  description_ru: string | null;
  description_en: string | null;
  location: string;
  event_date: string;
  end_date: string | null;
  image_url: string | null;
  is_paid: boolean;
  price: number | null;
  max_attendees: number | null;
  is_members_only: boolean;
  created_at: string;
}

interface EventForm {
  title_pt: string;
  description_pt: string;
  location: string;
  event_date: string;
  end_date: string;
  image_url: string;
  is_paid: boolean;
  price: string;
  max_attendees: string;
  is_members_only: boolean;
}

const emptyForm: EventForm = {
  title_pt: '',
  description_pt: '',
  location: '',
  event_date: '',
  end_date: '',
  image_url: '',
  is_paid: false,
  price: '',
  max_attendees: '',
  is_members_only: false,
};

export const EventsAdminPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventForm>(emptyForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: false });

    if (data) setEvents(data);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `events/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.image_url;

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const eventData = {
        title_pt: form.title_pt,
        description_pt: form.description_pt,
        location: form.location,
        event_date: form.event_date,
        end_date: form.end_date || null,
        image_url: imageUrl || null,
        is_paid: form.is_paid,
        price: form.price ? parseFloat(form.price) : null,
        max_attendees: form.max_attendees ? parseInt(form.max_attendees) : null,
        is_members_only: form.is_members_only,
      };

      if (editingId) {
        await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingId);
      } else {
        await supabase
          .from('events')
          .insert([eventData]);
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      setSelectedImage(null);
      fetchEvents();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar evento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setForm({
      title_pt: event.title_pt,
      description_pt: event.description_pt,
      location: event.location,
      event_date: event.event_date.split('T')[0],
      end_date: event.end_date ? event.end_date.split('T')[0] : '',
      image_url: event.image_url || '',
      is_paid: event.is_paid,
      price: event.price?.toString() || '',
      max_attendees: event.max_attendees?.toString() || '',
      is_members_only: event.is_members_only,
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return;

    const { error } = await supabase.from('events').delete().eq('id', id);

    if (error) {
      console.error('Erro ao excluir:', error);
      alert('Erro ao excluir evento. Por favor, tente novamente.');
    } else {
      alert('Evento excluído com sucesso!');
      fetchEvents();
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Eventos</h1>
            <p className="text-gray-600">Crie e gerencie eventos da câmara</p>
          </div>
          <button
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
              setSelectedImage(null);
              setShowForm(true);
            }}
            className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Evento
          </button>
        </div>

        <div className="grid gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title_pt}</h3>
                  <p className="text-gray-600 mb-4">{event.description_pt}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>📍 {event.location}</span>
                    <span>📅 {new Date(event.event_date).toLocaleDateString('pt-BR')}</span>
                    {event.is_paid && <span>💰 R$ {event.price}</span>}
                    {event.max_attendees && <span>👥 Máx: {event.max_attendees}</span>}
                    {event.is_members_only && <span className="text-gray-700 font-medium">Apenas Membros</span>}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">Nenhum evento cadastrado</p>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Editar Evento' : 'Novo Evento'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={form.title_pt}
                  onChange={(e) => setForm({ ...form, title_pt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={form.description_pt}
                  onChange={(e) => setForm({ ...form, description_pt: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Local</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data do Evento</label>
                  <input
                    type="date"
                    value={form.event_date}
                    onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Término (opcional)</label>
                  <input
                    type="date"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  />
                </div>
              </div>

              <ImageUpload
                onImageSelect={(file) => setSelectedImage(file)}
                currentImageUrl={form.image_url}
                onRemove={() => {
                  setSelectedImage(null);
                  setForm({ ...form, image_url: '' });
                }}
              />

              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.is_paid}
                    onChange={(e) => setForm({ ...form, is_paid: e.target.checked })}
                    className="w-4 h-4 text-gray-700 border-gray-300 rounded focus:ring-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Evento Pago</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.is_members_only}
                    onChange={(e) => setForm({ ...form, is_members_only: e.target.checked })}
                    className="w-4 h-4 text-gray-700 border-gray-300 rounded focus:ring-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Apenas para Membros</span>
                </label>
              </div>

              {form.is_paid && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Máx. Participantes</label>
                    <input
                      type="number"
                      value={form.max_attendees}
                      onChange={(e) => setForm({ ...form, max_attendees: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? 'Salvando...' : 'Salvar Evento'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedImage(null);
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

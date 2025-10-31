import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

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
}

export const EventsPage = () => {
  const { language, t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });

    if (data) setEvents(data);
  };

  const getTitle = (event: Event) => {
    return language === 'pt' ? event.title_pt :
           language === 'ru' ? (event.title_ru || event.title_pt) :
           (event.title_en || event.title_pt);
  };

  const getDescription = (event: Event) => {
    return language === 'pt' ? event.description_pt :
           language === 'ru' ? (event.description_ru || event.description_pt) :
           (event.description_en || event.description_pt);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.events')}</h1>
          <p className="text-xl text-gray-600">Participe dos nossos eventos e amplie sua rede de contatos</p>
        </div>

        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 h-64 md:h-auto">
                  <img
                    src={event.image_url || 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    alt={getTitle(event)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:w-2/3">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {event.is_paid ? `R$ ${event.price}` : 'Gratuito'}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{getTitle(event)}</h2>
                  <p className="text-gray-600 mb-6">{getDescription(event)}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-gray-900" />
                      <span>
                        {new Date(event.event_date).toLocaleDateString(language, {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Clock className="w-5 h-5 text-gray-900" />
                      <span>
                        {new Date(event.event_date).toLocaleTimeString(language, {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-gray-900" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Nenhum evento disponível no momento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

export const ContactPage = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    if (!error) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">{t('contact.title')}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            {language === 'pt' ? 'Estamos aqui para ajudar sua empresa' :
             language === 'ru' ? 'Мы здесь, чтобы помочь вашей компании' :
             'We are here to help your company'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              {submitted && (
                <div className="mb-6 p-4 bg-gray-200 text-gray-800 rounded-lg">
                  {language === 'pt' ? 'Mensagem enviada com sucesso! Entraremos em contato em breve.' :
                   language === 'ru' ? 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.' :
                   'Message sent successfully! We will contact you soon.'}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.name')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.company')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.subject')} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                >
                  {t('contact.submit')}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Informações de Contato' :
                 language === 'ru' ? 'Контактная информация' :
                 'Contact Information'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {language === 'pt' ? 'Endereço' :
                       language === 'ru' ? 'Адрес' :
                       'Address'}
                    </div>
                    <div className="text-gray-600 text-sm">Av. Paulista, 1000 - São Paulo, SP</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {language === 'pt' ? 'Telefone' :
                       language === 'ru' ? 'Телефон' :
                       'Phone'}
                    </div>
                    <div className="text-gray-600 text-sm">+55 (11) 3000-0000</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">E-mail</div>
                    <div className="text-gray-600 text-sm">contato@ccbr.org.br</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Horário de Atendimento' :
                 language === 'ru' ? 'Часы работы' :
                 'Business Hours'}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'pt' ? 'Segunda - Sexta' :
                     language === 'ru' ? 'Понедельник - Пятница' :
                     'Monday - Friday'}
                  </span>
                  <span className="font-medium text-gray-900">9h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'pt' ? 'Sábado' :
                     language === 'ru' ? 'Суббота' :
                     'Saturday'}
                  </span>
                  <span className="font-medium text-gray-900">9h - 13h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'pt' ? 'Domingo' :
                     language === 'ru' ? 'Воскресенье' :
                     'Sunday'}
                  </span>
                  <span className="font-medium text-gray-900">
                    {language === 'pt' ? 'Fechado' :
                     language === 'ru' ? 'Закрыто' :
                     'Closed'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, FormEvent } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { CheckCircle2, Building2, Users, TrendingUp, Handshake, Globe2, Award } from 'lucide-react';

export const MembershipPage = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    razao_social: '',
    documento: '',
    tipo_documento: 'CNPJ',
    email: '',
    telefone: '',
    endereco: '',
    complemento: '',
    cidade: '',
    estado: '',
    pais: 'Brasil',
    cep: '',
    filiais: '',
    linha_producao: '',
    representante: '',
    cargo: '',
    observacoes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('membership_applications')
        .insert([formData]);

      if (submitError) throw submitError;

      setSubmitSuccess(true);
      setFormData({
        razao_social: '',
        documento: '',
        tipo_documento: 'CNPJ',
        email: '',
        telefone: '',
        endereco: '',
        complemento: '',
        cidade: '',
        estado: '',
        pais: 'Brasil',
        cep: '',
        filiais: '',
        linha_producao: '',
        representante: '',
        cargo: '',
        observacoes: ''
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar solicitação');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Building2,
      title_pt: 'Imagem Institucional',
      title_ru: 'Институциональный имидж',
      title_en: 'Institutional Image',
      desc_pt: 'Associe sua empresa a uma organização sólida e prestigiada há mais de 40 anos.',
      desc_ru: 'Свяжите свою компанию с солидной и престижной организацией с более чем 40-летней историей.',
      desc_en: 'Associate your company with a solid and prestigious organization with over 40 years of history.'
    },
    {
      icon: TrendingUp,
      title_pt: 'Promoção de Negócios',
      title_ru: 'Продвижение бизнеса',
      title_en: 'Business Promotion',
      desc_pt: 'Encurte etapas operacionais usando nossa rede de contatos com órgãos estatais e empresariais.',
      desc_ru: 'Сократите операционные этапы, используя нашу сеть контактов с государственными и бизнес-организациями.',
      desc_en: 'Shorten operational steps using our network of contacts with government and business organizations.'
    },
    {
      icon: Users,
      title_pt: 'Comunicação e Marketing',
      title_ru: 'Коммуникация и маркетинг',
      title_en: 'Communication and Marketing',
      desc_pt: 'Divulgue seu perfil em nossas ferramentas de mídia: site, newsletter e eventos.',
      desc_ru: 'Продвигайте свой профиль через наши медиа-инструменты: сайт, рассылки и мероприятия.',
      desc_en: 'Promote your profile through our media tools: website, newsletter, and events.'
    },
    {
      icon: Handshake,
      title_pt: 'Participação em Eventos',
      title_ru: 'Участие в мероприятиях',
      title_en: 'Event Participation',
      desc_pt: 'Participe de conferências, seminários e fóruns, geralmente sem custos de inscrição.',
      desc_ru: 'Участвуйте в конференциях, семинарах и форумах, обычно бесплатно.',
      desc_en: 'Participate in conferences, seminars, and forums, usually free of charge.'
    },
    {
      icon: Globe2,
      title_pt: 'Acesso à Informação',
      title_ru: 'Доступ к информации',
      title_en: 'Access to Information',
      desc_pt: 'Receba aconselhamento sobre características culturais, sociais e legais.',
      desc_ru: 'Получите консультации о культурных, социальных и правовых особенностях.',
      desc_en: 'Receive advice on cultural, social, and legal characteristics.'
    },
    {
      icon: Award,
      title_pt: 'Descontos de até 40%',
      title_ru: 'Скидки до 40%',
      title_en: 'Discounts up to 40%',
      desc_pt: 'Economize em traduções, rodadas de negócio e pesquisas de mercado.',
      desc_ru: 'Экономьте на переводах, деловых встречах и исследованиях рынка.',
      desc_en: 'Save on translations, business rounds, and market research.'
    }
  ];

  const texts = {
    pt: {
      title: 'Associe-se à Câmara Brasil-Rússia',
      subtitle: 'Mais de 40 anos promovendo relações comerciais entre Brasil e Rússia',
      benefits_title: 'Benefícios para Associados',
      form_title: 'Formulário de Associação',
      form_subtitle: 'Preencha os dados abaixo para solicitar sua associação',
      razao_social: 'Razão Social / Nome',
      documento: 'Documento',
      tipo_documento: 'Tipo do Documento',
      email: 'E-mail',
      telefone: 'Telefone',
      endereco: 'Endereço completo',
      complemento: 'Complemento',
      cidade: 'Cidade',
      estado: 'Estado',
      pais: 'País',
      cep: 'CEP',
      filiais: 'Filiais / Sucursais',
      linha_producao: 'Linha de Produção',
      representante: 'Representante na Câmara',
      cargo: 'Cargo',
      observacoes: 'Observações',
      submit: 'Enviar Solicitação',
      submitting: 'Enviando...',
      success: 'Solicitação enviada com sucesso!',
      success_message: 'Entraremos em contato em breve para prosseguir com sua associação.',
      new_application: 'Enviar nova solicitação',
      required: 'obrigatório'
    },
    ru: {
      title: 'Вступите в Бразильско-Российскую палату',
      subtitle: 'Более 40 лет содействия торговым отношениям между Бразилией и Россией',
      benefits_title: 'Преимущества для членов',
      form_title: 'Форма членства',
      form_subtitle: 'Заполните данные ниже для подачи заявки на членство',
      razao_social: 'Юридическое название / Имя',
      documento: 'Документ',
      tipo_documento: 'Тип документа',
      email: 'Электронная почта',
      telefone: 'Телефон',
      endereco: 'Полный адрес',
      complemento: 'Дополнение',
      cidade: 'Город',
      estado: 'Штат',
      pais: 'Страна',
      cep: 'Почтовый индекс',
      filiais: 'Филиалы',
      linha_producao: 'Производственная линия',
      representante: 'Представитель в Палате',
      cargo: 'Должность',
      observacoes: 'Примечания',
      submit: 'Отправить заявку',
      submitting: 'Отправка...',
      success: 'Заявка успешно отправлена!',
      success_message: 'Мы свяжемся с вами в ближайшее время для продолжения процесса членства.',
      new_application: 'Отправить новую заявку',
      required: 'обязательно'
    },
    en: {
      title: 'Join the Brazil-Russia Chamber',
      subtitle: 'Over 40 years promoting trade relations between Brazil and Russia',
      benefits_title: 'Member Benefits',
      form_title: 'Membership Form',
      form_subtitle: 'Fill out the form below to apply for membership',
      razao_social: 'Legal Name / Name',
      documento: 'Document',
      tipo_documento: 'Document Type',
      email: 'Email',
      telefone: 'Phone',
      endereco: 'Full Address',
      complemento: 'Complement',
      cidade: 'City',
      estado: 'State',
      pais: 'Country',
      cep: 'Postal Code',
      filiais: 'Branches',
      linha_producao: 'Production Line',
      representante: 'Chamber Representative',
      cargo: 'Position',
      observacoes: 'Observations',
      submit: 'Submit Application',
      submitting: 'Submitting...',
      success: 'Application submitted successfully!',
      success_message: 'We will contact you soon to proceed with your membership.',
      new_application: 'Submit new application',
      required: 'required'
    }
  };

  const t = texts[language as keyof typeof texts] || texts.pt;

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-gray-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.success}</h2>
            <p className="text-gray-600 mb-8">{t.success_message}</p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="w-full px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              {t.new_application}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.benefits_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-lg mb-4">
                  <benefit.icon className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {language === 'pt' ? benefit.title_pt :
                   language === 'ru' ? benefit.title_ru :
                   benefit.title_en}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'pt' ? benefit.desc_pt :
                   language === 'ru' ? benefit.desc_ru :
                   benefit.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.form_title}</h2>
            <p className="text-gray-600">{t.form_subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
            <div>
              <label htmlFor="razao_social" className="block text-sm font-medium text-gray-700 mb-2">
                {t.razao_social} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="razao_social"
                name="razao_social"
                required
                value={formData.razao_social}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.documento} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="documento"
                  name="documento"
                  required
                  value={formData.documento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="tipo_documento" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.tipo_documento} <span className="text-red-600">*</span>
                </label>
                <select
                  id="tipo_documento"
                  name="tipo_documento"
                  required
                  value={formData.tipo_documento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="CPF">CPF</option>
                  <option value="CNPJ">CNPJ</option>
                  <option value="пропи́ска">пропи́ска</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email} <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.telefone}
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-2">
                {t.endereco} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                required
                value={formData.endereco}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="complemento" className="block text-sm font-medium text-gray-700 mb-2">
                {t.complemento}
              </label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.cidade} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  required
                  value={formData.cidade}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.estado} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  required
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="pais" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.pais} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="pais"
                  name="pais"
                  required
                  value={formData.pais}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-2">
                {t.cep}
              </label>
              <input
                type="text"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="filiais" className="block text-sm font-medium text-gray-700 mb-2">
                {t.filiais}
              </label>
              <input
                type="text"
                id="filiais"
                name="filiais"
                value={formData.filiais}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="linha_producao" className="block text-sm font-medium text-gray-700 mb-2">
                {t.linha_producao}
              </label>
              <input
                type="text"
                id="linha_producao"
                name="linha_producao"
                value={formData.linha_producao}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="representante" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.representante}
                </label>
                <input
                  type="text"
                  id="representante"
                  name="representante"
                  value={formData.representante}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.cargo}
                </label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-2">
                {t.observacoes}
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                rows={4}
                value={formData.observacoes}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? t.submitting : t.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { Check, X, Eye, Mail, Phone, Building, MapPin } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AdminLayout } from '../../components/AdminLayout';

interface Application {
  id: string;
  razao_social: string;
  documento: string;
  tipo_documento: string;
  email: string;
  telefone: string | null;
  endereco: string;
  complemento: string | null;
  cidade: string;
  estado: string;
  pais: string;
  cep: string | null;
  filiais: string | null;
  linha_producao: string | null;
  representante: string | null;
  cargo: string | null;
  observacoes: string | null;
  valor: number | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export const MembershipApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [valor, setValor] = useState<string>('');

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    let query = supabase
      .from('membership_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    if (data) setApplications(data);
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    if (status === 'approved' && !valor) {
      alert('Por favor, informe o valor mensal antes de aprovar.');
      return;
    }

    setLoading(true);
    try {
      const updateData: any = { status };

      if (status === 'approved' && valor) {
        updateData.valor = parseFloat(valor);
      }

      console.log('Atualizando com dados:', updateData);

      const { error: updateError } = await supabase
        .from('membership_applications')
        .update(updateData)
        .eq('id', id);

      if (updateError) {
        console.error('Erro ao atualizar:', updateError);
        throw updateError;
      }

      if (status === 'approved') {
        try {
          // Buscar os dados atualizados antes de enviar o webhook
          const { data: updatedApp, error: fetchError } = await supabase
            .from('membership_applications')
            .select('*')
            .eq('id', id)
            .single();

          console.log('Dados atualizados do banco:', updatedApp);

          if (fetchError) {
            console.error('Erro ao buscar dados:', fetchError);
            throw fetchError;
          }

          if (updatedApp) {
            const { data: { session } } = await supabase.auth.getSession();

            console.log('Enviando para webhook:', updatedApp);

            const webhookResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-approval-webhook`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                applicationData: updatedApp
              })
            });

            const webhookResult = await webhookResponse.json();
            console.log('Resposta do webhook:', webhookResult);
          }
        } catch (webhookError) {
          console.error('Erro ao enviar webhook:', webhookError);
        }
      }

      await fetchApplications();
      setSelectedApp(null);
      setValor('');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-gray-200 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    const labels = {
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Rejeitado'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pedidos de Associação</h1>
          <p className="text-gray-600">Gerencie os pedidos de associação recebidos</p>
        </div>

        <div className="mb-6 flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendentes' : f === 'approved' ? 'Aprovados' : 'Rejeitados'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localização
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-gray-400 mr-2" />
                        <div className="text-sm font-medium text-gray-900">{app.razao_social}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.tipo_documento}: {app.documento}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.cidade}, {app.estado} - {app.pais}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {applications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum pedido encontrado</p>
            </div>
          )}
        </div>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Detalhes do Pedido</h2>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Razão Social</label>
                  <p className="text-gray-900">{selectedApp.razao_social}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Documento</label>
                  <p className="text-gray-900">{selectedApp.tipo_documento}: {selectedApp.documento}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Mail className="w-4 h-4 mr-1" /> Email
                  </label>
                  <p className="text-gray-900">{selectedApp.email}</p>
                </div>

                {selectedApp.telefone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Phone className="w-4 h-4 mr-1" /> Telefone
                    </label>
                    <p className="text-gray-900">{selectedApp.telefone}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  {getStatusBadge(selectedApp.status)}
                </div>

                {selectedApp.valor && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor Mensal</label>
                    <p className="text-gray-900">R$ {selectedApp.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> Endereço Completo
                </label>
                <p className="text-gray-900">
                  {selectedApp.endereco}
                  {selectedApp.complemento && `, ${selectedApp.complemento}`}
                  <br />
                  {selectedApp.cidade}, {selectedApp.estado} - {selectedApp.pais}
                  {selectedApp.cep && ` - CEP: ${selectedApp.cep}`}
                </p>
              </div>

              {selectedApp.filiais && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filiais</label>
                  <p className="text-gray-900">{selectedApp.filiais}</p>
                </div>
              )}

              {selectedApp.linha_producao && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Linha de Produção</label>
                  <p className="text-gray-900">{selectedApp.linha_producao}</p>
                </div>
              )}

              {selectedApp.representante && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Representante</label>
                    <p className="text-gray-900">{selectedApp.representante}</p>
                  </div>

                  {selectedApp.cargo && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                      <p className="text-gray-900">{selectedApp.cargo}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedApp.observacoes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedApp.observacoes}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Submissão</label>
                <p className="text-gray-900">
                  {new Date(selectedApp.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            {selectedApp.status === 'pending' && (
              <div className="p-6 border-t space-y-4">
                <div>
                  <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-2">
                    Valor Mensal (R$) *
                  </label>
                  <input
                    type="number"
                    id="valor"
                    step="0.01"
                    min="0"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="Ex: 150.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Este é o valor da mensalidade</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'approved')}
                    disabled={loading || !valor}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    {loading ? 'Processando...' : 'Aprovar'}
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'rejected')}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
                  >
                    <X className="w-5 h-5 mr-2" />
                    {loading ? 'Processando...' : 'Rejeitar'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

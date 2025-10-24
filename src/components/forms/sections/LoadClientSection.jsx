import { useState } from 'react';
import { useFormContext } from '../../../context/FormContext';
import { Card, Button } from '../../common';
import { loadClientById, getAllClients } from '../../../services/clientDocumentService';

const LoadClientSection = () => {
  const { setFormData } = useFormContext();
  const [clientId, setClientId] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentClients, setRecentClients] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const [status, setStatus] = useState('');

  const handleLoadClient = async () => {
    if (!clientId.trim()) {
      setStatus('Please enter a Client ID');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    setLoading(true);
    setStatus('Loading client data...');

    try {
      const result = await loadClientById(clientId.trim());

      if (result.success) {
        setFormData(result.formData);
        setStatus(`✅ Loaded: ${result.formData.client.firstName} ${result.formData.client.lastName}`);
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus(`❌ Error: ${result.error}`);
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('Error loading client:', error);
      setStatus('❌ Error loading client. Please check the console.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleShowRecentClients = async () => {
    if (showRecent) {
      setShowRecent(false);
      return;
    }

    setLoading(true);
    setStatus('Loading recent clients...');

    try {
      const result = await getAllClients(10);

      if (result.success) {
        setRecentClients(result.clients);
        setShowRecent(true);
        setStatus('');
      } else {
        setStatus(`❌ Error: ${result.error}`);
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('Error loading recent clients:', error);
      setStatus('❌ Error loading recent clients.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadRecentClient = async (client) => {
    setLoading(true);
    setStatus('Loading client data...');

    try {
      const result = await loadClientById(client.id);

      if (result.success) {
        setFormData(result.formData);
        setStatus(`✅ Loaded: ${result.formData.client.firstName} ${result.formData.client.lastName}`);
        setShowRecent(false);
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus(`❌ Error: ${result.error}`);
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('Error loading client:', error);
      setStatus('❌ Error loading client.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Load Existing Client</h3>
          <p className="text-sm text-gray-600 mt-1">
            Load a previously saved client by their ID or browse recent clients
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLoadClient();
                }
              }}
              placeholder="Enter Client ID (e.g., client_abc123)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
          <Button
            variant="primary"
            onClick={handleLoadClient}
            disabled={loading || !clientId.trim()}
            loading={loading}
          >
            Load Client
          </Button>
          <Button
            variant="outline"
            onClick={handleShowRecentClients}
            disabled={loading}
          >
            {showRecent ? 'Hide' : 'Browse'} Recent
          </Button>
        </div>

        {status && (
          <div className={`p-3 rounded-lg text-sm ${
            status.includes('Error') || status.includes('❌')
              ? 'bg-red-50 text-red-800 border border-red-200'
              : status.includes('✅')
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            {status}
          </div>
        )}

        {showRecent && (
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">Recent Clients</h4>
            {recentClients.length === 0 ? (
              <p className="text-gray-500 text-sm">No clients found</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {recentClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => handleLoadRecentClient(client)}
                    disabled={loading}
                    className="w-full p-4 text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {client.formData?.client?.firstName} {client.formData?.client?.lastName}
                          {client.formData?.isJoint && client.formData?.spouse && (
                            <span className="text-gray-600">
                              {' & '}{client.formData.spouse.firstName} {client.formData.spouse.lastName}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ID: {client.id}
                        </div>
                        <div className="text-xs text-gray-500">
                          {client.formData?.isJoint ? 'Joint Trust' : 'Single Trust'}
                          {' • '}
                          Created: {new Date(client.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-blue-600 font-semibold text-sm">
                        Load →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default LoadClientSection;

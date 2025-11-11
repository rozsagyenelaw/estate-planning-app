import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClients, searchClients } from '../services/firestoreService';
import { Button, Card } from './common';

const ViewClients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    // Filter clients based on search term
    if (searchTerm.trim() === '') {
      setFilteredClients(clients);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = clients.filter(client => {
        const firstName = client.client?.firstName?.toLowerCase() || '';
        const lastName = client.client?.lastName?.toLowerCase() || '';
        const email = client.client?.email?.toLowerCase() || '';
        return firstName.includes(term) || lastName.includes(term) || email.includes(term);
      });
      setFilteredClients(filtered);
    }
  }, [searchTerm, clients]);

  const loadClients = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getAllClients(100);
      if (result.success) {
        setClients(result.data);
        setFilteredClients(result.data);
      } else {
        setError(result.error || 'Failed to load clients');
      }
    } catch (err) {
      console.error('Error loading clients:', err);
      setError('Failed to load clients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClientClick = (clientId) => {
    navigate(`/client/${clientId}`);
  };

  const handleNewClient = () => {
    navigate('/');
  };

  const handleDeleteClient = async (clientId, client) => {
    const clientName = `${client.client?.firstName} ${client.client?.lastName}`;

    if (!window.confirm(
      `Are you sure you want to delete ${clientName}? This action cannot be undone.`
    )) {
      return;
    }

    try {
      const { deleteClientData } = await import('../services/firestoreService');
      const result = await deleteClientData(clientId);

      if (result.success) {
        // Reload the clients list
        await loadClients();
        alert('Client deleted successfully');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Error deleting client:', err);
      alert('Failed to delete client. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading clients...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Saved Clients</h1>
            <p className="text-gray-600 mt-2">
              {clients.length} {clients.length === 1 ? 'client' : 'clients'} in database
            </p>
          </div>
          <Button variant="primary" onClick={handleNewClient}>
            + New Client
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}
      </div>

      {/* Clients List */}
      {filteredClients.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm ? 'No clients found' : 'No clients yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Start by creating your first client'}
            </p>
            {!searchTerm && (
              <Button variant="primary" onClick={handleNewClient}>
                Create First Client
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <Card
              key={client.id}
              className="hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Client Name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {client.client?.firstName} {client.client?.lastName}
                    {client.isJoint && client.spouse && (
                      <span className="text-gray-600">
                        {' '}& {client.spouse?.firstName} {client.spouse?.lastName}
                      </span>
                    )}
                  </h3>

                  {/* Trust Type Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        client.isJoint || client.trustType === 'joint'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {client.isJoint || client.trustType === 'joint'
                        ? 'Joint Trust'
                        : 'Single Trust'}
                    </span>
                    {client.documents && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Complete Plan
                      </span>
                    )}
                    {client.livingTrustDocuments && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        Living Trust
                      </span>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    {client.client?.email && (
                      <div className="flex items-center gap-2">
                        <span>📧</span>
                        <span>{client.client.email}</span>
                      </div>
                    )}
                    {client.client?.phone && (
                      <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span>{client.client.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Trust Name */}
                  {client.trustName && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Trust:</span> {client.trustName}
                    </div>
                  )}
                </div>

                {/* Date Info */}
                <div className="text-right text-sm text-gray-500 ml-4">
                  <div className="mb-1">
                    <span className="font-semibold">Created:</span>
                    <br />
                    {formatDate(client.createdAt)}
                  </div>
                  <div>
                    <span className="font-semibold">Updated:</span>
                    <br />
                    {formatDate(client.updatedAt)}
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              {(client.documents || client.livingTrustDocuments) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Saved Documents:</h4>
                  <div className="space-y-2">
                    {/* Complete Estate Plan Documents */}
                    {client.documents && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-semibold text-gray-600">Complete Plan:</span>
                        {client.documents.pdf && (
                          <a
                            href={client.documents.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-xs font-semibold transition-colors"
                          >
                            📄 PDF
                          </a>
                        )}
                        {client.documents.word && (
                          <a
                            href={client.documents.word}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-xs font-semibold transition-colors"
                          >
                            📝 Word
                          </a>
                        )}
                      </div>
                    )}

                    {/* Living Trust Only Documents */}
                    {client.livingTrustDocuments && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-semibold text-gray-600">Living Trust:</span>
                        {client.livingTrustDocuments.livingTrustPdf && (
                          <a
                            href={client.livingTrustDocuments.livingTrustPdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-xs font-semibold transition-colors"
                          >
                            📄 PDF
                          </a>
                        )}
                        {client.livingTrustDocuments.livingTrustWord && (
                          <a
                            href={client.livingTrustDocuments.livingTrustWord}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-xs font-semibold transition-colors"
                          >
                            📝 Word
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClientClick(client.id);
                    }}
                    className="flex-1"
                  >
                    View Full Details & Edit →
                  </Button>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClient(client.id, client);
                    }}
                    className="text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewClients;

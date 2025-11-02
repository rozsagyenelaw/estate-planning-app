import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { getClientData, deleteClientData } from '../services/firestoreService';
import { updateClientWithDocuments } from '../services/clientDocumentService';
import { getAmendments, deleteAmendment, getOrdinalName } from '../services/amendmentService';
import { Button, Card } from './common';

const ClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { setFormData } = useFormContext();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const [regenerateProgress, setRegenerateProgress] = useState({ percent: 0, message: '' });
  const [amendments, setAmendments] = useState([]);
  const [amendmentsLoading, setAmendmentsLoading] = useState(true);

  useEffect(() => {
    loadClient();
    loadAmendments();
  }, [clientId]);

  const loadClient = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getClientData(clientId);
      if (result.success) {
        setClient(result.data);
      } else {
        setError(result.error || 'Client not found');
      }
    } catch (err) {
      console.error('Error loading client:', err);
      setError('Failed to load client data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadAmendments = async () => {
    setAmendmentsLoading(true);
    try {
      const result = await getAmendments(clientId);
      if (result.success) {
        setAmendments(result.data);
      }
    } catch (err) {
      console.error('Error loading amendments:', err);
    } finally {
      setAmendmentsLoading(false);
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

  const handleEdit = () => {
    // Load client data into form context and navigate to main form
    setFormData(client);
    navigate('/');
  };

  const handleRegenerateDocuments = async () => {
    if (!window.confirm('Regenerate all documents for this client? This will create new PDF and Word files.')) {
      return;
    }

    setRegenerating(true);
    setRegenerateProgress({ percent: 0, message: 'Starting...' });

    try {
      const result = await updateClientWithDocuments(
        clientId,
        client,
        true, // regenerateDocuments = true
        (progress) => {
          setRegenerateProgress(progress);
        }
      );

      if (result.success) {
        // Reload client data to get new document URLs
        await loadClient();
        alert('Documents regenerated successfully!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Error regenerating documents:', err);
      alert('Failed to regenerate documents. Please check the console.');
    } finally {
      setRegenerating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(
      `Are you sure you want to delete ${client.client?.firstName} ${client.client?.lastName}? This action cannot be undone.`
    )) {
      return;
    }

    try {
      const result = await deleteClientData(clientId);
      if (result.success) {
        alert('Client deleted successfully');
        navigate('/clients');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Error deleting client:', err);
      alert('Failed to delete client. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/clients');
  };

  const handleCreateAmendment = () => {
    navigate(`/client/${clientId}/create-amendment`);
  };

  const handleDeleteAmendment = async (amendmentId, amendmentNumber) => {
    if (!window.confirm(
      `Are you sure you want to delete the ${getOrdinalName(amendmentNumber)} Amendment? This action cannot be undone.`
    )) {
      return;
    }

    try {
      const result = await deleteAmendment(clientId, amendmentId);
      if (result.success) {
        alert('Amendment deleted successfully');
        loadAmendments(); // Reload amendments
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error('Error deleting amendment:', err);
      alert('Failed to delete amendment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading client data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <div className="text-center py-12">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Client</h3>
            <p className="text-gray-600 mb-6">{error || 'Client not found'}</p>
            <Button variant="primary" onClick={handleBack}>
              Back to Clients
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Actions */}
      <div className="mb-8">
        <Button variant="outline" onClick={handleBack} className="mb-4">
          ← Back to Clients
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {client.client?.firstName} {client.client?.lastName}
              {client.isJoint && client.spouse && (
                <span className="text-gray-600">
                  {' '}& {client.spouse?.firstName} {client.spouse?.lastName}
                </span>
              )}
            </h1>
            <p className="text-gray-600 mt-2">Client ID: {clientId}</p>
          </div>

          <div className="flex gap-3">
            <Button variant="primary" onClick={handleEdit}>
              Edit Client
            </Button>
            <Button
              variant="secondary"
              onClick={handleRegenerateDocuments}
              loading={regenerating}
              disabled={regenerating}
            >
              Regenerate Documents
            </Button>
            <Button variant="outline" onClick={handleDelete} className="text-red-600 hover:bg-red-50">
              Delete Client
            </Button>
          </div>
        </div>
      </div>

      {/* Regeneration Progress */}
      {regenerating && (
        <Card className="mb-6">
          <div className="text-center">
            <div className="mb-2 text-gray-700 font-semibold">{regenerateProgress.message}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all"
                style={{ width: `${regenerateProgress.percent}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">{Math.round(regenerateProgress.percent)}%</div>
          </div>
        </Card>
      )}

      {/* Trust Information */}
      <Card className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Trust Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Trust Type</label>
            <p className="text-gray-900">
              {client.isJoint || client.trustType === 'joint' ? 'Joint Trust' : 'Single Trust'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Trust Name</label>
            <p className="text-gray-900">{client.trustName || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Created</label>
            <p className="text-gray-900">{formatDate(client.createdAt)}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Last Updated</label>
            <p className="text-gray-900">{formatDate(client.updatedAt)}</p>
          </div>
        </div>
      </Card>

      {/* Client Information */}
      <Card className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Client Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Primary Client</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Name</label>
                <p className="text-gray-900">
                  {client.client?.firstName} {client.client?.middleName} {client.client?.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Email</label>
                <p className="text-gray-900">{client.client?.email || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Phone</label>
                <p className="text-gray-900">{client.client?.phone || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                <p className="text-gray-900">{client.client?.dateOfBirth || 'N/A'}</p>
              </div>
            </div>
          </div>

          {client.isJoint && client.spouse && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Spouse</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Name</label>
                  <p className="text-gray-900">
                    {client.spouse?.firstName} {client.spouse?.middleName} {client.spouse?.lastName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Email</label>
                  <p className="text-gray-900">{client.spouse?.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Phone</label>
                  <p className="text-gray-900">{client.spouse?.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                  <p className="text-gray-900">{client.spouse?.dateOfBirth || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Children */}
      {client.children && client.children.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Children ({client.children.length})</h2>
          <div className="space-y-3">
            {client.children.map((child, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">
                  {child.firstName} {child.lastName}
                </p>
                <p className="text-sm text-gray-600">DOB: {child.dateOfBirth || 'N/A'}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Successor Trustees */}
      {client.successorTrustees && client.successorTrustees.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Successor Trustees ({client.successorTrustees.length})
          </h2>
          <div className="space-y-3">
            {client.successorTrustees.map((trustee, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">
                  {index + 1}. {trustee.firstName} {trustee.lastName}
                </p>
                {trustee.email && <p className="text-sm text-gray-600">Email: {trustee.email}</p>}
                {trustee.phone && <p className="text-sm text-gray-600">Phone: {trustee.phone}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Documents */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Generated Documents</h2>
          {(client.documents || client.livingTrustDocuments) && (
            <span className="text-sm text-gray-600">
              Click any document to download
            </span>
          )}
        </div>

        {/* Complete Estate Plan */}
        {client.documents && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📦 Complete Estate Plan Package
            </h3>
            <div className="space-y-2">
              {client.documents.pdf && (
                <a
                  href={client.documents.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-green-50 hover:bg-green-100 border-2 border-green-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <div>
                        <div className="font-semibold text-gray-900">Complete Package PDF</div>
                        <div className="text-xs text-gray-600">
                          Generated: {formatDate(client.documentsGeneratedAt)}
                        </div>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">Download →</span>
                  </div>
                </a>
              )}
              {client.documents.word && (
                <a
                  href={client.documents.word}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-green-50 hover:bg-green-100 border-2 border-green-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📝</span>
                      <div>
                        <div className="font-semibold text-gray-900">Complete Package Word</div>
                        <div className="text-xs text-gray-600">
                          Generated: {formatDate(client.documentsGeneratedAt)}
                        </div>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">Download →</span>
                  </div>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Living Trust Only */}
        {client.livingTrustDocuments && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📜 Living Trust Document
            </h3>
            <div className="space-y-2">
              {client.livingTrustDocuments.livingTrustPdf && (
                <a
                  href={client.livingTrustDocuments.livingTrustPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <div>
                        <div className="font-semibold text-gray-900">Living Trust PDF</div>
                        <div className="text-xs text-gray-600">
                          Generated: {formatDate(client.livingTrustGeneratedAt)}
                        </div>
                      </div>
                    </div>
                    <span className="text-blue-600 font-semibold">Download →</span>
                  </div>
                </a>
              )}
              {client.livingTrustDocuments.livingTrustWord && (
                <a
                  href={client.livingTrustDocuments.livingTrustWord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📝</span>
                      <div>
                        <div className="font-semibold text-gray-900">Living Trust Word</div>
                        <div className="text-xs text-gray-600">
                          Generated: {formatDate(client.livingTrustGeneratedAt)}
                        </div>
                      </div>
                    </div>
                    <span className="text-blue-600 font-semibold">Download →</span>
                  </div>
                </a>
              )}
            </div>
          </div>
        )}

        {!client.documents && !client.livingTrustDocuments && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Documents Generated Yet</h3>
            <p className="text-gray-600 mb-6">
              Generate estate planning documents for this client
            </p>
            <Button variant="primary" onClick={handleRegenerateDocuments} className="mt-4">
              Generate Documents Now
            </Button>
          </div>
        )}
      </Card>

      {/* Trust Amendments */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Trust Amendments</h2>
          <Button variant="primary" onClick={handleCreateAmendment}>
            + Create Amendment
          </Button>
        </div>

        {amendmentsLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Loading amendments...</p>
          </div>
        ) : amendments.length > 0 ? (
          <div className="space-y-3">
            {amendments.map((amendment) => (
              <div
                key={amendment.id}
                className="p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-300 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">📝</span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {getOrdinalName(amendment.amendmentNumber)} Amendment
                        </div>
                        <div className="text-xs text-gray-600">
                          Date: {amendment.amendmentDate} | Created: {formatDate(amendment.createdAt)}
                        </div>
                      </div>
                    </div>

                    {amendment.sections && amendment.sections.length > 0 && (
                      <div className="text-sm text-gray-700 ml-11">
                        <strong>Amended Sections:</strong>{' '}
                        {amendment.sections.map((s, i) =>
                          s.articleNumber || `Section ${i + 1}`
                        ).join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {amendment.pdfUrl && (
                      <a
                        href={amendment.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                      >
                        View PDF →
                      </a>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteAmendment(amendment.id, amendment.amendmentNumber)}
                      className="text-red-600 hover:bg-red-50 text-sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Amendments Yet</h3>
            <p className="text-gray-600 mb-6">
              Create trust amendments to modify existing trust provisions
            </p>
            <Button variant="primary" onClick={handleCreateAmendment}>
              Create First Amendment
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClientDetail;

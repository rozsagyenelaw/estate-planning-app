import { useState, useEffect } from 'react';
import { useFormContext } from '../../../context/FormContext';
import { searchClients, getClientData } from '../../../services/firestoreService';
import { Card, Button } from '../../common';

const LoadClientSection = () => {
  const { setFormData } = useFormContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    // Debounced search
    const timer = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        performSearch(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const performSearch = async (term) => {
    setLoading(true);
    try {
      const result = await searchClients(term, 10);
      if (result.success) {
        setSuggestions(result.data);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error('Error searching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectClient = async (client) => {
    setSelectedClient(client);
    setSearchTerm(`${client.client?.firstName} ${client.client?.lastName}`);
    setShowDropdown(false);
  };

  const handleLoadClient = async () => {
    if (!selectedClient) return;

    if (window.confirm(`Load data for ${selectedClient.client?.firstName} ${selectedClient.client?.lastName}? This will replace all current form data.`)) {
      // Load the full client data
      const result = await getClientData(selectedClient.id);
      if (result.success) {
        setFormData(result.data);
        alert('Client data loaded successfully!');
      } else {
        alert('Error loading client data');
      }
    }
  };

  const handleClearSelection = () => {
    setSearchTerm('');
    setSelectedClient(null);
    setSuggestions([]);
  };

  const formatDate = (date) => {
    if (!date) return '';
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Load Existing Client</h3>
            <p className="text-sm text-gray-600 mt-1">
              Search for and load an existing client's data
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                placeholder="Start typing client name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {loading && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}

              {/* Dropdown with suggestions */}
              {showDropdown && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {suggestions.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-semibold text-gray-900">
                        {client.client?.firstName} {client.client?.lastName}
                        {client.isJoint && client.spouse && (
                          <span className="text-gray-600">
                            {' '}& {client.spouse?.firstName} {client.spouse?.lastName}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {client.client?.email && <div>📧 {client.client.email}</div>}
                        <div>📅 Updated: {formatDate(client.updatedAt)}</div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                            client.isJoint
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {client.isJoint ? 'Joint Trust' : 'Single Trust'}
                        </span>
                        {client.documents && (
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            Complete Plan
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedClient && (
              <Button variant="primary" onClick={handleLoadClient}>
                Load Client
              </Button>
            )}

            {searchTerm && (
              <Button variant="outline" onClick={handleClearSelection}>
                Clear
              </Button>
            )}
          </div>

          {/* Selected client preview */}
          {selectedClient && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    Selected: {selectedClient.client?.firstName} {selectedClient.client?.lastName}
                    {selectedClient.isJoint && selectedClient.spouse && (
                      <span className="text-gray-600">
                        {' '}& {selectedClient.spouse?.firstName} {selectedClient.spouse?.lastName}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Trust: {selectedClient.trustName || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">
                    Last updated: {formatDate(selectedClient.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {searchTerm.length >= 2 && !loading && suggestions.length === 0 && (
          <div className="text-sm text-gray-600 italic">
            No clients found matching "{searchTerm}"
          </div>
        )}

        {searchTerm.length > 0 && searchTerm.length < 2 && (
          <div className="text-sm text-gray-600 italic">
            Type at least 2 characters to search
          </div>
        )}
      </div>
    </Card>
  );
};

export default LoadClientSection;

import { useState } from 'react';
import { saveClientWithDocuments, loadClientWithDocuments, searchClientsForAutocomplete } from '../services/clientDocumentService';

/**
 * Firebase Test Component
 *
 * This component provides a simple UI to test Firebase integration.
 * Add this to your app temporarily to verify everything works.
 *
 * Usage:
 * import FirebaseTest from './components/FirebaseTest';
 *
 * Then add <FirebaseTest /> to your App.jsx
 */
export default function FirebaseTest() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const testData = {
    client: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-1234',
      address: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      ssn: 'xxx-xx-1234',
      dateOfBirth: '1980-01-01'
    },
    trust: {
      name: 'The Doe Family Trust',
      date: new Date().toISOString().split('T')[0],
      type: 'single'
    },
    children: [],
    successorTrustees: [
      { name: 'Jane Smith', relationship: 'Sister' }
    ]
  };

  const handleTestSave = async () => {
    setLoading(true);
    setStatus('Saving client data...');

    try {
      const result = await saveClientWithDocuments(
        testData,
        ({ percent, message }) => {
          setStatus(`${message} (${Math.round(percent)}%)`);
        }
      );

      if (result.success) {
        setStatus('✅ Success! Client saved with documents');
        setResult(result);
        console.log('Save result:', result);
      } else {
        setStatus(`❌ Error: ${result.error}`);
        console.error('Save error:', result);
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
      console.error('Test error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTestLoad = async () => {
    if (!result?.clientId) {
      setStatus('❌ No client ID available. Save a client first.');
      return;
    }

    setLoading(true);
    setStatus('Loading client data...');

    try {
      const loadResult = await loadClientWithDocuments(result.clientId);

      if (loadResult.success) {
        setStatus('✅ Client data loaded successfully');
        console.log('Loaded client:', loadResult.client);
        console.log('Documents:', loadResult.documents);
      } else {
        setStatus(`❌ Error: ${loadResult.error}`);
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const results = await searchClientsForAutocomplete(term);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleOpenDocument = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🔥 Firebase Integration Test
      </h2>

      {/* Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>
          <span className={loading ? 'text-blue-600' : 'text-gray-700'}>
            {status || 'Ready to test'}
          </span>
        </div>
        {loading && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Test Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleTestSave}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          1️⃣ Save Test Client + Documents
        </button>

        <button
          onClick={handleTestLoad}
          disabled={loading || !result?.clientId}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          2️⃣ Load Client Data
        </button>
      </div>

      {/* Search Test */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          3️⃣ Test Search (Autocomplete)
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Type 'John' or 'Doe' to search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchResults.length > 0 && (
          <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden">
            {searchResults.map((client) => (
              <div
                key={client.id}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              >
                <div className="font-semibold">{client.label}</div>
                <div className="text-sm text-gray-600">
                  {client.email} • {client.phone}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-800 mb-3">✅ Test Results</h3>

          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">Client ID:</span>
              <code className="ml-2 px-2 py-1 bg-white rounded text-xs">
                {result.clientId}
              </code>
            </div>

            {result.documents && (
              <>
                <div className="mt-4 font-semibold text-green-800">Documents Generated:</div>

                {result.documents.pdf && (
                  <button
                    onClick={() => handleOpenDocument(result.documents.pdf)}
                    className="block w-full text-left px-3 py-2 bg-white hover:bg-gray-50 rounded border border-gray-200"
                  >
                    <span className="font-semibold">📄 PDF Document</span>
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      {result.documents.pdf}
                    </div>
                  </button>
                )}

                {result.documents.word && (
                  <button
                    onClick={() => handleOpenDocument(result.documents.word)}
                    className="block w-full text-left px-3 py-2 bg-white hover:bg-gray-50 rounded border border-gray-200"
                  >
                    <span className="font-semibold">📝 Word Document</span>
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      {result.documents.word}
                    </div>
                  </button>
                )}
              </>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-green-300">
            <div className="text-xs text-green-700">
              <div>✓ Client data saved to Firestore</div>
              <div>✓ Documents generated and uploaded to Storage</div>
              <div>✓ Download URLs created</div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm">
        <h3 className="font-bold text-blue-800 mb-2">📋 Test Instructions</h3>
        <ol className="list-decimal list-inside space-y-1 text-blue-700">
          <li>Click "Save Test Client + Documents" to test the full workflow</li>
          <li>Click "Load Client Data" to verify the data was saved</li>
          <li>Type in the search box to test autocomplete</li>
          <li>Check Firebase Console to see the saved data</li>
          <li>Click the document links to download/view generated files</li>
        </ol>
      </div>

      {/* Links */}
      <div className="mt-4 flex gap-4 text-sm">
        <a
          href="https://console.firebase.google.com/project/estate-planning-app-b5335/firestore/data"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Firestore Data →
        </a>
        <a
          href="https://console.firebase.google.com/project/estate-planning-app-b5335/storage/files"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Storage Files →
        </a>
      </div>
    </div>
  );
}

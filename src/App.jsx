import { Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import EstatePlanningForm from './components/forms/EstatePlanningForm';
import ViewClients from './components/ViewClients';
import ClientDetail from './components/ClientDetail';
import AmendmentForm from './components/amendments/AmendmentForm';
import ExternalTrustAmendment from './components/amendments/ExternalTrustAmendment';
import TrustTransferDeed from './components/deeds/TrustTransferDeed';

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <EstatePlanningForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/clients"
                element={
                  <ProtectedRoute>
                    <ViewClients />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/:clientId"
                element={
                  <ProtectedRoute>
                    <ClientDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/:clientId/create-amendment"
                element={
                  <ProtectedRoute>
                    <AmendmentForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/:clientId/trust-transfer-deed"
                element={
                  <ProtectedRoute>
                    <TrustTransferDeed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/external-trust-amendment"
                element={
                  <ProtectedRoute>
                    <ExternalTrustAmendment />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;

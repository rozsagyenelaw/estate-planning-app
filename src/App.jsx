import { Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import EstatePlanningForm from './components/forms/EstatePlanningForm';
import ViewClients from './components/ViewClients';
import ClientDetail from './components/ClientDetail';
import AmendmentForm from './components/amendments/AmendmentForm';
import ExternalTrustAmendment from './components/amendments/ExternalTrustAmendment';

function App() {
  return (
    <FormProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<EstatePlanningForm />} />
            <Route path="/clients" element={<ViewClients />} />
            <Route path="/client/:clientId" element={<ClientDetail />} />
            <Route path="/client/:clientId/create-amendment" element={<AmendmentForm />} />
            <Route path="/external-trust-amendment" element={<ExternalTrustAmendment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FormProvider>
  );
}

export default App;

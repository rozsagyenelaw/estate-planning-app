import { FormProvider } from './context/FormContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import EstatePlanningForm from './components/forms/EstatePlanningForm';

function App() {
  return (
    <FormProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <EstatePlanningForm />
        </main>
        <Footer />
      </div>
    </FormProvider>
  );
}

export default App;

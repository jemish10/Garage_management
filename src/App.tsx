import { useState, useCallback } from 'react';
import { Page, Customer, Vehicle, Billing } from './types';
import { getCustomers, getVehicles, getBillings } from './store';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddServicePage from './pages/AddServicePage';
import RecordsPage from './pages/RecordsPage';
import BillingPage from './pages/BillingPage';
import BillingDetailPage from './pages/BillingDetailPage';
import SetupGuidePage from './pages/SetupGuidePage';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const [customers, setCustomers] = useState<Customer[]>(() => getCustomers());
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => getVehicles());
  const [billings, setBillings] = useState<Billing[]>(() => getBillings());

  const refreshData = useCallback(() => {
    setCustomers(getCustomers());
    setVehicles(getVehicles());
    setBillings(getBillings());
  }, []);

  const navigate = (target: Page) => {
    const protectedPages: Page[] = ['dashboard', 'add-service', 'records', 'billing', 'billing-detail'];
    if (protectedPages.includes(target) && !isLoggedIn) {
      setPage('login');
    } else {
      setPage(target);
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage('home');
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={navigate} isLoggedIn={isLoggedIn} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      case 'dashboard':
        return isLoggedIn
          ? <DashboardPage customers={customers} vehicles={vehicles} billings={billings} onNavigate={navigate} />
          : <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      case 'add-service':
        return isLoggedIn
          ? <AddServicePage onNavigate={navigate} onDataChange={refreshData} />
          : <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      case 'records':
        return isLoggedIn
          ? <RecordsPage customers={customers} vehicles={vehicles} billings={billings} onNavigate={navigate} onDataChange={refreshData} onSelectVehicle={setSelectedVehicleId} />
          : <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      case 'billing':
        return isLoggedIn
          ? <BillingPage customers={customers} vehicles={vehicles} billings={billings} selectedVehicleId={selectedVehicleId} onNavigate={navigate} onDataChange={refreshData} onSelectVehicle={setSelectedVehicleId} />
          : <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      case 'billing-detail':
        return isLoggedIn
          ? <BillingDetailPage customers={customers} vehicles={vehicles} billings={billings} selectedVehicleId={selectedVehicleId} onNavigate={navigate} />
          : <LoginPage onLogin={handleLogin} onNavigate={navigate} />;
      case 'setup-guide':
        return <SetupGuidePage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} isLoggedIn={isLoggedIn} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar
        currentPage={page}
        isLoggedIn={isLoggedIn}
        onNavigate={navigate}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
}

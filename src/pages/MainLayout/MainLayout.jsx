import Navbar from '../../components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { Offline } from 'react-detect-offline';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex">
        <div key={location.pathname} className="w-full animate-fade-in">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

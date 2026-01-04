import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/overview';
import Projects from './pages/Projects';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'projects':
        return <Projects />;
      case 'alerts':
        return <Alerts />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Right content */}
      <div className="ml-64 w-[calc(100vw-16rem)] flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 w-full overflow-y-auto p-8">
          {renderPage()}
        </main>

        <footer className="bg-white border-t border-gray-200 px-8 py-4 w-full">
          <p className="text-sm text-gray-500 text-center">
            Outcome Trace © 2024 - Government Budget Transparency Platform
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

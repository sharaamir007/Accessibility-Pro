import React from 'react';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </AccessibilityProvider>
  );
}

export default App;
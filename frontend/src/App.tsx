import { useState } from 'react';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { ReviewMCQ } from "./components/Dashboard/ReviewMCQ";
export default function App() {
  const [view, setView] = useState<'hero' | 'dashboard'>('hero');

  return (
    <div className="min-h-screen bg-bg-main text-text-main font-sans selection:bg-accent-blue/20">
      {view === 'hero' ? (
        <Hero onStart={() => setView('dashboard')} />
      ) : (
        <Dashboard onLogout={() => setView('hero')} />
      )}
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { PageRenderer } from './components/PageRenderer';
import { useTheme } from './hooks/useTheme';
import './App.css';

// Main app wrapper - handles theming and layout
const AppContent = () => {
  const { theme } = useTheme();

  // TODO: Maybe move this to a CSS class later for better performance
  const appStyles = {
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    minHeight: '100vh',
    transition: 'background-color 0.2s ease' // smooth theme transitions
  };

  return (
    <div style={appStyles} className="app-container">
      <Navigation />
      <main role="main" className="main-content">
        <Routes>
          <Route path="/" element={<PageRenderer />} />
          <Route path="/:page" element={<PageRenderer />} />
          {/* Catch-all route for 404s - handled by PageRenderer */}
          <Route path="*" element={<PageRenderer />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;

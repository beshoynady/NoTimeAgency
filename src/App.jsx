import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate, useParams } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import { LanguageProvider } from './i18n/LanguageContext';

function LangRoute() {
  const { lang } = useParams();
  const valid = lang === 'ar' ? 'ar' : 'en';
  return (
    <LanguageProvider lang={valid}>
      <HomePage />
    </LanguageProvider>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang" element={<LangRoute />} />
        <Route path="/:lang/*" element={<LangRoute />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

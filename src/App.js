import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './app/AppProvider';
import { ThemeProvider } from './app/ThemeProvider';
import { ErrorBoundary } from './app/ErrorBoundary';

// Pages
import Home from './pages/home';
import FourierSeries from './pages/fourierserise';
import FourierApp from './pages/FourierApp';

const SmartTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "3D Perspective";
    
    if (location.pathname === "/fourier") {
      title = "Fourier Series Intro";
    } else if (location.pathname === "/fourier/app") {
      title = "Fourier 3D App";
    }

    document.title = title;
  }, [location]);

  return null;
};

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <BrowserRouter>
            <SmartTitle />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fourier" element={<FourierSeries />} />
              <Route path="/fourier/app" element={<FourierApp />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;


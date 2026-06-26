import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './app/AppProvider';
import { ThemeProvider } from './app/ThemeProvider';
import { ErrorBoundary } from './app/ErrorBoundary';

// Pages
import Home from './pages/home';
import FourierSeries from './pages/fourierserise';
import FourierApp from './pages/FourierApp';

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <BrowserRouter>
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


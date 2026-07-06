import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Admin from './pages/Admin';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;

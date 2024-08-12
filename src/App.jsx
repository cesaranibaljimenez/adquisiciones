// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ConfigureTender from './pages/ConfigureTender';
import Specifications from './pages/Specifications';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ConfigureTender />} />
        <Route path="/especificaciones" element={<Specifications />} />
      </Routes>
    </Router>
  );
}

export default App;

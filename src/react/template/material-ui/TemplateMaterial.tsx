
import React from 'react';
import Material from '@mui/material';
import ReactDOM from 'react-dom/client';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

const { useState } = React
console.log(React)
console.log(useState)
const Home = () => <div className="p-4 text-green-400">Home Page</div>;
const About = () => <div className="p-4 text-blue-400">About Page</div>;

const App = () => {
  return (
    <HashRouter>
      <nav className="p-4 bg-slate-800 flex gap-4">
        {/* These will produce URLs like index.html#/ and index.html#/about */}
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/about" className="hover:text-blue-500">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
};

const container = document.getElementById('app');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
} else {
  console.error("Failed to find the root element. Check your index.html.");
}

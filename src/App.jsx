import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import ForIndividuals from './pages/ForIndividuals';
import ForTeams from './pages/ForTeams';
import ForEnterprises from './pages/ForEnterprises';
import About from './pages/About';
import Classes from './pages/Classes';
import Contact from './pages/Contact';
import Membership from './components/Membership';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-bone">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/for-individuals" element={<ForIndividuals />} />
            <Route path="/for-teams"       element={<ForTeams />} />
            <Route path="/for-enterprises" element={<ForEnterprises />} />
            <Route path="/about"           element={<About />} />
            <Route path="/contact"         element={<Contact />} />
            {/* Legacy routes preserved */}
            <Route path="/classes"    element={<Classes />} />
            <Route path="/membership" element={<Membership />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

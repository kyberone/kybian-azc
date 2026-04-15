import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Package, UserPlus, ArrowRight, ShieldCheck, Globe, TrendingUp } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="azc-container">
      {/* Navigation */}
      <nav className="azc-nav">
        <div className="nav-wrap">
          <div className="logo-group">
            <Globe size={28} className="azc-teal" />
            <span className="logo-text">ASTRA ZEMPARI CORP</span>
          </div>
          <div className="nav-links">
            <a href="#investors">Investors</a>
            <a href="#catalog">Products</a>
            <a href="#careers">Careers</a>
            <a href="https://kybian.com" className="nav-hub">Relay Hub</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="azc-hero">
        <div className="hero-img-bg" style={{ backgroundImage: `url('/images/azc-hero.png')` }} />
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card hero-card"
          >
            <h1 className="text-gradient">Powering the Future of the Fracture</h1>
            <p>AZC is the leading provider of refined Kybian isotopes. We specialize in safe, high-yield energy solutions for starships, stations, and systems across the galaxy.</p>
            <div className="hero-btns">
              <button className="azc-btn">Refinement Tiers</button>
              <button className="azc-btn azc-btn-secondary">Investor Portal</button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="azc-main">
        {/* Investor Section */}
        <section id="investors" className="investor-section">
          <div className="section-header">
            <BarChart3 className="azc-teal" />
            <h2>Investor Relations</h2>
          </div>
          <div className="investor-grid">
            <div className="glass-card stat-card">
              <TrendingUp className="stat-icon" />
              <h3>+24.8%</h3>
              <p>Alpha-Market Share Growth</p>
            </div>
            <div className="glass-card stat-card">
              <ShieldCheck className="stat-icon" />
              <h3>100%</h3>
              <p>Monopoly in the Shallows</p>
            </div>
            <div className="glass-card chart-card">
              <p className="chart-title">QUARTERLY REFINEMENT OUTPUT</p>
              <div className="simple-chart">
                <div className="bar" style={{ height: '40%' }}></div>
                <div className="bar" style={{ height: '65%' }}></div>
                <div className="bar" style={{ height: '55%' }}></div>
                <div className="bar" style={{ height: '90%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Catalog */}
        <section id="catalog" className="catalog-section">
          <div className="section-header">
            <Package className="azc-teal" />
            <h2>Refinement Catalog</h2>
          </div>
          <div className="product-display glass-card">
            <div className="product-info">
              <h3>PULSE-GRADE KYBIAN</h3>
              <p>Standard Mandate fuel, refined to AZC's proprietary 99.8% purity standard. Safe for Core-class engines.</p>
              <ul className="spec-list">
                <li>Stability Rating: EXCELLENT</li>
                <li>Thermal Limit: 4,200K</li>
                <li>Refinement ID: AZC-ALPHA-01</li>
              </ul>
              <button className="azc-btn">Download Specs</button>
            </div>
            <div className="product-img-wrap">
              <img src="/images/azc-product.png" alt="AZC Pulse Grade" />
            </div>
          </div>
        </section>

        {/* Recruitment */}
        <section id="careers" className="careers-section">
          <div className="section-header">
            <UserPlus className="azc-teal" />
            <h2>Recruitment</h2>
          </div>
          <div className="careers-grid">
            <div className="glass-card career-card">
              <h4>VEIL-DIVER PILOT</h4>
              <p>High-risk, high-reward exploration in the Deep Veil. Standard hazard pay + extraction bonus.</p>
              <div className="card-footer">
                <span className="contract-tag">CONTRACT</span>
                <ArrowRight size={18} />
              </div>
            </div>
            <div className="glass-card career-card">
              <h4>REFINEMENT ENGINEER</h4>
              <p>Optimize Pulse-Grade output at our Lunar stations. Requires Level 4 Mandate Clearance.</p>
              <div className="card-footer">
                <span className="fulltime-tag">FULL-TIME</span>
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="azc-footer">
        <div className="footer-wrap">
          <p>© 342 AF Astra Zempari Corporation. All rights reserved. // A Member of the Global Trade Accord.</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Legal</a>
            <a href="#">Ethics</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

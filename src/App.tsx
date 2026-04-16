import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Package, ArrowRight, ShieldCheck, Globe, TrendingUp, Lock, Wallet, Activity, UserPlus, ChevronRight } from 'lucide-react';
import './App.css';

const stocks = [
  { name: 'AZC', price: '422.14', change: '+2.4%' },
  { name: 'MDT', price: '88.10', change: '-1.2%' },
  { name: 'AXM', price: '12.45', change: '+0.5%' },
  { name: 'KYB-A', price: '842.12', change: '+5.8%' },
  { name: 'KYB-X', price: '1244.00', change: '-3.1%' },
];

function App() {
  const [wealth, setWealth] = useState(1245000);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInput, setLoginInput] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setWealth(prev => prev + Math.floor(Math.random() * 100));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInput.length > 5) setIsLoggedIn(true);
  };

  return (
    <div className="azc-container">
      {/* Market Ticker */}
      <div className="market-ticker">
        <div className="ticker-wrap">
          {stocks.concat(stocks).map((stock, i) => (
            <div key={i} className="ticker-item">
              <span className="stock-name">{stock.name}</span>
              <span className="stock-price">{stock.price}</span>
              <span className={`stock-change ${stock.change.startsWith('+') ? 'up' : 'down'}`}>
                {stock.change}
              </span>
            </div>
          ))}
        </div>
      </div>

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card hero-card"
          >
            <h1 className="text-gradient">Powering the Future of the Fracture</h1>
            <p>AZC is the leading provider of refined Kybian isotopes. We specialize in safe, high-yield energy solutions for starships, stations, and systems across the galaxy.</p>
            <div className="hero-btns">
              <a href="#catalog" className="azc-btn">Refinement Tiers</a>
              <a href="#investors" className="azc-btn azc-btn-secondary">Investor Portal</a>
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
            
            <div className="glass-card login-card">
              {!isLoggedIn ? (
                <div className="login-prompt">
                  <div className="card-top"><Lock size={16} /> SHAREHOLDER LOGIN</div>
                  <form onSubmit={handleLogin}>
                    <input 
                      type="password" 
                      placeholder="ACCESS KEY" 
                      value={loginInput}
                      onChange={(e) => setLoginInput(e.target.value)}
                    />
                    <button type="submit">AUTHENTICATE</button>
                  </form>
                </div>
              ) : (
                <div className="wealth-tracker">
                  <div className="card-top"><Wallet size={16} /> ACCUMULATED WEALTH</div>
                  <div className="wealth-amount">
                    <span className="currency">C</span>
                    {wealth.toLocaleString()}
                  </div>
                  <div className="wealth-growth">REAL-TIME APPRECIATION: +0.02% / SEC</div>
                  <button onClick={() => setWealth(w => w + 500)} className="azc-btn-sm">REINVEST DIVIDENDS</button>
                </div>
              )}
            </div>

            <div className="glass-card chart-card">
              <div className="card-top"><Activity size={16} /> OUTPUT METRICS</div>
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
                <li><ChevronRight size={14} /> Stability Rating: EXCELLENT</li>
                <li><ChevronRight size={14} /> Thermal Limit: 4,200K</li>
                <li><ChevronRight size={14} /> Refinement ID: AZC-ALPHA-01</li>
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
          <p>© 52 AF Astra Zempari Corporation. All rights reserved. // A Member of the Global Trade Accord.</p>
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


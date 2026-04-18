import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, BarChart3, AlertCircle, RefreshCw, Briefcase, DollarSign } from 'lucide-react';
import './VoidTrader.css';

interface PricePoint {
  price: number;
  time: number;
}

const VoidTrader: React.FC = () => {
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  const [balance, setWealth] = useState(10000);
  const [holdings, setHoldings] = useState(0);
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  
  const targetWealth = 100000;
  const maxPriceHistory = 40;
  const priceRef = useRef(100);
  const volatilityRef = useRef(0.05);

  // Refs for repeat action logic
  const balanceRef = useRef(10000);
  const holdingsRef = useRef(0);
  const repeatIntervalRef = useRef<number | null>(null);

  // Keep refs in sync with state for the interval closure
  useEffect(() => { balanceRef.current = balance; }, [balance]);
  useEffect(() => { holdingsRef.current = holdings; }, [holdings]);

  const spawnEvent = useCallback(() => {
    const events = [
      { name: "DIRECTORATE RAID", vol: 0.15, trend: -10 },
      { name: "NEW REFINEMENT PEAK", vol: 0.1, trend: 15 },
      { name: "VEIL STORM DISRUPTION", vol: 0.2, trend: -5 },
      { name: "MANDATE SUBSIDY", vol: 0.08, trend: 8 },
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    setActiveEvent(event.name);
    volatilityRef.current = event.vol;
    priceRef.current += event.trend;
    
    setTimeout(() => {
      setActiveEvent(null);
      volatilityRef.current = 0.05;
    }, 5000);
  }, []);

  const updatePrice = useCallback(() => {
    const change = (Math.random() - 0.5 + (activeEvent ? 0.1 : 0)) * priceRef.current * volatilityRef.current;
    priceRef.current = Math.max(10, priceRef.current + change);
    setCurrentPrice(Math.floor(priceRef.current));
    
    setPriceHistory(prev => {
      const newHistory = [...prev, { price: priceRef.current, time: Date.now() }];
      if (newHistory.length > maxPriceHistory) return newHistory.slice(1);
      return newHistory;
    });
  }, [activeEvent]);

  useEffect(() => {
    let priceInterval: number;
    let eventInterval: number;
    let timerInterval: number;

    if (gameState === 'PLAYING') {
      priceInterval = window.setInterval(updatePrice, 1000);
      eventInterval = window.setInterval(() => {
        if (Math.random() > 0.7) spawnEvent();
      }, 8000);
      
      timerInterval = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGameState('GAMEOVER');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(priceInterval);
      clearInterval(eventInterval);
      clearInterval(timerInterval);
      if (repeatIntervalRef.current) clearInterval(repeatIntervalRef.current);
    };
  }, [gameState, updatePrice, spawnEvent]);

  const startGame = () => {
    setWealth(10000);
    setHoldings(0);
    setPriceHistory([{ price: 100, time: Date.now() }]);
    priceRef.current = 100;
    setTimeRemaining(120);
    setGameState('PLAYING');
  };

  const buy = useCallback(() => {
    if (balanceRef.current >= priceRef.current) {
      setWealth(prev => prev - Math.floor(priceRef.current));
      setHoldings(prev => prev + 1);
      return true;
    }
    return false;
  }, []);

  const sell = useCallback(() => {
    if (holdingsRef.current > 0) {
      setWealth(prev => prev + Math.floor(priceRef.current));
      setHoldings(prev => prev - 1);
      return true;
    }
    return false;
  }, []);

  const startRepeating = (action: () => boolean) => {
    if (gameState !== 'PLAYING') return;
    
    // Initial trigger
    const success = action();
    if (!success) return;

    // Start interval
    if (repeatIntervalRef.current) clearInterval(repeatIntervalRef.current);
    repeatIntervalRef.current = window.setInterval(() => {
      const stillSucceeding = action();
      if (!stillSucceeding) {
        if (repeatIntervalRef.current) clearInterval(repeatIntervalRef.current);
      }
    }, 100); // 10 trades per second
  };

  const stopRepeating = () => {
    if (repeatIntervalRef.current) {
      clearInterval(repeatIntervalRef.current);
      repeatIntervalRef.current = null;
    }
  };

  const maxChartPrice = Math.max(...priceHistory.map(p => p.price), 200);

  return (
    <div className="void-trader-container glass-card">
      <div className="trader-header">
        <div className="header-info">
          <Briefcase size={16} className="azc-teal" />
          <span className="mono">VOID_TRADER_v4.3 // AUTO_EXEC_ENABLED</span>
        </div>
        <div className="timer-box">
          TIME_UNTIL_BLACKOUT: <span className={timeRemaining < 30 ? 'critical' : ''}>{timeRemaining}s</span>
        </div>
      </div>

      <div className="market-view">
        <div className="chart-area">
          <div className="chart-bars">
            {priceHistory.map((p, i) => (
              <div 
                key={i} 
                className="chart-bar" 
                style={{ 
                  height: `${(p.price / maxChartPrice) * 100}%`,
                  backgroundColor: i > 0 && p.price >= priceHistory[i-1].price ? '#4caf50' : '#f44336'
                }} 
              />
            ))}
          </div>
          <div className="price-tag mono">
            {currentPrice} <span className="currency">C</span>
          </div>
          <AnimatePresence>
            {activeEvent && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="market-event"
              >
                <AlertCircle size={14} /> {activeEvent}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="portfolio-area">
          <div className="stat-card-sm">
            <div className="label">AVAILABLE LIQUIDITY</div>
            <div className="value">{balance.toLocaleString()} C</div>
          </div>
          <div className="stat-card-sm">
            <div className="label">KYBIAN HOLDINGS</div>
            <div className="value">{holdings} UNITS</div>
          </div>
          <div className="stat-card-sm highlight">
            <div className="label">TOTAL NET WORTH</div>
            <div className="value">{(balance + (holdings * currentPrice)).toLocaleString()} C</div>
          </div>
          <div className="target-progress">
             <div className="label">TARGET: {targetWealth.toLocaleString()} C</div>
             <div className="progress-bar">
               <motion.div 
                className="progress-fill" 
                animate={{ width: `${Math.min(100, ((balance + (holdings * currentPrice)) / targetWealth) * 100)}%` }}
               />
             </div>
          </div>
        </div>
      </div>

      <div className="trade-controls">
        <button 
          className="trade-btn buy" 
          onMouseDown={() => startRepeating(buy)}
          onMouseUp={stopRepeating}
          onMouseLeave={stopRepeating}
          onTouchStart={() => startRepeating(buy)}
          onTouchEnd={stopRepeating}
          disabled={gameState !== 'PLAYING' || balance < currentPrice}
        >
          BUY_UNIT (HOLD)
        </button>
        <button 
          className="trade-btn sell" 
          onMouseDown={() => startRepeating(sell)}
          onMouseUp={stopRepeating}
          onMouseLeave={stopRepeating}
          onTouchStart={() => startRepeating(sell)}
          onTouchEnd={stopRepeating}
          disabled={gameState !== 'PLAYING' || holdings <= 0}
        >
          SELL_UNIT (HOLD)
        </button>
      </div>

      <AnimatePresence>
        {gameState === 'IDLE' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="trader-overlay">
            <h3>VOID TRADER</h3>
            <div className="manual-box">
              <h4>MARKET PROTOCOL:</h4>
              <ul>
                <li>• KYBIAN PRICE FLUCTUATES IN REAL-TIME</li>
                <li>• HOLD BUY/SELL BUTTONS FOR RAPID EXECUTION</li>
                <li>• REACH 100,000 C BEFORE THE BLACKOUT</li>
                <li>• WATCH FOR MARKET EVENTS</li>
              </ul>
            </div>
            <button onClick={startGame} className="azc-btn">START TRADING</button>
          </motion.div>
        )}

        {gameState === 'GAMEOVER' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="trader-overlay fatal">
            <h3 className="mono">MARKET_CLOSED</h3>
            <div className="final-results">
              <p>FINAL NET WORTH: {(balance + (holdings * currentPrice)).toLocaleString()} C</p>
              { (balance + (holdings * currentPrice)) >= targetWealth ? (
                <p className="success-text">STATUS: PROMOTED TO EXECUTIVE VP</p>
              ) : (
                <p className="error-text">STATUS: LIQUIDATED / ASSETS SEIZED</p>
              )}
            </div>
            <button onClick={startGame} className="azc-btn">RE-AUTH</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoidTrader;

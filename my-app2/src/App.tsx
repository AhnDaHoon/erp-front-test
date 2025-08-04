import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FormTest from './pages/FormTest';
import About from './pages/About';
import './App.css';
import NotUsedHotForm from './pages/NotUsedHotForm';
import SearchFormTest from './pages/SearchFormTest';
import { TabProvider } from './context/TabContext';
import TabBar from './components/TabBar';
import TabRouter from './components/TabRouter';
import TabStateManager from './components/TabStateManager';
import StatefulTabContent from './components/StatefulTabContent';
import Header from './components/Header';

function App() {
  return (
    <TabProvider>
      <Router>
        <TabStateManager>
          <div className="App">
            <Header />
            <div className="app-content">
              <TabBar />
              <StatefulTabContent />
            </div>
          </div>
        </TabStateManager>
      </Router>
    </TabProvider>
  );
}

export default App;

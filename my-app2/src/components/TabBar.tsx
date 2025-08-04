import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTabContext } from '../context/TabContext';
import './TabBar.css';

const TabBar: React.FC = () => {
  const { tabs, closeTab, activateTab } = useTabContext();
  const navigate = useNavigate();

  const handleTabClick = (tabId: string) => {
    const targetTab = tabs.find(tab => tab.id === tabId);
    if (targetTab) {
      activateTab(tabId);
      navigate(targetTab.path);
    }
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    closeTab(tabId);
  };

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="tab-bar">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`tab ${tab.isActive ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.id)}
        >
          <span className="tab-title">{tab.title}</span>
          <button
            className="tab-close"
            onClick={(e) => handleCloseTab(e, tab.id)}
            title="탭 닫기"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabBar; 
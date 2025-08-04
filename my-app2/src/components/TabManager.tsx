import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TabManager.css';

interface Tab {
  id: string;
  title: string;
  path: string;
  isActive: boolean;
  component: React.ComponentType;
}

interface TabManagerProps {
  children: React.ReactNode;
}

const TabManager: React.FC<TabManagerProps> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  // 탭 추가 함수
  const addTab = (path: string, title: string, component: React.ComponentType) => {
    const existingTab = tabs.find(tab => tab.path === path);
    if (existingTab) {
      // 이미 존재하는 탭이면 활성화
      setTabs(prev => prev.map(tab => ({
        ...tab,
        isActive: tab.path === path
      })));
      navigate(path);
      return;
    }

    const newTab: Tab = {
      id: Date.now().toString(),
      title,
      path,
      isActive: true,
      component
    };

    setTabs(prev => prev.map(tab => ({ ...tab, isActive: false })).concat(newTab));
    navigate(path);
  };

  // 탭 닫기 함수
  const closeTab = (tabId: string) => {
    const tabToClose = tabs.find(tab => tab.id === tabId);
    if (!tabToClose) return;

    const newTabs = tabs.filter(tab => tab.id !== tabId);
    
    if (newTabs.length === 0) {
      // 모든 탭이 닫히면 홈으로 이동
      navigate('/');
      setTabs([]);
      return;
    }

    // 닫는 탭이 활성 탭이었다면 다른 탭을 활성화
    if (tabToClose.isActive) {
      const lastTab = newTabs[newTabs.length - 1];
      newTabs[newTabs.length - 1] = { ...lastTab, isActive: true };
      navigate(lastTab.path);
    }

    setTabs(newTabs);
  };

  // 탭 클릭 시 활성화
  const activateTab = (tabId: string) => {
    const targetTab = tabs.find(tab => tab.id === tabId);
    if (!targetTab) return;

    setTabs(prev => prev.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })));
    navigate(targetTab.path);
  };

  // 현재 경로에 따라 탭 상태 업데이트
  useEffect(() => {
    setTabs(prev => prev.map(tab => ({
      ...tab,
      isActive: tab.path === location.pathname
    })));
  }, [location.pathname]);

  return (
    <div className="tab-manager">
      <div className="tab-bar">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${tab.isActive ? 'active' : ''}`}
            onClick={() => activateTab(tab.id)}
          >
            <span className="tab-title">{tab.title}</span>
            <button
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="tab-content">
        {children}
      </div>
    </div>
  );
};

export default TabManager; 
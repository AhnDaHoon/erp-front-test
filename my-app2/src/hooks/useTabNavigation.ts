import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTabContext } from '../context/TabContext';

interface UseTabNavigationReturn {
  openTab: (path: string, title: string, component: React.ComponentType) => void;
  closeTab: (tabId: string) => void;
  switchTab: (tabId: string) => void;
  openOrActivateTab: (path: string, title: string, component: React.ComponentType) => void;
}

export const useTabNavigation = (): UseTabNavigationReturn => {
  const { addTab, closeTab, activateTab, tabs } = useTabContext();
  const navigate = useNavigate();

  const openTab = useCallback((path: string, title: string, component: React.ComponentType) => {
    addTab(path, title, component);
    navigate(path);
  }, [addTab, navigate]);

  const switchTab = useCallback((tabId: string) => {
    const targetTab = tabs.find(tab => tab.id === tabId);
    if (targetTab) {
      activateTab(tabId);
      navigate(targetTab.path);
    }
  }, [activateTab, navigate, tabs]);

  const openOrActivateTab = useCallback((path: string, title: string, component: React.ComponentType) => {
    // 기존 탭이 있는지 확인
    const existingTab = tabs.find(tab => tab.path === path);
    
    if (existingTab) {
      // 기존 탭이 있으면 해당 탭을 활성화
      activateTab(existingTab.id);
      navigate(path);
    } else {
      // 기존 탭이 없으면 새 탭 생성
      addTab(path, title, component);
      navigate(path);
    }
  }, [tabs, activateTab, addTab, navigate]);

  return {
    openTab,
    closeTab,
    switchTab,
    openOrActivateTab
  };
}; 
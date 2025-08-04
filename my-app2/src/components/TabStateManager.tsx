import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTabContext } from '../context/TabContext';

interface TabStateManagerProps {
  children: React.ReactNode;
}

const TabStateManager: React.FC<TabStateManagerProps> = ({ children }) => {
  const { tabs, setTabs } = useTabContext();
  const location = useLocation();

  // 탭 상태를 로컬 스토리지에 저장
  useEffect(() => {
    if (tabs.length > 0) {
      const tabsData = tabs.map(tab => ({
        id: tab.id,
        title: tab.title,
        path: tab.path,
        isActive: tab.isActive
      }));
      localStorage.setItem('react-tabs-state', JSON.stringify(tabsData));
    }
  }, [tabs]);

  // 페이지 로드 시 저장된 탭 상태 복원
  useEffect(() => {
    const savedTabs = localStorage.getItem('react-tabs-state');
    if (savedTabs) {
      try {
        const tabsData = JSON.parse(savedTabs);
        // 현재 경로에 맞는 탭을 활성화
        const updatedTabs = tabsData.map((tab: any) => ({
          ...tab,
          isActive: tab.path === location.pathname
        }));
        setTabs(updatedTabs);
      } catch (error) {
        console.error('탭 상태 복원 실패:', error);
      }
    }
  }, []);

  return <>{children}</>;
};

export default TabStateManager; 
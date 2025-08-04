import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTabContext } from '../context/TabContext';

interface TabRouterProps {
  children: React.ReactNode;
}

const TabRouter: React.FC<TabRouterProps> = ({ children }) => {
  const { tabs, setTabs } = useTabContext();
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 경로에 따라 탭 상태 업데이트
  useEffect(() => {
    setTabs(prev => prev.map(tab => ({
      ...tab,
      isActive: tab.path === location.pathname
    })));
  }, [location.pathname, setTabs]);

  // 탭이 닫혔을 때 라우팅 처리
  useEffect(() => {
    const activeTab = tabs.find(tab => tab.isActive);
    if (!activeTab && tabs.length > 0) {
      // 활성 탭이 없으면 마지막 탭을 활성화
      const lastTab = tabs[tabs.length - 1];
      setTabs(prev => prev.map(tab => ({
        ...tab,
        isActive: tab.id === lastTab.id
      })));
      navigate(lastTab.path);
    } else if (tabs.length === 0) {
      // 모든 탭이 닫히면 홈으로 이동
      navigate('/');
    }
  }, [tabs, navigate, setTabs]);

  return <>{children}</>;
};

export default TabRouter; 
import React, { useState, useEffect, useMemo } from 'react';
import { useTabContext } from '../context/TabContext';
import { getComponentByPath } from '../utils/componentMapper';

interface TabComponentState {
  [tabId: string]: React.ReactNode;
}

const StatefulTabContent: React.FC = () => {
  const { tabs } = useTabContext();
  const [tabComponents, setTabComponents] = useState<TabComponentState>({});

  // 컴포넌트 매핑 함수
  const getComponent = (path: string, tabId: string) => {
    const key = `${path}-${tabId}`;
    const { component: Component } = getComponentByPath(path);
    
    return <Component key={key} />;
  };

  // 탭이 추가될 때 컴포넌트 생성
  useEffect(() => {
    tabs.forEach(tab => {
      if (!tabComponents[tab.id]) {
        setTabComponents(prev => ({
          ...prev,
          [tab.id]: getComponent(tab.path, tab.id)
        }));
      }
    });
  }, [tabs]);

  // 활성 탭 찾기
  const activeTab = tabs.find(tab => tab.isActive);

  // 탭이 없으면 홈 표시
  if (!activeTab || tabs.length === 0) {
    const { component: HomeComponent } = getComponentByPath('/');
    return (
      <div className="tab-content">
        <HomeComponent />
      </div>
    );
  }

  return (
    <div className="tab-content">
      {tabs.map(tab => (
        <div
          key={tab.id}
          style={{
            display: tab.isActive ? 'block' : 'none',
            height: '100%',
            width: '100%'
          }}
        >
          {tabComponents[tab.id]}
        </div>
      ))}
    </div>
  );
};

export default StatefulTabContent; 
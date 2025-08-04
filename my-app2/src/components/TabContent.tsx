import React from 'react';
import { useTabContext } from '../context/TabContext';
import Home from '../pages/Home';
import FormTest from '../pages/FormTest';
import NotUsedHotForm from '../pages/NotUsedHotForm';
import SearchFormTest from '../pages/SearchFormTest';
import About from '../pages/About';

const TabContent: React.FC = () => {
  const { tabs } = useTabContext();

  // 활성 탭 찾기
  const activeTab = tabs.find(tab => tab.isActive);

  if (!activeTab) {
    return (
      <div className="tab-content">
        <Home />
      </div>
    );
  }

  // 경로에 따른 컴포넌트 매핑
  const getComponent = (path: string) => {
    switch (path) {
      case '/':
        return <Home />;
      case '/form':
        return <FormTest />;
      case '/not-used-hot-form':
        return <NotUsedHotForm />;
      case '/search-form':
        return <SearchFormTest />;
      case '/about':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="tab-content">
      {getComponent(activeTab.path)}
    </div>
  );
};

export default TabContent; 
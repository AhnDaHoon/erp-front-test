import React from 'react';
import { useTabNavigation } from '../hooks/useTabNavigation';
import { useMenuAPI } from '../hooks/useMenuAPI';
import { getComponentByPath } from '../utils/componentMapper';
import './Header.css';

const Header: React.FC = () => {
  const { openOrActivateTab } = useTabNavigation();
  const { menuItems, loading, error } = useMenuAPI();

  const handleMenuClick = (path: string) => {
    const { component, title } = getComponentByPath(path);
    openOrActivateTab(path, title, component);
  };

  if (loading) {
    return (
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
            <h1 className="logo-text">React Form Test</h1>
            <span className="logo-subtitle">메뉴 로딩 중...</span>
          </div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
            <h1 className="logo-text">React Form Test</h1>
            <span className="logo-subtitle">메뉴 로드 실패</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* 로고 영역 */}
        <div className="header-logo">
          <h1 className="logo-text">React Form Test</h1>
          <span className="logo-subtitle">Tab System Demo</span>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="header-nav">
          <ul className="nav-menu">
            {menuItems.map(menuItem => (
              <li key={menuItem.path} className="nav-item">
                <button 
                  onClick={() => handleMenuClick(menuItem.path)}
                  className="nav-link"
                >
                  {menuItem.icon} {menuItem.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 우측 영역 */}
        <div className="header-actions">
          <div className="header-info">
            <span className="info-text">React Hook Form + Tab System</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
import { useState, useEffect } from 'react';
import { updateComponentMappingFromAPI } from '../utils/componentMapper';

interface MenuItem {
  path: string;
  title: string;
  componentName?: string;
  icon?: string;
}

interface UseMenuAPIReturn {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  refreshMenu: () => void;
}

// API에서 메뉴 데이터를 가져오는 함수 (실제 API 호출로 대체)
const fetchMenuData = async (): Promise<MenuItem[]> => {
  // 실제 API 호출 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // API에서 받을 수 있는 메뉴 데이터 예시
  return [
    {
      path: '/',
      title: '홈',
      componentName: 'Home',
      icon: '🏠'
    },
    {
      path: '/form',
      title: '폼 예제',
      componentName: 'FormTest',
      icon: '📝'
    },
    {
      path: '/not-used-hot-form',
      title: '폼 예제(Hot Form 사용안함)',
      componentName: 'NotUsedHotForm',
      icon: '🔥'
    },
    {
      path: '/search-form',
      title: '검색 폼 예제',
      componentName: 'SearchFormTest',
      icon: '🔍'
    },
    {
      path: '/about',
      title: '프로젝트 정보',
      componentName: 'About',
      icon: 'ℹ️'
    },
    // 새로운 메뉴 항목 추가 예시
    {
      path: '/new-page',
      title: '새로운 페이지',
      componentName: 'Home', // 임시로 Home 컴포넌트 사용
      icon: '🆕'
    }
  ];
};

export const useMenuAPI = (): UseMenuAPIReturn => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchMenuData();
      setMenuItems(data);
      
      // 컴포넌트 매핑 업데이트
      updateComponentMappingFromAPI(data);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '메뉴 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const refreshMenu = () => {
    fetchMenu();
  };

  return {
    menuItems,
    loading,
    error,
    refreshMenu
  };
}; 
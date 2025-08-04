import React from 'react';
import Home from '../pages/Home';
import FormTest from '../pages/FormTest';
import NotUsedHotForm from '../pages/NotUsedHotForm';
import SearchFormTest from '../pages/SearchFormTest';
import About from '../pages/About';

// 컴포넌트 매핑 인터페이스
interface ComponentMapping {
  [path: string]: {
    component: React.ComponentType;
    title: string;
  };
}

// 동적 컴포넌트 매핑 테이블
const COMPONENT_MAPPING: ComponentMapping = {
  '/': {
    component: Home,
    title: '홈'
  },
  '/form': {
    component: FormTest,
    title: '폼 예제'
  },
  '/not-used-hot-form': {
    component: NotUsedHotForm,
    title: '폼 예제(Hot Form 사용안함)'
  },
  '/search-form': {
    component: SearchFormTest,
    title: '검색 폼 예제'
  },
  '/about': {
    component: About,
    title: '프로젝트 정보'
  }
};

// URL 경로로 컴포넌트와 제목을 가져오는 함수
export const getComponentByPath = (path: string) => {
  const mapping = COMPONENT_MAPPING[path];
  
  if (!mapping) {
    // 매핑이 없으면 기본값 반환
    return {
      component: Home,
      title: '홈'
    };
  }
  
  return mapping;
};

// 모든 경로 목록을 가져오는 함수
export const getAllPaths = () => {
  return Object.keys(COMPONENT_MAPPING);
};

// 컴포넌트 매핑을 동적으로 추가하는 함수
export const addComponentMapping = (path: string, component: React.ComponentType, title: string) => {
  COMPONENT_MAPPING[path] = { component, title };
};

// 컴포넌트 매핑을 제거하는 함수
export const removeComponentMapping = (path: string) => {
  delete COMPONENT_MAPPING[path];
};

// API에서 받은 메뉴 데이터로 컴포넌트 매핑을 업데이트하는 함수
export const updateComponentMappingFromAPI = (menuData: Array<{
  path: string;
  title: string;
  componentName?: string;
}>) => {
  menuData.forEach(menu => {
    // componentName이 있으면 동적으로 컴포넌트를 찾아서 매핑
    if (menu.componentName) {
      const component = getComponentByName(menu.componentName);
      if (component) {
        COMPONENT_MAPPING[menu.path] = {
          component,
          title: menu.title
        };
      }
    }
  });
};

// 컴포넌트 이름으로 컴포넌트를 찾는 함수
const getComponentByName = (componentName: string): React.ComponentType | null => {
  const componentMap: { [key: string]: React.ComponentType } = {
    'Home': Home,
    'FormTest': FormTest,
    'NotUsedHotForm': NotUsedHotForm,
    'SearchFormTest': SearchFormTest,
    'About': About
  };
  
  return componentMap[componentName] || null;
}; 
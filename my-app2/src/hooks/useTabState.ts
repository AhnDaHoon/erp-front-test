import { useState, useEffect, useCallback } from 'react';
import { useTabContext } from '../context/TabContext';

interface TabStateData {
  [key: string]: any;
}

export const useTabState = <T extends TabStateData>(tabId: string, initialState: T) => {
  const { tabs } = useTabContext();
  const [state, setState] = useState<T>(initialState);

  // 탭이 활성화될 때 상태 복원
  useEffect(() => {
    const savedState = localStorage.getItem(`tab-state-${tabId}`);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setState(parsedState);
      } catch (error) {
        console.error('탭 상태 복원 실패:', error);
      }
    }
  }, [tabId]);

  // 상태가 변경될 때마다 저장
  useEffect(() => {
    if (state) {
      localStorage.setItem(`tab-state-${tabId}`, JSON.stringify(state));
    }
  }, [state, tabId]);

  // 탭이 닫힐 때 상태 정리
  useEffect(() => {
    const currentTab = tabs.find(tab => tab.id === tabId);
    if (!currentTab) {
      // 탭이 닫혔으면 상태 삭제
      localStorage.removeItem(`tab-state-${tabId}`);
    }
  }, [tabs, tabId]);

  const updateState = useCallback((newState: Partial<T>) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
    localStorage.removeItem(`tab-state-${tabId}`);
  }, [initialState, tabId]);

  return {
    state,
    setState,
    updateState,
    resetState
  };
}; 
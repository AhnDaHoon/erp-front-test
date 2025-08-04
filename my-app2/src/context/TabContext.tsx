import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Tab {
  id: string;
  title: string;
  path: string;
  isActive: boolean;
  component: React.ComponentType;
}

interface TabContextType {
  tabs: Tab[];
  addTab: (path: string, title: string, component: React.ComponentType) => void;
  closeTab: (tabId: string) => void;
  activateTab: (tabId: string) => void;
  setTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};

interface TabProviderProps {
  children: ReactNode;
}

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);

  const addTab = (path: string, title: string, component: React.ComponentType) => {
    const existingTab = tabs.find(tab => tab.path === path);
    if (existingTab) {
      setTabs(prev => prev.map(tab => ({
        ...tab,
        isActive: tab.path === path
      })));
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
  };

  const closeTab = (tabId: string) => {
    setTabs(prev => {
      const tabToClose = prev.find(tab => tab.id === tabId);
      if (!tabToClose) return prev;

      const newTabs = prev.filter(tab => tab.id !== tabId);
      
      if (newTabs.length === 0) {
        return [];
      }

      if (tabToClose.isActive) {
        const lastTab = newTabs[newTabs.length - 1];
        newTabs[newTabs.length - 1] = { ...lastTab, isActive: true };
      }

      return newTabs;
    });
  };

  const activateTab = (tabId: string) => {
    setTabs(prev => prev.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })));
  };

  const value: TabContextType = {
    tabs,
    addTab,
    closeTab,
    activateTab,
    setTabs
  };

  return (
    <TabContext.Provider value={value}>
      {children}
    </TabContext.Provider>
  );
}; 
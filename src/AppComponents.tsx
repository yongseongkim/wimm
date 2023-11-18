import React, {PropsWithChildren, createContext} from 'react';

interface AppComponents extends PropsWithChildren {}

export const AppComponentsContext = createContext<AppComponents>({});

export const AppComponentsProvider = ({children}: AppComponents) => {
  return (
    <AppComponentsContext.Provider value={{}}>
      {children}
    </AppComponentsContext.Provider>
  );
};

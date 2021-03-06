import React, { useEffect } from "react";
import { useLocalObservable } from "mobx-react";
import { action } from "mobx";

export interface TInitialState {
  loginedIn: boolean;
}

export interface MGlobalStore extends TInitialState {
  login: Function;
  logout: Function;
}

export const INITIAL_STORE: TInitialState = {
  loginedIn: false,
};

export const StoreContext = React.createContext(INITIAL_STORE as MGlobalStore);

export const useGlobalStore = (): MGlobalStore => {
  return React.useContext(StoreContext);
};

export function useGlobalProviderStore() {
  const store = useLocalObservable(() => {
    return {
      ...INITIAL_STORE,
      login: action(() => {
        store.loginedIn = true;
      }),
      logout: action(() => {
        store.loginedIn = false;
      }),
    };
  });

  useEffect(() => {}, []);

  // Return the user object and auth methods
  return store;
}

export function ProvideStore({ children }: { children: React.ReactNode }) {
  const globalStore = useGlobalProviderStore();
  return <StoreContext.Provider value={globalStore}> {children} </StoreContext.Provider>;
}

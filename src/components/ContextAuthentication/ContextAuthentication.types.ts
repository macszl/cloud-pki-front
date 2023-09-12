import { Dispatch, ReactNode, SetStateAction } from 'react';

export type AuthenticationContextProviderProps = {
  children: ReactNode;
};

export type AuthenticationContextProps = {
  isAuthenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  name: string | null;
  setName: Dispatch<SetStateAction<string | null>>;
};

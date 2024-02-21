import React, { createContext, useState } from 'react';
import { User } from '../types';

interface MeContext {
  me: User | null;
  setMe: (user: User | null) => void;
}

interface UserProvider {
  children: React.ReactNode;
}

// Create the MeContext
export const MeContext = createContext<MeContext>({} as MeContext);
const { Provider } = MeContext;

// Create the MeProvider component
export const MeProvider = ({ children }: UserProvider) => {
  const [me, setMe] = useState<User | null>(null);

  return <Provider value={{ me, setMe }}>{children}</Provider>;
};

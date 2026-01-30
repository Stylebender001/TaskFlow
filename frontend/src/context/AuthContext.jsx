import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  role: null,
  login: () => {},
  logout: () => {},
  completeProfile: () => {}, // Add this
});
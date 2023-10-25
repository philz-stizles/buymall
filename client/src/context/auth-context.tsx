/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from "react";
import { User } from "../models/user";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: (_user: User) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = useCallback((user: User) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: currentUser, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

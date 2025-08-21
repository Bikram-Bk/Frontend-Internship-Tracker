"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useMe } from "../api/use-me";

interface User {
  email: string;
  username: string;
  phone?: string | null;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (auth: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data, error, refetch, isLoading } = useMe();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      setAuthenticated(false);
      setLoading(false);
    }
    // If token exists, loading state will be controlled by useMe's isLoading
  }, []);

  // Update loading state based on useMe's loading
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (data?.success) {
      const { email, username, phone, avatar, createdAt, updatedAt } =
        data.data;
      setUser({ email, username, phone, avatar, createdAt, updatedAt });
      setAuthenticated(true);
    } else if (error) {
      setUser(null);
      setAuthenticated(false);
      localStorage.removeItem("accessToken");
    }
  }, [data, error]);

  return (
    <AuthContext.Provider
      value={{ user, authenticated, loading, setUser, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

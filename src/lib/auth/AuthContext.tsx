import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  bypassAuth: () => void;
  setIsDevMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Development mode mock user
const DEV_USER: User = {
  id: "dev-user-id",
  email: "dev@example.com",
  name: "Development User",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const bypassAuth = () => {
    if (isDevMode) {
      setUser(DEV_USER);
      const fakeToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTc0NTQ0NzY0OCwiaWF0IjoxNzQ1NDQ3NjQ4fQ._fWs9pTzroEEqV982rbyOZRGu1w77L5hRGiH1DlS5Cc";
      setToken(fakeToken);
      localStorage.setItem("token", "dev-token");
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token || (isDevMode && !!user),
    login,
    logout,
    bypassAuth,
    setIsDevMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

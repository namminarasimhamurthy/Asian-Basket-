// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import axios from "axios";
// import { User } from "@/types";

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (
//     email: string,
//     password: string,
//   ) => Promise<{ success: boolean; error?: string }>;
//   register: (
//     name: string,
//     email: string,
//     phone: string,
//     password: string,
//   ) => Promise<{ success: boolean; error?: string }>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const CURRENT_USER_KEY = "fow_current_user";
// const API_BASE = "http://127.0.0.1:8000/api/auth";

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   /* ================================
//      LOAD USER ON REFRESH
//   ================================ */
//   useEffect(() => {
//     const savedUser = localStorage.getItem(CURRENT_USER_KEY);

//     if (savedUser) {
//       try {
//         const parsedUser = JSON.parse(savedUser);
//         setUser(parsedUser);
//       } catch {
//         localStorage.removeItem(CURRENT_USER_KEY);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   /* ================================
//      LOGIN  (JWT added only)
//   ================================ */
//   const login = async (email: string, password: string) => {
//     try {
//       const res = await axios.post(`${API_BASE}/login/`, {
//         email,
//         password,
//       });

//       /* 🔑 SAVE TOKENS */
//       if (res.data.access) {
//         localStorage.setItem("access", res.data.access);
//         localStorage.setItem("refresh", res.data.refresh);
//       }

//       const loggedUser: User = {
//         id: res.data.user?.id || res.data.id,
//         email: res.data.user?.email || res.data.email,
//         name: res.data.user?.full_name || res.data.full_name,
//         phone: res.data.user?.phone || res.data.phone || "",
//       };

//       setUser(loggedUser);
//       localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedUser));

//       return { success: true };
//     } catch (error: any) {
//       return {
//         success: false,
//         error:
//           error?.response?.data?.detail ||
//           error?.response?.data?.non_field_errors?.[0] ||
//           "Invalid email or password",
//       };
//     }
//   };
//   // Add this to AuthContext.tsx AFTER login()
//   useEffect(() => {
//     const refreshAccessToken = async () => {
//       try {
//         const refreshToken = localStorage.getItem("refresh");
//         if (!refreshToken) return;

//         const res = await axios.post(`${API_BASE}/refresh/`, {
//           refresh: refreshToken,
//         });

//         if (res.data.access) {
//           localStorage.setItem("access", res.data.access);
//           // Re-fetch user data if needed
//         }
//       } catch (err) {
//         logout(); // Refresh failed, full logout
//       }
//     };

//     // Refresh every 14 minutes (access token ~15min)
//     const interval = setInterval(refreshAccessToken, 14 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   /* ================================
//      REGISTER (unchanged)
//   ================================ */
//   const register = async (
//     name: string,
//     email: string,
//     phone: string,
//     password: string,
//   ) => {
//     try {
//       await axios.post(`${API_BASE}/register/`, {
//         full_name: name,
//         email,
//         phone,
//         password,
//       });

//       return { success: true };
//     } catch (error: any) {
//       return {
//         success: false,
//         error: error?.response?.data?.email?.[0] || "Registration failed",
//       };
//     }
//   };

//   /* ================================
//      LOGOUT (JWT clear added)
//   ================================ */
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem(CURRENT_USER_KEY);
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         login,
//         register,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }
//   return context;
// };

// AuthContext.tsx - Replace ENTIRE file
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/lib/axios"; // ✅ Use api instance
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    phone: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = "fow_current_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("auth/login/", { email, password });

      // ✅ Extract tokens & user
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // const loggedUser: User = res.data.user;
      const loggedUser: User = {
        id: res.data.user.id,
        email: res.data.user.email,
        name: res.data.user.full_name, // 👈 CRITICAL FIX HERE
        phone: res.data.user.phone || "",
      };
      setUser(loggedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedUser));

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || "Invalid email or password",
      };
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const newUser = { ...user, ...data };
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  };
  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string,
  ) => {
    try {
      await api.post("auth/register/", {
        full_name: name,
        email,
        phone,
        password,
      });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.email?.[0] || "Registration failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

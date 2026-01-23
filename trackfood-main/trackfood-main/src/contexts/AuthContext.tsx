// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import axios from 'axios';
// import { User } from '@/types';

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
//   register: (
//     name: string,
//     email: string,
//     phone: string,
//     password: string
//   ) => Promise<{ success: boolean; error?: string }>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const CURRENT_USER_KEY = 'fow_current_user';
// const API_BASE = 'http://127.0.0.1:8000/api/auth';

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // 🔹 Load user on refresh
//   useEffect(() => {
//     const savedUser = localStorage.getItem(CURRENT_USER_KEY);
//     if (savedUser) {
//       try {
//         setUser(JSON.parse(savedUser));
//       } catch {
//         localStorage.removeItem(CURRENT_USER_KEY);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   // 🔐 LOGIN
//   const login = async (email: string, password: string) => {
//     try {
//       const res = await axios.post(`${API_BASE}/login/`, {
//         email,
//         password,
//       });

//       const loggedUser: User = {
//         id: res.data.id,
//         email: res.data.email,
//         name: res.data.full_name,
//         phone: res.data.phone ?? '',
//         //createdAt: new Date().toISOString(),
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
//           'Invalid email or password',
//       };
//     }
//   };

//   // 📝 REGISTER
//   const register = async (name: string, email: string, phone: string, password: string) => {
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
//         error:
//           error?.response?.data?.email?.[0] ||
//           'Registration failed',
//       };
//     }
//   };

//   // 🚪 LOGOUT
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem(CURRENT_USER_KEY);
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
//     throw new Error('useAuth must be used inside AuthProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = 'fow_current_user';
const API_BASE = 'http://127.0.0.1:8000/api/auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔍 LOAD USER ON REFRESH
  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    console.log('AUTH INIT - localStorage user:', savedUser);

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('AUTH INIT - parsed user:', parsedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('AUTH INIT - failed to parse user', err);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  // 🔍 WATCH USER STATE CHANGES
  useEffect(() => {
    console.log('AUTH CONTEXT USER UPDATED:', user);
    console.log('AUTH CONTEXT isAuthenticated:', !!user);
  }, [user]);

  // 🔐 LOGIN
  const login = async (email: string, password: string) => {
    try {
      console.log('LOGIN ATTEMPT:', { email });

      const res = await axios.post(`${API_BASE}/login/`, {
        email,
        password,
      });

      console.log('LOGIN API RESPONSE:', res.data);

      const loggedUser: User = {
        id: res.data.id,
        email: res.data.email,
        name: res.data.full_name,
        phone: res.data.phone ?? '',
      };

      console.log('SETTING USER IN CONTEXT:', loggedUser);

      setUser(loggedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedUser));

      return { success: true };
    } catch (error: any) {
      console.error('LOGIN ERROR:', error?.response?.data);
      return {
        success: false,
        error:
          error?.response?.data?.detail ||
          error?.response?.data?.non_field_errors?.[0] ||
          'Invalid email or password',
      };
    }
  };

  // 📝 REGISTER
  const register = async (name: string, email: string, phone: string, password: string) => {
    try {
      console.log('REGISTER ATTEMPT:', { email });

      await axios.post(`${API_BASE}/register/`, {
        full_name: name,
        email,
        phone,
        password,
      });

      console.log('REGISTER SUCCESS');

      return { success: true };
    } catch (error: any) {
      console.error('REGISTER ERROR:', error?.response?.data);
      return {
        success: false,
        error:
          error?.response?.data?.email?.[0] ||
          'Registration failed',
      };
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    console.log('LOGOUT CALLED');
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};


// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from 'react';
// import axios from 'axios';
// import { User } from '@/types';

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (
//     email: string,
//     password: string
//   ) => Promise<{ success: boolean; error?: string }>;
//   register: (
//     name: string,
//     email: string,
//     phone: string,
//     password: string
//   ) => Promise<{ success: boolean; error?: string }>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const CURRENT_USER_KEY = 'fow_current_user';
// const API_BASE = 'http://127.0.0.1:8000/api/auth';

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   /* ================================
//      LOAD USER ON APP START
//   ================================ */
//   useEffect(() => {
//     const savedUser = localStorage.getItem(CURRENT_USER_KEY);

//     if (savedUser) {
//       try {
//         const parsedUser: User = JSON.parse(savedUser);
//         setUser(parsedUser);
//       } catch {
//         localStorage.removeItem(CURRENT_USER_KEY);
//       }
//     }

//     // ✅ IMPORTANT: mark auth as ready
//     setIsLoading(false);
//   }, []);

//   /* ================================
//      LOGIN
//   ================================ */
//   const login = async (email: string, password: string) => {
//     try {
//       const res = await axios.post(`${API_BASE}/login/`, {
//         email,
//         password,
//       });

//       const loggedUser: User = {
//         id: res.data.id,
//         email: res.data.email,
//         name: res.data.full_name,
//         phone: res.data.phone ?? '',
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
//           'Invalid email or password',
//       };
//     }
//   };

//   /* ================================
//      REGISTER
//   ================================ */
//   const register = async (
//     name: string,
//     email: string,
//     phone: string,
//     password: string
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
//         error: error?.response?.data?.email?.[0] || 'Registration failed',
//       };
//     }
//   };

//   /* ================================
//      LOGOUT
//   ================================ */
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem(CURRENT_USER_KEY);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading, // ✅ expose loading state
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
//     throw new Error('useAuth must be used inside AuthProvider');
//   }
//   return context;
// };


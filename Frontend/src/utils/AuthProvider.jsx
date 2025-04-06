import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: null, 
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const checkUser = async () => {
    try {
      const res = await fetch(`${apiUrl}auth/user/verify`, {
        method: "GET",
        credentials: "include",

      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAuth({ isAuthenticated: true, user: data.user }); 
      } else {
        setAuth({ isAuthenticated: false, user: null });
      }
    } catch (err) {
      console.error("Error verifying user:", err);
      setAuth({ isAuthenticated: false, user: null });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;



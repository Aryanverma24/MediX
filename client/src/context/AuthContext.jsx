import { createContext, useState, useEffect } from "react";
import API from "../utils/api";
import { MessageSquare } from "lucide-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchMe = async () => {
    const token = localStorage.getItem("token");

    if(!token){
      setUser(null);
      setLoadingUser(false);
      return;
    }

    try {
      const res = await API.get('/user/me');
      if (!res) {
        setUser(null);
        setLoadingUser(false);
      }

      if (res.data && res.data.success && res.data.user) {
        setUser(res.data.user);
        setLoadingUser(false);
      }
      else{
        setUser(null);
        localStorage.removeItem("token")
        setLoadingUser(false);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      localStorage.removeItem("token")
    }finally{
      setLoadingUser(false);
    }
  }

  useEffect(() => {
    fetchMe();
  }, [])

  const login = async (data) => {
    try {
      console.log("Login payload:", data);

      const res = await API.post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      console.log("Login response:", res);

      if (res.data.success) {
        setUser(res.data.user);
      }

      return res.data;
    } catch (error) {
      console.error("LOGIN FRONTEND ERROR ", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout', {}, { withCredentials: true });
      //clearing local storage
       localStorage.removeItem('token');
       //clearing cookie
       document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      // The cookie will be cleared by the server
    }
  }

  const register = async (data) => {
    try {
      const res = await API.post('/auth/register', data, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      console.log(res)
  
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        
        if (res?.data?.user) {
          setUser(res?.data?.user);
        } else {
          await fetchMe();
        }
        
        return {
          success: true, 
            message: res.data.message || 'Registration successful!',
            user: res.data.user, 
            token: res.data.token
        }
      }
      
      const errorMessage = res.data?.message || 'Registration failed. Please try again.';
      return { 
        success: false, 
        message: errorMessage
      };
      
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || 
                             error.message || 
                             "Registration failed. Please try again.";
      return {
        success: false,
        message: errorMessage
      };
    }
  }

  const updateLocalUser = (updatedUser) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUser
    }));
  }

  const updateUser = async (user) => {
    const res = await API.put('/user/me', user);
    if (res.data.success) {
      setUser(res.data.user);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateLocalUser,
        updateUser,
        fetchMe,
        loading: loadingUser
      }}
    >
      {loadingUser ? <div>Loading Authentication...</div> : children}
    </AuthContext.Provider>
  )
}
import axios from "axios";
import { createContext, useContext,useState } from "react"
export const AuthContext=createContext();
export const API_BASE_URL="https://musifybackend-production-f08a.up.railway.app";
export const useAuth=()=>{
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

export const AuthProvider=({children})=>{
    
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("userData");
        return storedUser ? JSON.parse(storedUser) : null;
    })
    const [token, setToken] = useState(() => {
        return localStorage.getItem("userToken");
    })
    // const [loading, setLoading] = useState(false)
    const register= async (email,password)=>{
        try {
            console.log(email,password)
            const response=await axios.post(`${API_BASE_URL}/api/auth/register`,{email,password});
            if(response.status===200){
                return {
                    success:true,
                    message:"Registration successful"
                }
            }
            else{
                return {
                    success:false,
                    message:response.data.message || "Registration failed"
                }
            }
        } catch (error) {
            return {
                    success:false,
                    message:error.response.data || "Network error. Please try again"
                }
        }
    }
    const login=async(email,password)=>{
        try {
            const response=await axios.post(`${API_BASE_URL}/api/auth/login`,{email,password,portal:'user'})
            if(response.status===200){
                setToken(response.data.token);
                setUser({email:response.data.email,role:response.data.role});
                localStorage.setItem("userToken",response.data.token)
                localStorage.setItem("userData",JSON.stringify({email:response.data.email,role:response.data.role}))
                return {success:true}
            }
            else{
                return{
                    success:false,
                    message:response.data.message||'Login failed'
                }
            }
        } catch (error) {
            return {success:false,message:error.response.data||"Network error. Please try again"}
        }
    }
    const isAuthenticated=()=>{
        return !!user&&!!token
    }

    const logout=()=>{
        setToken(null);
        setUser(null)
        localStorage.removeItem("userToken")
        localStorage.removeItem("userData")
    }

    const getAuthHeaders=()=>{
        return token ? {Authorization:`Bearer ${token}`}:{};
    }

    const contextValue={
        register,
        login,
        isAuthenticated,
        logout,
        user,
        token,
        getAuthHeaders
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )

}
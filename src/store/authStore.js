import{create} from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    message:null,

    signup: async (email, password, name)=>{
        set({ isLoading:true, error:null });
        try {
            const response = await axios.post(`${API_URL}/signup`,{email, password, name});
            set({user:response.data.user, isAuthenticated: true, isLoading:false});
             return response.data; // ✅ so SignupPage can continue safely

        } catch (error) {
            set({error:error.response.data.message || "Error signing up ",isLoading:false});
            throw error;
        }
    },
    login: async (email, password)=>{
          set({ isLoading:true, error:null });
        try {
            const response = await axios.post(`${API_URL}/login`,{email, password, name});
            set({user:response.data.user, isAuthenticated: true, error: null, isLoading:false});
        } catch (error) {
            set({error:error.response?.data?.message || "Error signing up ",isLoading: false});
            throw error;
        } 
    },

    logout: async()=>{
        set({isLoading: true, error:null });
        try {
            axios.post(`${API_URL}/logout`);
            set({user: null, isAuthenticated: false, isLoading:false, error: null });
        } catch (error) {
            set({eooer : "Error logout", isLoading: false });
            throw error;
        }
    },

    verifyEmail: async (code)=>{
        set({ isLoading:true, error:null });
        try {
            const reponse = await axios.post(`${API_URL}/verify-email`,{ code });
            set({user: reponse.data.user, isAuthenticated: true, isLoading: false});
            return reponse.data;
        } catch (error) {
            set({error:error.response.data.message || "Error verifying email", isLoading:false});
            throw error;
        }
    },
    checkAuth: async()=>{ 
     set({ isCheckingAuth: true, error: null});
    try {
        const response = await axios.get(`${API_URL}/check-auth`);
        set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
        set({ error: null, isAuthenticated: false, isCheckingAuth: false });
    }
    },
    forgotPassword: async(email)=>{ 
        set({ isLoading:true, error:null, message:null });
        try {
            const responce = await axios.post(`${API_URL}/forgot-password`,{ email });
            set({ message: responce.data.message, isLoading:false });
        } catch (error) {
            set({ isLoading: false,error: error.response?.data?.message || "Error in forgot password" });
            throw error;
        }
    },
    resetPassword: async(token, password)=>{
        set({ isLoading:true, error:null, message:null });
        try {
            const responce = await axios.post(`${API_URL}/reset-password/${token}`,{ password });
            set({ message: responce.data.message, isLoading:false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error in reset password",
            });
            throw error;
        }
    }
}));
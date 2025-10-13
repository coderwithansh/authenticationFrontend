import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmailVarificationPage from "./pages/EmailVarificationPage";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgorPasswordPage from "./pages/ForgorPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

//protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

//redirect to home page if already authenticated
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated , user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
    }
  return children;
};
function App() {
  const { isCheckingAuth, checkAuth } =useAuthStore();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div 
    className='min-h-screen bg-gradient-to-br 
    from-blue-900 via-gray-900 to-red-900 flex items-center justify-center relative 
    overflow-hidden'>

      <FloatingShape color="bg-blue-500" size="w-64 h-64" top="5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-line-500" size="w-32 h-32" top="40%" left="10%" delay={3} /> 
      <FloatingShape color="bg-rose-500" size="w-26 h-26" top="25%" left="10%" delay={2} /> 
      <FloatingShape color="bg-blue-500" size="w-20 h-20" top="18%" left="5%" delay={1} /> 

      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
             <DashboardPage/> 
          </ProtectedRoute>
          } 
        />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser> 
            <SignupPage/> 
          </RedirectAuthenticatedUser>
          } 
        />
        <Route path="/login" element={
          <RedirectAuthenticatedUser> 
            <LoginPage/> 
          </RedirectAuthenticatedUser>
          } 
        />
        <Route path="/verify-email" element={<EmailVarificationPage/>} />
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
          <ForgorPasswordPage />
        </RedirectAuthenticatedUser>} />
        <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser>
          <ResetPasswordPage />
        </RedirectAuthenticatedUser>}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

import { motion } from 'framer-motion';
import Input from '../components/Input';
import { Mail, User, Lock, Loader } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/authStore';

const SignupPage = () => {
    //useState
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { signup, error, isLoading }= useAuthStore();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await signup(email, password, name);
            navigate("/verify-email");
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <motion.div
    initial={{ opacity: 0,y:20}}
    animate={{ opacity: 1,y:0 }}
    transition={{ duration: 0.5 }}
    className="max-w-md w-full bg-indigo-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
    overflow-hidden"
    >
    <div className='p-8'>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-600 to-blue-400
        text-transparent bg-clip-text"
        >
            Create Account
        </h2>
        <form onSubmit={handleSignUp}>
            <Input icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <Input icon={Mail}
            type="text"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <Input icon={Lock}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
           <PasswordStrengthMeter password={password} />
            
            <motion.button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-red-300 text-white
            font-bold rounded-lg hover:from-red-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-6
            focus:ring-offset-yellow-900 transition duration-400"
            whileHover={{ scale: 1.05 }}
            whileTop={{ scale: 0.98 }}
            disabled={isLoading}
            >
                {isLoading ? <Loader className="animate-spin mx-auto" size={24}/> : "Sign Up"}
            </motion.button>
        </form>
    </div>
    <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
    <p className='text-sm text-gray-400'>
        Already have an account?{" "} 
       <Link to="/login" className="text-pink-400 hover:underline">
       Login</Link>
    </p>
    </div>
    </motion.div>
  )
}

export default SignupPage

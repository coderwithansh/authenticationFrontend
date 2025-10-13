import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader} from 'lucide-react'
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {

  //usestate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, isLoading, error } = useAuthStore();
  
  const hendleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  }
  return (
   <motion.div
   initial={{opacity: 0, y: 20}}
   animate={{opacity: 1, y: 0}}
   transition={{duration: 0.5}}
   className="max-w-md w-full bg-indigo-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
   overflow-hidden"
   >
    <div className="p-8">
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-600 to-blue-400 
      text-transparent bg-clip-text'>
        Welcome Back
      </h2>
      <form onSubmit={hendleLogin}>
        <Input icon={Mail} 
               type="text" 
               placeholder="Email" 
               value={email} 
               onChange={(e) => setEmail(e.target.value)}
               />
        <Input icon={Lock} 
               type="password" 
               placeholder="Password" 
               value={password} 
               onChange={(e) => setPassword(e.target.value)}
               />
        <div className='flex item-center mb-6'>
          <Link to='/forgot-password' className='text-sm text-pink-400 hover:underline'>
          Forgot Password?
          </Link>
        </div>

        {error && <p className='text-red-500 mb-2 font-semibold '>{error}</p>} 
        
         <motion.button
            type="submit"
            className=" w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-red-300 text-white
            font-bold rounded-lg hover:from-red-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-6
            focus:ring-offset-yellow-900 transition duration-400"
            whileHover={{ scale: 1.02 }}
            whileTop={{ scale: 0.98 }}
            disabled={isLoading}
            >
            
            {isLoading ? <Loader className='w-6 h-6 animate-spin text-center mx-auto' /> : 'Login'}
            </motion.button>
      </form>
    </div>
     <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
    <p className='text-sm text-gray-400'>
        Don't have an account?{" "} 
       <Link to="/signup" className="text-pink-400 hover:underline">
       Sign up</Link>
    </p>
    </div>
   </motion.div>
  )
}

export default LoginPage

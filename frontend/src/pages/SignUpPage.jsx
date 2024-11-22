import React, { useState } from 'react'
import { Loader, Lock, Mail, User } from 'lucide-react'
import Input from '../components/Input.jsx'
import {motion} from 'framer-motion'
import {Link, useNavigate} from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter.jsx'
import { useAuthStore } from '../store/authStore.jsx'

const SignUpPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { signup,error,isLoading } = useAuthStore()

  const handleSignUp = async (e) => {
    e.preventDefault();
      
    try {
      await signup(email,password,name);
      navigate('/verify-email');
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <motion.div initial={{opacity:0,y:0.9}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className='max-w-md w-full bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-xl shadow-xl overflow-hidden'>
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Create Account
        </h2>
        <form onSubmit={handleSignUp}>
          <Input icon={User}
            type='text'
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input icon={Mail}
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

          {/* password strength meter */}
          <PasswordStrengthMeter password={password}/>

          <motion.button className='mt-5 w-full py-3 px-4 to-emerald-500 from-green-400 bg-gradient-to-r text-black font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2  transition duration-200 hover:from-green-400 hover:to-emerald-500'  whileHover={{scale:1.05}} whileFocus={{scale : 1.02}} whileTap={{scale : 0.98}} type='submit' disabled={isLoading}>
            {isLoading ? <Loader className='animate-spin mx-auto'/>: "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className='px-6 py-2 pt-0 flex justify-center items-center'>
        <p className='text-sm text-black'>
          Already have an account?{" "}
          <Link to={"/login"} className='hover:underline text-red-500'>
          Login</Link>
        </p>
      </div>
    </motion.div>
  )
}

export default SignUpPage
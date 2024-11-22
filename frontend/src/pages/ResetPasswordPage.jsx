import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion'
import Input from '../components/Input';
import { Lock } from 'lucide-react';
import toast from "react-hot-toast"

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const { resetPassword, error, isLoading, message } = useAuthStore()

    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            alert("Passwords do not match")
            return;
        }
        try {
            await resetPassword(token,password);

            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(()=>{
                navigate('/login')
            },2000)
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Error resetting password");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-xl shadow-xl overflow-hidden'
        >

            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparen bg-clip-text text-green-400'>
                    Reset Password
                </h2>
                {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        repuired
                    />

                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        repuired
                    />

                    <motion.button className='mt-5 w-full py-3 px-4 to-emerald-500 from-green-400 bg-gradient-to-r text-black font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2  transition duration-200 hover:from-green-400 hover:to-emerald-500' whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type='submit' disabled={isLoading}>
                        {isLoading ? "Reseting..." : "Set New Password"}
                    </motion.button>
                </form>
            </div>

        </motion.div>
    )
}

export default ResetPasswordPage
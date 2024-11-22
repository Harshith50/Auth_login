import React from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { formatDate } from '../utils/date'

const Home = () => {
    const { user,logout } = useAuthStore()
    const handleLogout = () => {
        logout()
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full mx-auto mt-8 p-8  bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <h2 className='text-3xl font-bold mb-6  text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                Home Page
            </h2>

            <div className=' space-y-6'>
                <motion.div className='p-4  bg-gray-200 bg-opacity-50 rounded-lg border placeholder-gray-400 border-gray-700 transition duration-200'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className='text-xl font-semibold text-black mb-3'>User Details</h3>
                    <p className='text-black'>Name : {user.name}</p>
                    <p className='text-black'>Email : {user.email}</p>

                </motion.div>
                <motion.div
                    className='p-4 bg-gray-200 bg-opacity-50 rounded-lg border border-gray-700'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className='text-xl font-semibold text-black mb-3'>Account Activity</h3>
                    <p className='text-black'>
                        <span className='font-bold'>Joined : </span>
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </p>
                    <p className='text-black'>
                        <span className='font-bold'>Last Login : </span>

                        {user.lastLogin ? formatDate(user.lastLogin) : "You just signed in"}
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='mt-4'
            >

                <motion.button className='mt-5 w-full py-3 px-4 to-emerald-500 from-green-400 bg-gradient-to-r text-black font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2  transition duration-200 hover:from-green-400 hover:to-emerald-500' whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleLogout}>
                    <span className='text-lg font-bold'>Logout</span>
                </motion.button>

            </motion.div>
        </motion.div>
    )
}

export default Home

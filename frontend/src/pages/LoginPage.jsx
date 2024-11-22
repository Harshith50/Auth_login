import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";


const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault()
		await login(email, password)
	}



	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8 '>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Welcome Back
				</h2>
				<div className="relative w-full">
					<form onSubmit={handleLogin} >
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
							icon={Lock}
							type= 'password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}

						/>

						<div className='flex items-center mb-6'>
							<Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
								Forgot password?
							</Link>
						</div>
						{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

						<motion.button className='mt-5 w-full py-3 px-4 to-emerald-500 from-green-400 bg-gradient-to-r text-black font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2  transition duration-200 hover:from-green-400 hover:to-emerald-500' whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type='submit' disabled={isLoading}>
							{isLoading ? <Loader className='animate-spin mx-auto' /> : "Login"}
						</motion.button>
					</form>
				</div>
			</div>
			<div className='px-8 py-4 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-black'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-red-500 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
		</motion.div>
	);
};
export default LoginPage;
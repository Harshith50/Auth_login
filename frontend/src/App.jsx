import { Navigate, Route, Routes } from 'react-router-dom'
import React, { useEffect } from 'react'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'

import { Toaster } from "react-hot-toast"
import { useAuthStore } from './store/authStore.jsx'
import LoadingSpinner from './components/LoadingSpinner'
import Home from './pages/Home.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'


// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to='login' replace />
  }

  if (!user.isVerifed) {
    return <Navigate to='/verify-email' replace />
  }

  return children;
}


// redirect authencticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (isAuthenticated && user.isVerifed) {
    return <Navigate to='/' replace />
  }
  return children
}

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <LoadingSpinner />


  return (
    <>    
      <div className='min-h-screen bg-gradient-to-br flex justify-center items-center relative overflow-hidden'>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          } /> 
          <Route path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/login" element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
          />
          <Route path='/verify-email'
            element={<EmailVerificationPage />}
          />

          <Route path='/forgot-password' element={<RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>} />

          <Route path='/reset-password/:token'
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>

  )
}

export default App

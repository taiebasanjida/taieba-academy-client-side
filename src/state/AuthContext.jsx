import { createContext, useContext, useEffect, useState } from 'react'
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  getAuth,
  fetchSignInMethodsForEmail
} from 'firebase/auth'
import { auth } from '../utils/firebase'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
        setLoading(false)
      },
      (error) => {
        console.error('Auth state change error:', error)
        setLoading(false)
      }
    )
    
    return () => unsubscribe()
  }, [])

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error) {
      console.error('Login error:', error)
      
      // Handle specific Firebase auth errors with user-friendly messages
      if (error.code === 'auth/user-not-found') {
        const customError = new Error('No account found with this email. Please register first.')
        customError.code = error.code
        throw customError
      } else if (error.code === 'auth/invalid-credential') {
        // Firebase uses invalid-credential for both wrong password and non-existent email
        // Check if email exists to provide specific error message
        try {
          const signInMethods = await fetchSignInMethodsForEmail(auth, email)
          if (signInMethods.length === 0) {
            // Email doesn't exist
            const customError = new Error('No account found with this email. Please register first.')
            customError.code = 'auth/user-not-found'
            throw customError
          } else {
            // Email exists but password is wrong
            const customError = new Error('Incorrect password. Please try again or reset your password.')
            customError.code = error.code
            throw customError
          }
        } catch (checkError) {
          // If fetchSignInMethodsForEmail fails, assume wrong password
          const customError = new Error('Incorrect password. Please try again or reset your password.')
          customError.code = error.code
          throw customError
        }
      } else if (error.code === 'auth/wrong-password') {
        const customError = new Error('Incorrect password. Please try again or reset your password.')
        customError.code = error.code
        throw customError
      } else if (error.code === 'auth/invalid-email') {
        const customError = new Error('Invalid email address. Please check your email format.')
        customError.code = error.code
        throw customError
      } else if (error.code === 'auth/too-many-requests') {
        const customError = new Error('Too many failed attempts. Please try again later or reset your password.')
        customError.code = error.code
        throw customError
      } else if (error.code === 'auth/user-disabled') {
        const customError = new Error('This account has been disabled. Please contact support.')
        customError.code = error.code
        throw customError
      }
      
      throw error
    }
  }

  const registerWithEmail = async (name, photoURL, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (result.user) {
        if (name || photoURL) {
          await updateProfile(result.user, {
            displayName: name || undefined,
            photoURL: photoURL || undefined,
          })
        }
        // Refresh user data
        setUser({ ...result.user, displayName: name, photoURL })
      }
      return result.user
    } catch (error) {
      console.error('Registration error:', error)
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        // Email already registered, suggest login or Google sign in
        const customError = new Error(
          'This email is already registered. Please login instead, or use Google sign in if you registered with Google.'
        )
        customError.code = error.code
        throw customError
      } else if (error.code === 'auth/weak-password') {
        const customError = new Error('Password is too weak. Please use a stronger password.')
        customError.code = error.code
        throw customError
      } else if (error.code === 'auth/invalid-email') {
        const customError = new Error('Invalid email address. Please check your email.')
        customError.code = error.code
        throw customError
      }
      
      throw error
    }
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account',
      })
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (error) {
      console.error('Google login error:', error)
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Account exists with email/password, suggest login first
        const customError = new Error(
          'This email is already registered with email/password. Please login with your password first, then you can connect your Google account.'
        )
        customError.code = error.code
        throw customError
      } else if (error.code === 'auth/email-already-in-use') {
        // Email already in use
        const customError = new Error(
          'This email is already registered. Please login instead.'
        )
        customError.code = error.code
        throw customError
      } else if (error.code === 'auth/popup-closed-by-user') {
        // User closed popup
        const customError = new Error('Sign in was cancelled. Please try again.')
        customError.code = error.code
        throw customError
      }
      
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout')
      throw error
    }
  }

  const resetPassword = async (email) => {
    try {
      // Get the action code settings to redirect to custom page
      const actionCodeSettings = {
        // URL you want to redirect back to after password reset
        // Use your deployed domain URL (Netlify URL)
        url: `${window.location.origin}/reset-password`,
        // This must be true to allow email action links to work in the localhost
        handleCodeInApp: true,
      }

      await sendPasswordResetEmail(auth, email, actionCodeSettings)
      toast.success('Password reset email sent! Check your inbox.')
      return true
    } catch (error) {
      console.error('Password reset error:', error)
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found') {
        const customError = new Error('No account found with this email address.')
        customError.code = error.code
        throw customError
      } else if (error.code === 'auth/invalid-email') {
        const customError = new Error('Invalid email address.')
        customError.code = error.code
        throw customError
      } else if (error.code === 'auth/too-many-requests') {
        const customError = new Error('Too many requests. Please try again later.')
        customError.code = error.code
        throw customError
      }
      
      throw error
    }
  }

  const value = {
    user,
    loading,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
    resetPassword,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}


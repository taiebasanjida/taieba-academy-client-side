import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  
  return <>{children}</>
}


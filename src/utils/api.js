import axios from 'axios'
import { auth } from './firebase'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await auth.currentUser?.getIdToken?.()
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      }
    } catch (error) {
      console.error('Error getting auth token:', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling with retry
api.interceptors.response.use(
  (response) => {
    // Dismiss loading toast on success
    toast.dismiss('db-retry')
    return response
  },
  async (error) => {
    // Handle 503 errors with retry
    if (error.response?.status === 503 && error.response?.data?.retryAfter) {
      const config = error.config
      
      // Check if we've already retried this request
      if (!config.__retryCount) {
        config.__retryCount = 0
      }
      
      // Max 3 retries
      if (config.__retryCount < 3) {
        config.__retryCount++
        const retryAfter = error.response.data.retryAfter || 3
        
        // Show loading message
        toast.loading(
          `Database connecting... Retrying (${config.__retryCount}/3)`,
          {
            id: 'db-retry',
          }
        )
        
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000))
        
        // Retry the request
        try {
          return await api(config)
        } catch (retryError) {
          // If retry also fails, continue to normal error handling
          error = retryError
        }
      }
    }
    
    // Normal error handling
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      if (status === 401) {
        // Unauthorized - user might need to login again
        toast.error('Session expired. Please login again.')
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action.')
      } else if (status === 404) {
        toast.error('Resource not found.')
      } else if (status === 503) {
        // 503 after all retries failed
        toast.dismiss('db-retry')
        toast.error(
          data?.message ||
            'Database connection failed. Please refresh the page and try again.',
          { duration: 5000 }
        )
      } else if (status >= 500) {
        toast.dismiss('db-retry')
        toast.error('Server error. Please try again later.')
      } else if (data?.message) {
        toast.dismiss('db-retry')
        toast.error(data.message)
      }
    } else if (error.request) {
      // Request was made but no response received
      toast.dismiss('db-retry')
      toast.error('Network error. Please check your connection.')
    } else {
      // Something else happened
      toast.dismiss('db-retry')
      toast.error('An unexpected error occurred.')
    }
    
    return Promise.reject(error)
  }
)

export default api


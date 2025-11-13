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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
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
      } else if (status >= 500) {
        toast.error('Server error. Please try again later.')
      } else if (data?.message) {
        toast.error(data.message)
      }
    } else if (error.request) {
      // Request was made but no response received
      toast.error('Network error. Please check your connection.')
    } else {
      // Something else happened
      toast.error('An unexpected error occurred.')
    }
    
    return Promise.reject(error)
  }
)

export default api


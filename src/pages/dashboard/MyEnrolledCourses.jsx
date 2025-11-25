import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../utils/api'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useAuth } from '../../state/AuthContext'
import { useEffect } from 'react'

export default function MyEnrolledCourses() {
  const { user, loading: authLoading } = useAuth()
  const queryClient = useQueryClient()

  // Clear cache when user changes
  useEffect(() => {
    if (user?.email) {
      // Invalidate all queries to ensure fresh data for new user
      queryClient.invalidateQueries({ queryKey: ['my-enrollments'] })
    } else {
      // Clear cache when user logs out
      queryClient.removeQueries({ queryKey: ['my-enrollments'] })
    }
  }, [user?.email, queryClient])

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['my-enrollments', user?.email],
    queryFn: async () => {
      try {
        const res = await api.get('/enrollments/mine')
        console.log('📚 Enrollments data:', res.data)
        return res.data || []
      } catch (error) {
        console.error('❌ Error fetching enrollments:', error)
        throw error
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!user?.email,
    staleTime: 0, // Always consider data stale to force refetch
    cacheTime: 0 // Don't cache when query is disabled
  })

  if (authLoading || isLoading) {
    return (
      <div className="card p-8">
        <LoadingSpinner message="Loading your courses..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="card p-8">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">Failed to load enrollments</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error?.response?.data?.message || error?.message || 'An error occurred while loading your courses.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Helmet>
        <title>My Enrolled Courses | Dashboard</title>
      </Helmet>

      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">My Enrolled Courses</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Continue learning from your enrolled courses
        </p>
      </div>

      {!data || (Array.isArray(data) && data.length === 0) ? (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">No enrolled courses yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start exploring and enroll in courses that interest you
          </p>
          <Link to="/courses" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(data) && data
            .filter(enrollment => enrollment.course) // Filter out enrollments without course data
            .map((enrollment, idx) => (
              <motion.div
                key={enrollment._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card overflow-hidden group cursor-pointer hover:shadow-large"
              >
                <Link to={`/courses/${enrollment.course._id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={enrollment.course.imageUrl || '/placeholder-course.jpg'}
                      alt={enrollment.course.title || 'Course'}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/placeholder-course.jpg'
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                        Enrolled
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 capitalize">
                        {enrollment.course.category || 'Uncategorized'}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {enrollment.course.duration || 'N/A'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {enrollment.course.title || 'Untitled Course'}
                    </h3>
                    <div className="mt-4">
                      <Link
                        to={`/courses/${enrollment.course._id}`}
                        className="btn btn-primary w-full"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  )
}


import { Helmet } from 'react-helmet-async'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useAuth } from '../state/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

export default function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const res = await api.get(`/courses/${id}`)
      return res.data
    }
  })

  const enrollMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error('AUTH_REQUIRED')
      }
      await api.post('/enrollments', { courseId: id })
    },
    onSuccess: () => {
      toast.success('Enrolled successfully! 🎉')
      queryClient.invalidateQueries({ queryKey: ['enrollment-status', id, user?.uid] })
    },
    onError: (error) => {
      if (error.message === 'AUTH_REQUIRED') {
        toast.error('Please login to enroll, redirecting...')
        navigate('/login', { state: { from: location } })
        return
      }
      const message =
        error?.response?.data?.message ||
        (error?.response?.status === 401
          ? 'Session expired. Please login again.'
          : 'Enrollment failed')
      toast.error(message)
      if (error?.response?.status === 401) {
        navigate('/login', { state: { from: location } })
      }
    }
  })

  const { data: enrollmentStatus } = useQuery({
    queryKey: ['enrollment-status', id, user?.uid],
    queryFn: async () => {
      const res = await api.get(`/enrollments/status/${id}`)
      return res.data
    },
    enabled: !!user && !!id,
    staleTime: 2 * 60 * 1000,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <LoadingSpinner message="Loading course details..." />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The course you're looking for doesn't exist.</p>
          <Link to="/courses" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Helmet>
        <title>{data.title} | Taieba Academy</title>
        <meta name="description" content={data.description} />
      </Helmet>

      {/* Hero Image Section */}
      <section className="relative h-64 md:h-96 bg-gradient-to-r from-primary-600 to-accent-600">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
              {data.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
              {data.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {data.description || 'No description available for this course.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
              <ul className="space-y-3">
                {[
                  'Comprehensive understanding of the subject',
                  'Practical skills and real-world applications',
                  'Expert guidance from experienced instructors',
                  'Lifetime access to course materials',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 sticky top-24"
            >
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  ${data.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  One-time payment
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="font-medium">{data.duration}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Category</span>
                  <span className="font-medium capitalize">{data.category}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">Level</span>
                  <span className="font-medium">All Levels</span>
                </div>
              </div>

              <button
                onClick={() => enrollMutation.mutate()}
                disabled={enrollMutation.isPending || enrollmentStatus?.enrolled}
                className="btn btn-primary w-full py-4 text-lg font-semibold"
              >
                {enrollmentStatus?.enrolled ? (
                  'Already Enrolled'
                ) : enrollMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enrolling...
                  </span>
                ) : (
                  'Enroll Now'
                )}
              </button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                30-day money-back guarantee
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}


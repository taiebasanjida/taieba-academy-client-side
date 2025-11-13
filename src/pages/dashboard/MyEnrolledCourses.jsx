import { useQuery } from '@tanstack/react-query'
import api from '../../utils/api'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function MyEnrolledCourses() {
  const { data, isLoading } = useQuery({
    queryKey: ['my-enrollments'],
    queryFn: async () => {
      const res = await api.get('/enrollments/mine')
      return res.data
    }
  })

  if (isLoading) {
    return (
      <div className="card p-8">
        <LoadingSpinner message="Loading your courses..." />
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

      {!data || data.length === 0 ? (
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
          {data.map((enrollment, idx) => (
            <motion.div
              key={enrollment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="card overflow-hidden group cursor-pointer hover:shadow-large"
            >
              <Link to={`/courses/${enrollment.course._id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={enrollment.course.imageUrl}
                    alt={enrollment.course.title}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
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
                      {enrollment.course.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {enrollment.course.duration}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {enrollment.course.title}
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


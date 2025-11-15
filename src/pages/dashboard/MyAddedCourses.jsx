import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../utils/api'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useAuth } from '../../state/AuthContext'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function MyAddedCourses() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (courseId) => {
    setImageErrors((prev) => ({
      ...prev,
      [courseId]: true
    }))
  }
  
  const { data, isLoading } = useQuery({
    queryKey: ['my-courses'],
    queryFn: async () => {
      const res = await api.get('/courses/mine')
      return res.data
    }
  })

  const del = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/courses/${id}`)
    },
    onSuccess: () => {
      toast.success('Course deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['my-courses'] })
      setDeleteConfirm(null)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to delete course')
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
        <title>My Added Courses | Dashboard</title>
      </Helmet>

      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">My Added Courses</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage the courses you've created
        </p>
      </div>

      {!data || data.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-xl font-semibold mb-2">No courses added yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start sharing your knowledge by creating your first course
          </p>
          <Link to="/dashboard/add-course" className="btn btn-primary">
            Add Your First Course
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((course, idx) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="card overflow-hidden group flex flex-col h-full bg-gradient-to-b from-gray-50/40 to-white dark:from-gray-900 dark:to-gray-950"
            >
              <Link to={`/courses/${course._id}`} className="relative overflow-hidden bg-gray-900/30 block">
                {course.imageUrl && !imageErrors[course._id] ? (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      handleImageError(course._id)
                    }}
                  />
                ) : (
                  <div className="h-48 w-full bg-gradient-to-br from-primary-500/70 to-primary-700/80 flex items-center justify-center text-white text-xl font-semibold">
                    {course.title?.charAt(0) || 'C'}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-medium shadow">
                    Your Course
                  </span>
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-wide px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 uppercase">
                    {course.category || 'General'}
                  </span>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-wide text-gray-400">Duration</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {course.duration || 'Self-paced'}
                    </p>
                  </div>
                </div>
                <Link to={`/courses/${course._id}`}>
                  <h3 className="font-semibold text-xl mb-2 line-clamp-2 group-hover:text-primary-500 dark:group-hover:text-primary-300 transition-colors">
                    {course.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                  {course.description || 'No description available'}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide">Pricing</p>
                    <p className="text-base font-semibold text-primary-600 dark:text-primary-300">
                      {typeof course.price === 'number' && course.price > 0
                        ? `$${course.price.toFixed(2)}`
                        : 'Free'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-wide">Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.isFeatured ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'}`}>
                      {course.isFeatured ? 'Featured' : 'Live'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-outline flex-1 min-w-[120px]"
                  >
                    View
                  </Link>
                  <Link
                    to={`/dashboard/add-course?edit=${course._id}`}
                    className="btn btn-secondary flex-1 min-w-[120px]"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(course._id)}
                    className="btn btn-danger px-5"
                  >
                    Delete
                  </button>
                </div>

                {deleteConfirm === course._id && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-800 dark:text-red-200 mb-3">
                      Are you sure you want to delete this course? This action cannot be undone.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          del.mutate(course._id)
                        }}
                        disabled={del.isPending}
                        className="btn btn-danger px-4 py-2 text-sm"
                      >
                        {del.isPending ? 'Deleting...' : 'Confirm Delete'}
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="btn btn-secondary px-4 py-2 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}


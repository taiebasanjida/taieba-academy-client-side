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
              className="card overflow-hidden group"
            >
              <Link to={`/courses/${course._id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-medium">
                      Your Course
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 capitalize">
                    {course.category}
                  </span>
                  <span className="text-sm font-semibold text-primary-600">
                    ${course.price.toFixed(2)}
                  </span>
                </div>
                <Link to={`/courses/${course._id}`}>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {course.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {course.description || 'No description available'}
                </p>
                
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-outline flex-1 text-center"
                  >
                    View
                  </Link>
                  <Link
                    to={`/dashboard/add-course?edit=${course._id}`}
                    className="btn btn-secondary flex-1 text-center"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(course._id)}
                    className="btn bg-red-600 text-white hover:bg-red-700 px-4"
                  >
                    Delete
                  </button>
                </div>

                {deleteConfirm === course._id && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                      Are you sure you want to delete this course? This action cannot be undone.
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          del.mutate(course._id)
                        }}
                        disabled={del.isPending}
                        className="btn bg-red-600 text-white hover:bg-red-700 px-4 py-2 text-sm"
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


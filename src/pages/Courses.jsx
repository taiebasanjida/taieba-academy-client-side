import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [search, setSearch] = useState('')
  
  const { data, isLoading } = useQuery({
    queryKey: ['courses', category, search],
    queryFn: async () => {
      const res = await api.get('/courses', { params: { category, search } })
      return res.data.courses
    },
    retry: (failureCount, error) => {
      // Retry for 503 errors (database connection issues)
      if (error?.response?.status === 503) {
        return failureCount < 2 // Retry 2 more times (total 3 attempts)
      }
      // Don't retry for other errors
      return false
    },
    retryDelay: (attemptIndex) => {
      // Wait 3 seconds between retries (matches backend retryAfter)
      return 3000
    },
  })

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data', label: 'Data Science' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Helmet>
        <title>All Courses | Taieba Academy</title>
      </Helmet>

      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover a wide range of courses to enhance your skills and knowledge
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input pl-10"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="md:w-64">
              <select
                className="input"
                value={category}
                onChange={(e) => {
                  const val = e.target.value
                  setCategory(val)
                  const next = new URLSearchParams(searchParams)
                  if (val) next.set('category', val); else next.delete('category')
                  setSearchParams(next)
                }}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner message="Loading courses..." />
          </div>
        ) : data?.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((course, idx) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card overflow-hidden group cursor-pointer hover:shadow-large"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 text-sm font-medium text-gray-900 dark:text-gray-100 backdrop-blur-sm">
                      ${course.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 capitalize">
                      {course.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {course.description || 'Learn essential skills with this comprehensive course.'}
                  </p>
                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}


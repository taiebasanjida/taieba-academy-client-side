import { useForm } from 'react-hook-form'
import { useAuth } from '../../state/AuthContext'
import toast from 'react-hot-toast'
import api from '../../utils/api'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function AddCourse() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const isEditMode = !!editId
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Fetch course data if editing
  const { data: courseData, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course', editId],
    queryFn: async () => {
      const res = await api.get(`/courses/${editId}`)
      return res.data
    },
    enabled: !!editId,
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      isFeatured: false
    }
  })

  // Prefill form when course data is loaded
  useEffect(() => {
    if (courseData && isEditMode) {
      reset({
        title: courseData.title || '',
        category: courseData.category || '',
        price: courseData.price || 0,
        duration: courseData.duration || '',
        imageUrl: courseData.imageUrl || '',
        description: courseData.description || '',
        isFeatured: courseData.isFeatured || false,
      })
    }
  }, [courseData, isEditMode, reset])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      if (isEditMode) {
        // Update existing course
        await api.put(`/courses/${editId}`, {
          ...data,
          instructor: {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL
          }
        })
        toast.success('Course updated successfully! 🎉')
        navigate('/dashboard/my-courses')
      } else {
        // Create new course
        await api.post('/courses', {
          ...data,
          instructor: {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL
          }
        })
        toast.success('Course added successfully! 🎉')
        reset()
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message || `Failed to ${isEditMode ? 'update' : 'add'} course`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isEditMode && isLoadingCourse) {
    return (
      <div className="card p-8">
        <LoadingSpinner message="Loading course data..." />
      </div>
    )
  }

  return (
    <div>
      <Helmet>
        <title>{isEditMode ? 'Update Course' : 'Add Course'} | Dashboard</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 md:p-8"
      >
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
            {isEditMode ? 'Update Course' : 'Add New Course'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isEditMode 
              ? 'Update your course information' 
              : 'Share your knowledge with the community'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Course Title *</label>
              <input
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 3,
                    message: 'Title must be at least 3 characters'
                  }
                })}
                className="input"
                placeholder="Introduction to React"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="label">Category *</label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="input"
              >
                <option value="">Select a category</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="data">Data Science</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="label">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('price', {
                  valueAsNumber: true,
                  required: 'Price is required',
                  min: {
                    value: 0,
                    message: 'Price must be positive'
                  }
                })}
                className="input"
                placeholder="29.99"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="label">Duration *</label>
              <input
                {...register('duration', {
                  required: 'Duration is required'
                })}
                className="input"
                placeholder="e.g. 8h, 5 weeks"
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="label">Image URL *</label>
            <input
              {...register('imageUrl', {
                required: 'Image URL is required',
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: 'Please enter a valid URL'
                }
              })}
              className="input"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
            )}
          </div>

          <div>
            <label className="label">Description *</label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 20,
                  message: 'Description must be at least 20 characters'
                }
              })}
              rows={6}
              className="input resize-none"
              placeholder="Describe what students will learn in this course..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isFeatured"
              {...register('isFeatured')}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Mark as featured course
            </label>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary px-8 py-3 text-lg font-semibold"
            >
              {isSubmitting 
                ? (isEditMode ? 'Updating Course...' : 'Adding Course...') 
                : (isEditMode ? 'Update Course' : 'Add Course')}
            </button>
            {!isEditMode && (
              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-secondary px-8 py-3"
              >
                Reset
              </button>
            )}
            {isEditMode && (
              <button
                type="button"
                onClick={() => navigate('/dashboard/my-courses')}
                className="btn btn-secondary px-8 py-3"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
}


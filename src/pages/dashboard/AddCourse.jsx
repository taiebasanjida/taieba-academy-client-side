import { useForm } from 'react-hook-form'
import { useAuth } from '../../state/AuthContext'
import toast from 'react-hot-toast'
import api from '../../utils/api'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function AddCourse() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const isEditMode = !!editId
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageMethod, setImageMethod] = useState('url') // 'url' or 'upload'
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  
  // Fetch course data if editing
  const { data: courseData, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course', editId],
    queryFn: async () => {
      const res = await api.get(`/courses/${editId}`)
      return res.data
    },
    enabled: !!editId,
  })

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      isFeatured: false
    }
  })

  const imageUrlValue = watch('imageUrl')
  
  // Update preview when URL changes
  useEffect(() => {
    if (imageMethod === 'url' && imageUrlValue) {
      setImagePreview(imageUrlValue)
    }
  }, [imageUrlValue, imageMethod])

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
      if (courseData.imageUrl) {
        // Check if it's a base64 data URL or regular URL
        const isBase64 = courseData.imageUrl.startsWith('data:image')
        setImageMethod(isBase64 ? 'upload' : 'url')
        setImagePreview(courseData.imageUrl)
        // If it's base64, we can't re-upload the same file, so reset to URL mode
        // User can still upload a new file if they want
        if (isBase64) {
          setImageMethod('url') // Default to URL mode for edit
        }
      }
    }
  }, [courseData, isEditMode, reset])

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setUploadedImage(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  // Reset image when method changes
  const handleImageMethodChange = (method) => {
    setImageMethod(method)
    setUploadedImage(null)
    if (method === 'url') {
      // Keep existing preview if in edit mode and URL exists
      if (isEditMode && courseData?.imageUrl && !courseData.imageUrl.startsWith('data:image')) {
        setImagePreview(courseData.imageUrl)
      } else {
        setImagePreview(null)
      }
    } else {
      // When switching to upload, clear the preview (user will upload new file)
      setImagePreview(null)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Validate: must have either URL or uploaded file
      if (imageMethod === 'url' && !data.imageUrl) {
        toast.error('Please provide an image URL')
        setIsSubmitting(false)
        return
      }
      if (imageMethod === 'upload' && !uploadedImage) {
        toast.error('Please select an image file')
        setIsSubmitting(false)
        return
      }

      // Handle image: use uploaded file (base64) or URL
      let imageUrl = data.imageUrl
      if (imageMethod === 'upload' && uploadedImage) {
        // Convert file to base64 data URL
        imageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(uploadedImage)
        })
      }

      const courseData = {
        ...data,
        imageUrl,
        instructor: {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL
        }
      }

      if (isEditMode) {
        // Update existing course
        await api.put(`/courses/${editId}`, courseData)
        toast.success('Course updated successfully! 🎉')
        queryClient.invalidateQueries({ queryKey: ['my-courses'] })
        navigate('/dashboard/my-courses')
      } else {
        // Create new course
        await api.post('/courses', courseData)
        toast.success('Course added successfully! 🎉')
        queryClient.invalidateQueries({ queryKey: ['my-courses'] })
        navigate('/dashboard/my-courses')
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
                <option value="web-development">Web Development</option>
                <option value="ai-data-science">AI & Data Science</option>
                <option value="programming-software">Programming & Software</option>
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
            <label className="label">Course Image *</label>
            
            {/* Method Selection */}
            <div className="flex gap-4 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="imageMethod"
                  value="url"
                  checked={imageMethod === 'url'}
                  onChange={(e) => handleImageMethodChange(e.target.value)}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="text-sm font-medium">Image URL</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="imageMethod"
                  value="upload"
                  checked={imageMethod === 'upload'}
                  onChange={(e) => handleImageMethodChange(e.target.value)}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="text-sm font-medium">Upload File</span>
              </label>
            </div>

            {/* URL Input */}
            {imageMethod === 'url' && (
              <div>
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
            )}

            {/* File Upload */}
            {imageMethod === 'upload' && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="input file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900 dark:file:text-primary-300"
                />
                {!uploadedImage && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Select an image file (max 5MB)
                  </p>
                )}
                {uploadedImage && (
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    ✓ {uploadedImage.name} selected
                  </p>
                )}
              </div>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Course preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                />
              </div>
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


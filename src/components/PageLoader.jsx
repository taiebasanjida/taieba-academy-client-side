import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

/**
 * PageLoader Component
 * 
 * Shows a full-screen loader with the Taieba Academy logo
 * during page navigation transitions and initial page load.
 */
export default function PageLoader() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [displayLoader, setDisplayLoader] = useState(true)
  const isInitialMount = useRef(true)

  // Handle initial page load
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      
      // Hide loader after initial page load
      const handleInitialLoad = () => {
        setTimeout(() => {
          setIsLoading(false)
          setTimeout(() => {
            setDisplayLoader(false)
          }, 300)
        }, 800) // Minimum display time for initial load
      }

      if (document.readyState === 'complete') {
        handleInitialLoad()
      } else {
        window.addEventListener('load', handleInitialLoad)
        return () => window.removeEventListener('load', handleInitialLoad)
      }
    }
  }, [])

  // Handle route changes (after initial load)
  useEffect(() => {
    // Skip initial mount
    if (isInitialMount.current) return

    // Show loader when route changes
    setIsLoading(true)
    setDisplayLoader(true)

    // Hide loader after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setDisplayLoader(false)
      }, 300)
    }, 400) // Faster for route transitions

    return () => clearTimeout(timer)
  }, [location.pathname])

  // Don't render if not loading
  if (!displayLoader) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-950"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Logo with pulse animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1, 0.95, 1], opacity: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <img
                src="/page-loader/taieba-academy-logo.webp"
                alt="Taieba Academy"
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.style.display = 'none'
                }}
              />
              {/* Spinning ring around logo */}
              <motion.div
                className="absolute inset-0 border-4 border-primary-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  borderTopColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: 'transparent',
                }}
              />
            </motion.div>

            {/* Loading text with pulse */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
              transition={{
                opacity: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                y: { duration: 0.3 },
              }}
              className="text-gray-600 dark:text-gray-400 font-medium text-lg"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  const features = [
    {
      icon: '📚',
      title: 'Curated Content',
      description: 'Quality courses from expert instructors',
    },
    {
      icon: '🚀',
      title: 'Learn at Your Pace',
      description: 'Self-paced learning with progress tracking',
    },
    {
      icon: '👥',
      title: 'Community Driven',
      description: 'Learn and teach together with peers',
    },
    {
      icon: '💡',
      title: 'Modern Platform',
      description: 'Beautiful, accessible, and responsive UI',
    },
  ]

  const stats = [
    { label: 'Courses', value: '500+' },
    { label: 'Students', value: '10K+' },
    { label: 'Instructors', value: '200+' },
    { label: 'Countries', value: '50+' },
  ]

  const featuredCourseImages = [
    'https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515871204537-9d3a8666c70a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop'
  ]

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Taieba Academy | Learn and Teach</title>
        <meta name="description" content="Empowering learners and educators with quality courses. Learn, teach, and grow together." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6"
              >
                🎓 Welcome to Taieba Academy
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Learn faster.
                <br />
                <span className="bg-gradient-to-r from-accent-200 to-white bg-clip-text text-transparent">
                  Teach better.
                </span>
                <br />
                Grow together.
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Explore curated courses, enroll seamlessly, and track your progress—all in one place. 
                Join thousands of learners and educators on their journey to excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl"
                >
                  Browse Courses
                </Link>
                <Link
                  to="/dashboard/add-course"
                  className="btn border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                >
                  Add a Course
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
                  alt="Learning workspace"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose Taieba Academy?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide the tools and platform for effective learning and teaching
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card p-6 text-center hover:scale-105"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Popular Courses
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover our most popular courses
              </p>
            </div>
            <Link
              to="/courses"
              className="btn btn-outline hidden sm:inline-flex"
            >
              See All
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
            {featuredCourseImages.map((image, idx) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image}
                    alt="Course"
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">
                      Category
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">8h</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Featured Course {idx + 1}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    Learn essential skills with this comprehensive course designed for beginners and advanced learners.
                  </p>
                  <Link
                    to="/courses"
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/courses" className="btn btn-outline">
              See All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to start your learning journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of learners and start exploring courses today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Browse Courses
              </Link>
              <Link to="/register" className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../state/AuthContext'
import { motion } from 'framer-motion'

export default function DashboardLayout() {
  const { user } = useAuth()
  
  const navItems = [
    { to: '/dashboard/enrolled', label: 'My Enrolled Courses', icon: '📚' },
    { to: '/dashboard/add-course', label: 'Add Course', icon: '➕' },
    { to: '/dashboard/my-courses', label: 'My Added Courses', icon: '📖' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Dashboard</h1>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {user?.displayName || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[280px,1fr] gap-6">
          {/* Sidebar */}
          <aside className="card p-4 h-fit sticky top-24">
            <nav className="space-y-2">
              {navItems.map((item, idx) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <section className="min-h-[40vh]">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  )
}


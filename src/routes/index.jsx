import { Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'

// Public Pages
import Home from '../pages/Home'
import Courses from '../pages/Courses'
import CourseDetails from '../pages/CourseDetails'
import About from '../pages/About'
import Documentation from '../pages/Documentation'
import Support from '../pages/Support'
import Blog from '../pages/Blog'
import Privacy from '../pages/Privacy'
import Terms from '../pages/Terms'
import Cookies from '../pages/Cookies'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'

// Dashboard Pages
import DashboardLayout from '../pages/dashboard/DashboardLayout'
import MyEnrolledCourses from '../pages/dashboard/MyEnrolledCourses'
import AddCourse from '../pages/dashboard/AddCourse'
import MyAddedCourses from '../pages/dashboard/MyAddedCourses'

// Error Pages
import NotFound from '../pages/NotFound'

// Route Guards
import PrivateRoute from './PrivateRoute'

/**
 * Application Routes Configuration
 * 
 * This file contains all route definitions for the application.
 * Following professional React Router patterns with:
 * - Organized route structure
 * - Protected routes with PrivateRoute
 * - Clean separation of concerns
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route
          path="courses/:id"
          element={
            <PrivateRoute>
              <CourseDetails />
            </PrivateRoute>
          }
        />

        {/* Static Pages */}
        <Route path="about" element={<About />} />
        <Route path="docs" element={<Documentation />} />
        <Route path="support" element={<Support />} />
        <Route path="blog" element={<Blog />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="cookies" element={<Cookies />} />

        {/* Authentication Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="enrolled" replace />} />
          <Route path="enrolled" element={<MyEnrolledCourses />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyAddedCourses />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}


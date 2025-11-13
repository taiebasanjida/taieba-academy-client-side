import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import About from './pages/About'
import Documentation from './pages/Documentation'
import Support from './pages/Support'
import Blog from './pages/Blog'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Cookies from './pages/Cookies'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import NotFound from './pages/NotFound'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import AddCourse from './pages/dashboard/AddCourse'
import MyAddedCourses from './pages/dashboard/MyAddedCourses'
import MyEnrolledCourses from './pages/dashboard/MyEnrolledCourses'
import PrivateRoute from './routes/PrivateRoute'
import { AuthProvider } from './state/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/:id" element={
                    <PrivateRoute>
                      <CourseDetails />
                    </PrivateRoute>
                  } />
                  <Route path="about" element={<About />} />
                  <Route path="docs" element={<Documentation />} />
                  <Route path="support" element={<Support />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="cookies" element={<Cookies />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="dashboard" element={
                    <PrivateRoute>
                      <DashboardLayout />
                    </PrivateRoute>
                  }>
                    <Route index element={<Navigate to="enrolled" replace />} />
                    <Route path="enrolled" element={<MyEnrolledCourses />} />
                    <Route path="add-course" element={<AddCourse />} />
                    <Route path="my-courses" element={<MyAddedCourses />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  )
}


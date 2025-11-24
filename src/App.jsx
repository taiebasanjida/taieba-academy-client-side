import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageLoader />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}


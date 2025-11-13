import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    platform: [
      { name: 'Courses', to: '/courses' },
      { name: 'Dashboard', to: '/dashboard' },
      { name: 'About', to: '/about' },
    ],
    resources: [
      { name: 'Documentation', to: '/docs' },
      { name: 'Support', to: '/support' },
      { name: 'Blog', to: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', to: '/privacy' },
      { name: 'Terms of Service', to: '/terms' },
      { name: 'Cookie Policy', to: '/cookies' },
    ],
  }

  const socialLinks = [
    {
      name: 'X (Twitter)',
      href: 'https://x.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2H21.5l-7.5 8.574L23 22h-6.844l-5.35-6.472L4.6 22H1.34l8.03-9.18L1 2h6.844l4.83 5.84L18.244 2zm-2.395 18h2.07L7.24 4h-2.11l10.72 16z"/>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/taiebasanjida',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.424 2.865 8.178 6.839 9.504.5.093.682-.218.682-.483 0-.237-.009-.868-.013-1.704-2.782.606-3.369-1.343-3.369-1.343-.455-1.159-1.111-1.468-1.111-1.468-.908-.622.069-.609.069-.609 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.648.35-1.088.636-1.338-2.221-.253-4.555-1.114-4.555-4.957 0-1.095.39-1.992 1.029-2.694-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.03A9.564 9.564 0 0 1 12 7.07c.85.004 1.705.115 2.504.337 1.91-1.3 2.748-1.03 2.748-1.03.545 1.376.202 2.393.1 2.646.64.702 1.028 1.6 1.028 2.694 0 3.852-2.337 4.701-4.566 4.95.359.31.678.92.678 1.853 0 1.337-.012 2.416-.012 2.746 0 .268.18.58.688.481C19.138 20.196 22 16.443 22 12.02 22 6.486 17.523 2 12 2z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-display font-bold text-xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Taieba Academy
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 max-w-md">
              Empowering learners and educators with quality courses. Learn, teach, and grow together in our collaborative learning platform.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Taieba Academy. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Made with ❤️ for learners everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


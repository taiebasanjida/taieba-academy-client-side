import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const CONTACT_OPTIONS = [
  {
    title: 'Help Desk',
    description: 'Submit a ticket for course issues, billing questions, or technical support.',
    details: 'support@taieba-academy.com',
    icon: '🛠️'
  },
  {
    title: 'Community Forum',
    description: 'Connect with instructors and learners, share tips, and find study partners.',
    details: 'forum.taieba-academy.com',
    icon: '💬'
  },
  {
    title: 'Live Sessions',
    description: 'Join weekly office hours to get real-time help from our success coaches.',
    details: 'Every Tuesday & Thursday • 6:00 PM',
    icon: '📅'
  }
]

export default function Support() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20">
      <Helmet>
        <title>Support | Taieba Academy</title>
        <meta
          name="description"
          content="Need assistance? Explore Taieba Academy support resources, contact options, and community events."
        />
      </Helmet>

      <section className="bg-gradient-to-r from-primary-700 to-accent-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">We’re Here to Help</h1>
          <p className="text-lg text-white/90">
            Whether you’re launching a new course or enrolling in your first class, our support team and community
            have your back.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          {CONTACT_OPTIONS.map((option) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <div className="text-4xl mb-3">{option.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{option.description}</p>
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{option.details}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 mt-16">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">Service Level</h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>Support tickets answered within 24 hours on business days.</li>
            <li>Critical platform incidents monitored 24/7 by our engineering team.</li>
            <li>Feature requests reviewed monthly—your feedback shapes our roadmap.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}


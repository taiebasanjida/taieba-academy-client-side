import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const SECTIONS = [
  {
    title: 'Getting Started',
    items: [
      'Create an instructor or learner profile in minutes',
      'Browse courses by category, difficulty, and pricing model',
      'Use the dashboard to track enrollments and learning progress'
    ]
  },
  {
    title: 'Creating Courses',
    items: [
      'Design modules with lessons, quizzes, and downloadable resources',
      'Schedule release dates or publish instantly for your audience',
      'Monitor student engagement with built-in analytics'
    ]
  },
  {
    title: 'Integrations & API',
    items: [
      'Connect external tools via secure webhooks and API keys',
      'Embed lessons on your website while keeping progress synced',
      'Automate notifications with Zapier, Slack, or email providers'
    ]
  }
]

export default function Documentation() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-16">
      <Helmet>
        <title>Documentation | Taieba Academy</title>
        <meta
          name="description"
          content="Learn how to get the most out of Taieba Academy with step-by-step guides for instructors and learners."
        />
      </Helmet>

      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Documentation</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Guides, best practices, and implementation details to help you ship courses and learning experiences
            faster.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-12 space-y-8">
        {SECTIONS.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 list-disc list-inside">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>
    </div>
  )
}


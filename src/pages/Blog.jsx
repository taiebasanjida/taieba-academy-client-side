import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const POSTS = [
  {
    title: 'Designing Project-Based Learning Paths',
    excerpt:
      'See how instructors structure capstone projects, peer reviews, and feedback loops that mimic real workplaces.',
    date: 'February 14, 2025',
    readTime: '6 min read'
  },
  {
    title: 'Why Analytics Matter for Instructors',
    excerpt:
      'From completion funnels to concept heatmaps—discover the metrics that help you refine every lesson.',
    date: 'January 28, 2025',
    readTime: '5 min read'
  },
  {
    title: 'Motivation Systems That Keep Learners On Track',
    excerpt:
      'Badges, streaks, and accountability squads: practical frameworks to boost learner retention on Taieba Academy.',
    date: 'January 12, 2025',
    readTime: '7 min read'
  }
]

export default function Blog() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20">
      <Helmet>
        <title>Blog | Taieba Academy</title>
        <meta
          name="description"
          content="Insights from the Taieba Academy team about course design, learner engagement, and community building."
        />
      </Helmet>

      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Taieba Insights</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Field notes, case studies, and curated frameworks to help you build career-changing learning experiences.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-12 grid gap-6 md:grid-cols-2">
        {POSTS.map((post, index) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card p-6 flex flex-col h-full"
          >
            <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">{post.date}</span>
            <h2 className="text-2xl font-semibold mt-2 mb-3">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 flex-1">{post.excerpt}</p>
            <span className="mt-4 text-sm text-gray-500 dark:text-gray-500">{post.readTime}</span>
          </motion.article>
        ))}
      </section>
    </div>
  )
}


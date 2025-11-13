import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const VALUES = [
  {
    title: 'Built for Lifelong Learners',
    description:
      'We design Taieba Academy to help learners stay curious, practice new skills, and turn knowledge into action.',
    icon: '🎯'
  },
  {
    title: 'Powered by Expert Instructors',
    description:
      'Every course is crafted by people with real-world experience who love to teach and mentor.',
    icon: '🧠'
  },
  {
    title: 'Community Driven',
    description:
      'A welcoming environment where learners, mentors, and creators collaborate, give feedback, and grow together.',
    icon: '🤝'
  }
]

const TEAM = [
  {
    name: 'Samuel Rahman',
    role: 'Founder & CEO',
    bio: 'Product strategist focused on building learning experiences that balance clarity, depth, and real-world outcomes.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=160&auto=format&fit=crop'
  },
  {
    name: 'Imran Chowdhury',
    role: 'Head of Curriculum',
    bio: 'Former instructor and engineer who loves distilling complex topics into practical, step-by-step learning paths.',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=160&auto=format&fit=crop'
  },
  {
    name: 'Arif Hasan',
    role: 'Community Lead',
    bio: 'Helps learners stay motivated, discover peers, and celebrate every milestone together.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop'
  }
]

export default function About() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <Helmet>
        <title>About | Taieba Academy</title>
        <meta
          name="description"
          content="Learn more about Taieba Academy, our mission, and the team building a modern learning community."
        />
      </Helmet>

      <section className="bg-gradient-to-r from-primary-700 to-accent-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Mission</h1>
          <p className="text-lg md:text-xl text-white/90">
            Taieba Academy empowers ambitious learners and generous instructors to share knowledge, build skills,
            and grow careers through a connected, supportive platform.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {VALUES.map((value) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


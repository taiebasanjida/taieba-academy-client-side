import { Helmet } from 'react-helmet-async'

const TERMS = [
  {
    title: '1. Account Requirements',
    content:
      'You must be at least 16 years old to create an account. You are responsible for maintaining the confidentiality of your credentials and for all activities that occur on your account.'
  },
  {
    title: '2. Course Enrollment & Payments',
    content:
      'Instructors set pricing for their courses. Learners receive lifetime access to purchased content unless a refund is issued in accordance with our refund policy.'
  },
  {
    title: '3. Instructor Responsibilities',
    content:
      'Instructors must provide accurate course information, deliver promised materials, and comply with all applicable laws, including intellectual property regulations.'
  },
  {
    title: '4. Acceptable Use',
    content:
      'You agree not to misuse the platform, share content you do not own rights to, or engage in behavior that harasses, discriminates, or otherwise harms other users.'
  },
  {
    title: '5. Changes to the Platform',
    content:
      'We may modify or discontinue features with reasonable notice. Continued use of Taieba Academy after updates indicates your acceptance of the revised terms.'
  }
]

export default function Terms() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20">
      <Helmet>
        <title>Terms of Service | Taieba Academy</title>
        <meta
          name="description"
          content="Review the terms that govern your use of Taieba Academy as a learner or instructor."
        />
      </Helmet>

      <section className="bg-gradient-to-r from-primary-700 to-accent-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-white/90">
            These terms outline your rights, responsibilities, and the rules of engagement when using Taieba Academy.
          </p>
          <p className="text-sm text-white/70 mt-4">Last updated: January 1, 2025</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-12 space-y-8">
        {TERMS.map((term) => (
          <div key={term.title} className="card p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-3">{term.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{term.content}</p>
          </div>
        ))}
      </section>
    </div>
  )
}


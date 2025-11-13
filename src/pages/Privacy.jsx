import { Helmet } from 'react-helmet-async'

const SECTIONS = [
  {
    title: 'Information We Collect',
    items: [
      'Account details: name, email, profile preferences, and login metadata.',
      'Course data: enrollments, lesson progress, assignments, and feedback.',
      'Usage analytics: device type, browser version, and interaction events gathered to improve the platform.'
    ]
  },
  {
    title: 'How We Use Your Data',
    items: [
      'Deliver personalized course recommendations and progress reminders.',
      'Provide instructors with aggregate insights about learner engagement.',
      'Detect abuse, protect account security, and comply with legal obligations.'
    ]
  },
  {
    title: 'Your Choices',
    items: [
      'Download or delete your data anytime from the account settings page.',
      'Adjust marketing preferences or unsubscribe from promotional emails.',
      'Contact privacy@taieba-academy.com for data access requests or questions.'
    ]
  }
]

export default function Privacy() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20">
      <Helmet>
        <title>Privacy Policy | Taieba Academy</title>
        <meta
          name="description"
          content="Understand how Taieba Academy collects, uses, and protects your personal information."
        />
      </Helmet>

      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We’re committed to earning and keeping your trust. Here’s how we treat the data that powers Taieba Academy.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">Effective date: January 1, 2025</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-12 space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.title} className="card p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 list-disc list-inside">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}


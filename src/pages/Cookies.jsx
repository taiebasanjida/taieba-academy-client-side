import { Helmet } from 'react-helmet-async'

const COOKIES = [
  {
    title: 'Essential Cookies',
    content:
      'Required to keep you logged in, maintain session security, and enable core functionality such as checkout and course playback.'
  },
  {
    title: 'Analytics Cookies',
    content:
      'Help us understand how learners navigate lessons, identify popular modules, and prioritize product improvements.'
  },
  {
    title: 'Preference Cookies',
    content:
      'Store theme choices, preferred language, and dashboard layout so the experience feels familiar on every visit.'
  }
]

export default function Cookies() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-20">
      <Helmet>
        <title>Cookie Policy | Taieba Academy</title>
        <meta
          name="description"
          content="Learn how Taieba Academy uses cookies to deliver a secure and personalised learning experience."
        />
      </Helmet>

      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Cookies help us tailor Taieba Academy to your needs, analyse performance, and keep your session secure.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-12 space-y-8">
        {COOKIES.map((cookie) => (
          <div key={cookie.title} className="card p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-3">{cookie.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{cookie.content}</p>
          </div>
        ))}

        <div className="card p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-3">Manage Your Preferences</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            You can adjust cookie settings in your browser or within your Taieba Academy profile. Note that disabling
            essential cookies may limit your ability to access certain features.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Questions? Email privacy@taieba-academy.com and we’ll be happy to assist.
          </p>
        </div>
      </section>
    </div>
  )
}


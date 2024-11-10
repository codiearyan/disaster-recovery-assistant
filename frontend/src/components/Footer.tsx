import Image from '../../public/Logo.avif'

const navigation = {
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com',
    },
    {
      name: 'Github',
      href: 'https://github.com',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
    },
  ],
}

const MinimalFooter = () => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 py-8 border-t border-slate-900/10 dark:border-slate-100/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <img src={Image} alt="DisasterBusters" className="h-6 w-auto" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            DisasterBusters
          </span>
        </div>

        <div className="flex items-center gap-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-400">
          Made with ❤️ by DisasterBusters
        </div>
      </div>
    </footer>
  )
}

export default MinimalFooter
import { Moon, Save, Smartphone, Unlock } from 'lucide-react'

const ITEMS = [
  {
    icon: Unlock,
    title: 'Open a lesson without signing up',
    body: 'There are no accounts and no payments. Pick a chapter and start.',
  },
  {
    icon: Smartphone,
    title: 'Study on a phone',
    body: 'Every screen is built from 360 px wide, and each lesson loads only when you open it, to save data.',
  },
  {
    icon: Save,
    title: 'Keep your progress on this device',
    body: 'XP, streaks and finished lessons are saved here. Clearing your browser data resets them.',
  },
  {
    icon: Moon,
    title: 'Switch to dark mode',
    body: 'The theme follows your phone, or you can flip it from the top bar.',
  },
]

export function PromiseSection() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl dark:text-white">
          Free, with nothing to sign up for
        </h2>
        <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-spruce/10 text-spruce">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-ink dark:text-white">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

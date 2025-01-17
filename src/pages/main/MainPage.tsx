import { Footer, Header } from '@/components/feature'

import { AnimateSection, EventSection, RecruitSection } from './components'

export default function MainPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex w-full flex-col">
        <AnimateSection />
        <EventSection />
        <RecruitSection />
      </div>
      <Footer />
    </main>
  )
}

import { Content } from '@/components/common'

import { Footer } from './footer'
import { Header } from './header'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Content className="fixed z-40 h-16 w-full bg-primary text-white">
        <Header />
      </Content>
      <div className="mt-16 flex w-full max-w-screen-xl flex-1 flex-col items-center px-5 pt-10 sm:px-20">
        {children}
      </div>
      <Content className="bg-slate-100 text-primary">
        <Footer />
      </Content>
    </main>
  )
}

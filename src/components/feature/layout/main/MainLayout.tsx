import { Footer } from './footer'
import { Header } from './header'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="mt-16 flex w-full flex-1 justify-center px-5 pt-10 sm:px-20">
        <div className="max-w-screen-xl flex-1">{children}</div>
      </div>
      <Footer />
    </main>
  )
}

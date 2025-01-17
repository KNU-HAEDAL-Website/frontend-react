import { DrawingPinIcon } from '@radix-ui/react-icons'

import { haedalLaptop } from '@/assets/images'
import { Content } from '@/components/common'
import { Footer, Header } from '@/components/feature'

export default function RecruitPage() {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <div className="w-full flex-1">
        <Content className="bg-primary pt-16 text-white">
          <div className="relative flex w-full max-w-screen-xl flex-col gap-6 px-5 py-20 md:px-12">
            <div className="flex gap-2">
              <DrawingPinIcon className="h-auto w-10 text-destructive" />
              <div className="w-full text-4xl">지금은 모집 기간이 아닙니다</div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div>2024년 하반기 모집이 완료되었습니다</div>
              <div>다음 모집은 2025년 2월에 예정되어 있습니다</div>
            </div>
            <div className="absolute -bottom-24 right-0">
              <div className="absolute inset-0 z-0 animate-pulse rounded-full bg-white/10" />
              <div className="absolute -inset-8 z-0 animate-pulse rounded-full bg-white/5" />
              <img
                src={haedalLaptop}
                alt="haedal logo"
                className="z-30 h-60 w-60"
              />
            </div>
          </div>
        </Content>
      </div>
      <Footer />
    </main>
  )
}

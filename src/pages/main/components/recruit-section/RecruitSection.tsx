import { useNavigate } from 'react-router'

import { ArrowRightIcon } from '@radix-ui/react-icons'

import haedal from '@/assets/images/haedal-laptop.png'
import { Content } from '@/components/common'
import { Button } from '@/components/ui'

export const RecruitSection = () => {
  const navigate = useNavigate()

  return (
    <div className="h-auto w-full">
      <div className="fade-component z-10 h-10 w-full bg-gradient-to-b from-white to-yellow-100/40" />
      <Content className="w-full bg-gradient-to-b from-yellow-100/40 via-[#010238]/40 to-[#010238] py-28 md:px-10">
        <div className="flex w-full flex-1 flex-col gap-10 text-lg">
          <div className="flex flex-col items-center px-12">
            <p className="text-center text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
              해달과 함께 성장해갈{' '}
              <span className="hidden md:inline">동아리원을 모집합니다!</span>
              <span className="inline md:hidden">
                <br /> 동아리원을 모집합니다!
              </span>
            </p>
            <img
              src={haedal}
              width={0}
              height={0}
              sizes="50%"
              className="h-auto w-2/3 sm:w-1/2 lg:w-1/3"
              alt="Haedal laptop"
            />
            <p className="break-keep text-center text-lg text-white md:text-xl lg:text-2xl">
              지금은 모집 기간이 아닙니다.
              <br />
              2025년 1학기 모집 때 다시 만나요🌝
            </p>
            <Button
              variant="secondary"
              className="mt-6 h-fit gap-2 text-lg font-semibold md:text-xl lg:text-2xl"
              onClick={() => navigate('/recruit')}
            >
              <span>더 알아보기</span>
              <ArrowRightIcon className="h-auto w-6" />
            </Button>
          </div>
        </div>
      </Content>
    </div>
  )
}

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Content } from '@/components/common'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const Section1 = () => {
  return (
    <div className="relative h-auto w-full">
      <Image
        src="/haedal-background.png"
        width={0}
        height={0}
        className="h-auto w-full"
        alt="Haedal Background"
      />
      <Content className="bg-custom-gradient relative z-10 -mt-20 flex w-full flex-col items-center px-10 pb-60 pt-60 text-white">
        <div className="section1-intro-area flex w-full flex-col">
          <motion.p
            className="text-xl md:text-3xl"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            경북대학교 IT대학 학술동아리
          </motion.p>
          <motion.p
            className="text-xl md:text-2xl"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <span className="text-5xl leading-loose md:text-6xl md:leading-loose">
              해달
            </span>
            은
          </motion.p>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="flex flex-col break-keep text-lg leading-relaxed md:text-2xl md:leading-relaxed"
          >
            <p>
              <strong className="bg-yellow-400 text-primary">
                SW 가치 확산
              </strong>
              이라는 목표를 가지고 다양한 활동 및 행사를 진행하고 있습니다.
            </p>
            <p>
              전공과 상관없이 코딩에 관심이 있는 사람이라면{' '}
              <strong className="bg-yellow-400 text-primary">누구나</strong>{' '}
              함께하실 수 있습니다.
            </p>
          </motion.div>
        </div>
      </Content>
    </div>
  )
}

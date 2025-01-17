import { motion } from 'framer-motion'

import {
  gradationBackground,
  largeLogo,
  shootinStar,
  star1,
  star2,
} from '@/assets/images'
import { Content } from '@/components/common'

export const AnimateSection = () => {
  return (
    <div className="w-full overflow-hidden pt-16">
      <div className="relative w-full">
        <img
          src={gradationBackground}
          sizes="100vw"
          className="w-full object-cover"
          alt="Haedal Background"
        />
        <div className="absolute inset-0 flex items-start justify-center">
          <img src={largeLogo} alt="logo" />
        </div>
        <motion.img
          src={shootinStar}
          alt="shooting star"
          className="absolute right-0 top-0 flex w-52"
          variants={shootingStarAnimation2}
          initial="initial"
          animate="animate"
        />
        <motion.img
          src={shootinStar}
          alt="shooting star"
          className="absolute inset-0 w-80"
          variants={shootingStarAnimation}
          initial="initial"
          animate="animate"
        />
        <motion.img
          src={star1}
          alt="star1"
          className="absolute inset-0 w-full"
          variants={starBlinkAnimation(0.5)}
          animate="animate"
        />
        <motion.img
          src={star2}
          alt="star2"
          className="absolute inset-0 w-full"
          variants={starBlinkAnimation(0.7)}
          animate="animate"
        />
      </div>
      <Content className="bg-custom-gradient relative z-10 -mt-20 flex w-full flex-col items-center px-10 pb-80 pt-60 text-white">
        <div className="section1-intro-area flex w-full flex-col">
          <motion.p
            className="text-xl md:text-3xl"
            variants={fadeInUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            경북대학교 IT대학 학술동아리
          </motion.p>
          <motion.p
            className="text-xl md:text-2xl"
            variants={fadeInUp(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <span className="text-4xl leading-loose md:text-5xl md:leading-loose">
              해달
            </span>
            은
          </motion.p>
          <motion.div
            variants={fadeInUp(0.6)}
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

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
    },
  },
})

const shootingStarAnimation = {
  animate: {
    opacity: [0, 1, 0],
    x: ['100%', '50%', '0%'],
    y: ['0%', '50%', '100%'],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut',
      repeatDelay: 2,
    },
  },
}

const shootingStarAnimation2 = {
  animate: {
    opacity: [0, 1, 0],
    x: ['0%', '-50%', '-100%'],
    y: ['0%', '50%', '100%'],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
      repeatDelay: 3,
    },
  },
}

const starBlinkAnimation = (delay: number) => ({
  animate: {
    opacity: [1, 0.3, 1],
    transition: {
      duration: 1.5,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
})

import { motion, useScroll, useTransform } from "framer-motion"
import brainImg from '../assets/brain.png'

const BrainBackground = () => {
  const { scrollYProgress } = useScroll()

  // Scroll based transforms
  const x = useTransform(scrollYProgress, [0, 1], ["-50%", "-80%"])
  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "-40%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 0.6])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.15, 0.5, 0.85])

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
      }}
      className="brain-bg"
    >
      <img src={brainImg} alt="Brain Background" />
    </motion.div>
  )
}

export default BrainBackground

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import brainImg from "../assets/brain.webp"

const BrainBackground = ({ ctaRef }) => {
  const brainRef = useRef(null)
  const { scrollYProgress } = useScroll()

  // Movement
  const x = useTransform(scrollYProgress, [0, 0.7], ["0%", "-35%"])
  const y = useTransform(scrollYProgress, [0, 0.7], ["0%", "40%"])
  const scale = useTransform(scrollYProgress, [0, 0.7], [1.1, 0.6])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 0.85])

  return (
    <motion.div
      ref={brainRef}
      style={{ x, y, scale, opacity }}
      className="brain-bg"
    >
      <img src={brainImg} alt="Brain" />
    </motion.div>
  )
}

export default BrainBackground

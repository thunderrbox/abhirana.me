import { motion } from 'framer-motion';

export default function FadeUp({ children, className = '', delay = 0, yOffset = 30, once = true }) {
  // Spring physics for a highly premium, smooth bounce effect on render
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay: delay,
        type: "spring",
        stiffness: 70,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
}

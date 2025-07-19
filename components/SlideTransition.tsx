'use client'

import { motion } from "framer-motion";

type SlideProps = {
    direction: "left" | "right";
    children: React.ReactNode;
};

const SlideTransition = ( {direction, children } : SlideProps) => {
  const fromX = direction === "left" ? "100%" : "-100%";
  const toX = direction === "right" ? "-100%" : "100%";

  return (
    <motion.div
        initial={{ x: fromX, opacity: 0.3 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: toX, opacity: 0.3 }}
        transition={{ type: "tween", duration: 0.1 }}
        className="absolute inset-0"
    >
        {children}
    </motion.div>
  )
}

export default SlideTransition
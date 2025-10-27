import { AnimatePresence,motion } from 'framer-motion'
import React from 'react'

const Wrong = () => {
  return (

    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-8 py-4 bg-red-500 text-white text-2xl font-bold rounded-2xl shadow-lg"
    >
    <p>BoooOO ❌👎👎 Wrong</p>
    </motion.div>


  )
}

export default Wrong
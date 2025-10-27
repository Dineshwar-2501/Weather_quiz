// import React, { useContext } from 'react'
// import { UserBackpack } from '../Game'
// const ScoreBoard = () => {
//   const {  score} = useContext(UserBackpack)

//   return (
//     <div  className='text-2xl bg-gray-800/10 rounded-xl    p-2 m-2 absolute top-0 right-0'>
//       <h1>Score:{score}</h1>
//       </div>
//   )
// }

// export default ScoreBoard


import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserBackpack } from '../Game'

const ScoreBoard = () => {
  const { score } = useContext(UserBackpack)
  const [prevScore, setPrevScore] = useState(score)
  const [scoreChange, setScoreChange] = useState(null)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (score !== prevScore) {
      const change = score - prevScore
      setScoreChange(change)
      setShake(true)
      
      setTimeout(() => {
        setScoreChange(null)
        setShake(false)
      }, 1500)
      
      setPrevScore(score)
    }
  }, [score, prevScore])

  const isPositive = scoreChange > 0
  const isNegative = scoreChange < 0

  return (
    <motion.div
      className='text-2xl bg-gray-800/10 rounded-xl p-2 m-2 absolute top-0 right-0 overflow-hidden'
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: shake ? [1, 1.2, 1.15, 1.2, 1] : 1,
        rotate: shake ? [0, -5, 5, -5, 0] : 0
      }}
      transition={{ 
        scale: { duration: 0.5 },
        rotate: { duration: 0.4 }
      }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Particle burst effect */}
      <AnimatePresence>
        {shake && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${isPositive ? 'bg-green-400' : 'bg-red-400'}`}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 1,
                  opacity: 1 
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 8) * 60,
                  y: Math.sin((i * Math.PI * 2) / 8) * 60,
                  scale: 0,
                  opacity: 0
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Score change indicator */}
      <AnimatePresence>
        {scoreChange !== null && (
          <motion.div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl font-black ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
            initial={{ y: 0, opacity: 1, scale: 0.5 }}
            animate={{ 
              y: -60, 
              opacity: 0,
              scale: [0.5, 1.5, 1.2]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {isPositive ? '+' : ''}{scoreChange}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow effect */}
      <AnimatePresence>
        {shake && (
          <motion.div
            className={`absolute inset-0 rounded-xl ${
              isPositive 
                ? 'bg-green-400/30 shadow-[0_0_30px_rgba(74,222,128,0.6)]' 
                : 'bg-red-400/30 shadow-[0_0_30px_rgba(248,113,113,0.6)]'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      <h1 className='relative z-10 flex text-white items-center gap-2'>
        <motion.span
          animate={shake ? { 
            rotate: [0, 20, -20, 20, 0],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          🏆
        </motion.span>
        
        Score:
        
        <AnimatePresence mode="wait">
          <motion.span
            key={score}
            initial={{ 
              y: isPositive ? 20 : -20, 
              opacity: 0,
              scale: 0.5,
              rotateX: 90
            }}
            animate={{ 
              y: 0, 
              opacity: 1,
              scale: 1,
              rotateX: 0
            }}
            exit={{ 
              y: isPositive ? -20 : 20, 
              opacity: 0,
              scale: 0.5,
              rotateX: -90
            }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 25
            }}
            className={`inline-block font-black ${
              isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {score}
          </motion.span>
        </AnimatePresence>
      </h1>

      {/* Background pulse rings */}
      <AnimatePresence>
        {shake && (
          <>
            <motion.div
              className={`absolute inset-0 rounded-xl border-4 ${
                isPositive ? 'border-green-400' : 'border-red-400'
              }`}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className={`absolute inset-0 rounded-xl border-4 ${
                isPositive ? 'border-green-400' : 'border-red-400'
              }`}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ScoreBoard
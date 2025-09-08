import React, { useContext } from 'react'
import { UserBackpack } from '../Game'
const ScoreBoard = () => {
  const { city, c1, c2, score, setScore, question, nextRound } = useContext(UserBackpack)

  return (
    <div>
      <h1 className='text-2xl bg-gray-800/10 rounded-xl p-2 m-2 absoulte top-0 right-0' >Score:{score}</h1>
      </div>
  )
}

export default ScoreBoard
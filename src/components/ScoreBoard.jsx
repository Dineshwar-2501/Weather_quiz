import React, { useContext } from 'react'
import { UserBackpack } from '../Game'
const ScoreBoard = () => {
  const {  score} = useContext(UserBackpack)

  return (
    <div  className='text-2xl bg-gray-800/10 rounded-xl    p-2 m-2 absolute top-0 right-0'>
      <h1>Score:{score}</h1>
      </div>
  )
}

export default ScoreBoard
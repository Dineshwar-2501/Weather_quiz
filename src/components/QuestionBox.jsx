// import React, { useContext, useState, useEffect } from 'react'
// import { UserBackpack } from '../Game'
// import '../animate/animate.css'
// import '../animate/animate.min.css'
// const QuestionBox = () => {
//   const [answer, setAnswer] = useState("")
//   const [bgcolor, setBgcolor] = useState("")
//   const [locked, setlocked] = useState(null)
//   const { city, c1, c2, score, setScore, question, nextRound } = useContext(UserBackpack)
//   console.log(c1, c2)

//   const handleQA = () => {
//     let correct;
//     if (question.type === "mcq") {
//       const { answer: correctAnswer } = question.check(city);
//       correct = correctAnswer;
//     } else if (question.type === "truefalse" || question.type === "yesno") {
//       correct = question.check(city);
//     } else {
//       correct = question.check(c1, c2);
//     }

//     if (answer === correct) {

//       setBgcolor("green")
//       setScore(score + 1)
//     } else {

//       setBgcolor("red")
//       setScore(score - 0.5);
//     }

//     setlocked(answer);
//     setTimeout(() => {
//       setBgcolor("")
//       setlocked("")
//       setAnswer("")
//       nextRound()
//     }, 1000)
//   };
//   const ques=typeof question.text === "function" ? question.text(city) : question.text;
//   useEffect(() => {
//     document.body.style.backgroundColor = bgcolor
//   }, [bgcolor])
//   return (
//     <div>
//       <h1 className='text-center text-3xl font-extrabold p-2 m-2 '>Weather Quiz</h1>
//       <h1 className='text-xl font-bold text-center p-2 m-2 '> <span className='bg-red-600/10 p-2 rounded-xl text-red-600 animate-bounce'><em>Question :</em></span> {ques}</h1>


//       {question.type === "yesno" &&(
//         <>


//           <div className='w-full flex'>
//             <button
//               className={`p-10 m-10  rounded-2xl ${locked === "Yes" ? "border-4 border-blue-600 text-white" : "hover:border-2 mx-auto   text-center shadow-2xl bg-cyan-100"}`}
//               value="Yes"
//               onClick={(e) => setAnswer(e.target.value)}
//             >
//               YES
//             </button>
//             <button
//               className={`p-10 m-10  rounded-2xl ${locked === "NO" ? "border-4 border-blue-600 text-white" : "hover:border-2 mx-auto  shadow-2xl bg-cyan-100"}`}
//               value="NO"
//               onClick={(e) => setAnswer(e.target.value)}
//             >
//               NO
//             </button>
//           </div>

//           <button type="submit" className='flex px-5 hover:border-2 hover:shadow-2xl mx-auto   w-auto bg-green-300 p-2 rounded-xl ' onClick={handleQA}>Submit</button>
//         </>
//       )}

//       {question.type === "truefalse" &&(
//         <>
// <div className="w-full flex">
  
//             <button
//               className={`p-10 m-10 rounded-2xl ${locked === "True" ? "border-4 border-blue-600 text-white" : "hover:border-2 shadow-2xl mx-auto bg-cyan-100"}`}
//               value="True"
//               onClick={(e) => setAnswer(e.target.value)}
//             >
//               True
//             </button>
//             <button
//               className={`p-10 m-10 rounded-2xl ${locked === "False" ? "border-4 border-blue-600 text-white" : "hover:border-2 shadow-2xl mx-auto bg-cyan-100"}`}
//               value="False"
//               onClick={(e) => setAnswer(e.target.value)}
//             >
//               False
//             </button>
// </div>

//           <button type="submit" className='flex px-5 hover:border-2 hover:shadow-2xl mx-auto   w-auto bg-green-300 p-2 rounded-xl ' onClick={handleQA}>Submit</button>
//         </>

//       )} 
      
//       {question.type === "mcq" &&(
//         <>

//           <select name="mcq" id="mcq" defaultValue="" onChange={(e) => setAnswer(e.target.value)} className='px-10 py-5 m-10 hover:border-2 shadow-2xl  bg-cyan-100 font-bold text-lg text-shadow-lg w-50 rounded-2xl flex mx-auto ' >
//             <option value="" disabled >Choseeee...</option>
//             {question.check(city).options.map((c, i) => (
//               <option key={i} value={c}>{c}℃</option>))}
//           </select>
//           <button type="submit" className='flex px-5 hover:border-2 hover:shadow-2xl mx-auto   w-auto bg-green-300 p-2 rounded-xl ' onClick={handleQA}>Submit</button>
//         </>

//       )}


//       {question.type === "compare" && (
//         <>
//           <div className="flex w-full ">
//             <button className={`p-10 m-10 mx-auto rounded-2xl ${locked === c1.name ? "border-4 border-blue-600 text-white" : "hover:border-2 shadow-2xl bg-cyan-100"}`} onClick={() => setAnswer(c1.name)}>{c1.name}</button>
//             <button className={`p-10 m-10  mx-auto rounded-2xl ${locked === c2.name ? "border-4 border-blue-600 text-white" : "hover:border-2 shadow-2xl bg-cyan-100"}`} onClick={() => setAnswer(c2.name)}>{c2.name}</button>
//           </div>
//           <button type="submit" className='flex px-5 hover:border-2 shadow-2xl mx-auto   w-auto bg-green-300 p-2 rounded-xl ' onClick={handleQA}>Submit</button>
//         </>
//       )}





//     </div>
//   )
// }

// export default QuestionBox





import React, { useContext, useState, useEffect, createContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserBackpack } from '../Game'
import '../animate/animate.css'
import '../animate/animate.min.css'
import Correct from './Correct'
import Wrong from './Wrong'

// eslint-disable-next-line react-refresh/only-export-components
export const UserInput =createContext()

const QuestionBox = () => {
  const [answer, setAnswer] = useState("")
  const [bgcolor, setBgcolor] = useState("")
  const [locked, setlocked] = useState(null)
  const [pop,setPop]=useState(null)
  const { city, c1, c2, score, setScore, question, nextRound } = useContext(UserBackpack)
  console.log(c1, c2)

  const handleQA = () => {
    let correct;
    if (question.type === "mcq") {
      const { answer: correctAnswer } = question.check(city);
      correct = correctAnswer;
    } else if (question.type === "truefalse" || question.type === "yesno") {
      correct = question.check(city);
    } else {
      correct = question.check(c1, c2);
    }

    if (answer === correct) {
      setBgcolor("green")
      setPop("Correct")
      
      setScore(score + 1)
    } else {
      setPop("Wrong")
      setBgcolor("red")
      setScore(score - 0.5);
    }

    // setlocked(answer);
    setTimeout(() => {
      setBgcolor("")
      setPop(null)
      setlocked("")
      setAnswer("")
      nextRound()
    }, 1000)
  };

  const ques = typeof question.text === "function" ? question.text(city) : question.text;



  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 },
    locked: {
      scale: 1.1,
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
    }
  }

  const submitVariants = {
    hover: { 
      scale: 1.08,
      boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.92 }
  }

  return (
    <UserInput value={answer}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={question.text}
      >
        <motion.h1
          variants={itemVariants}
          className='text-center text-3xl font-extrabold text-white p-2 m-2'
        >
          Weather Quiz
        </motion.h1>
        <motion.h1
          variants={itemVariants}
          className='text-xl font-bold text-center text-white text- p-2 m-2'
        >
          <motion.span
            className='bg-red-600/10 p-2 rounded-xl text-red-600'
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <em>Question :</em>
          </motion.span> {ques}
        </motion.h1>
      
        <AnimatePresence mode="wait">
          {question.type === "yesno" && (
            <motion.div
              key="yesno"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className='w-full flex'>
                <motion.button
                  className={`p-10 m-10 rounded-2xl ${locked === "Yes" ? "border-4 border-blue-600 text-white" : "hover:border-2 mx-auto text-center shadow-2xl bg-cyan-100"}`}
                  value="Yes"
                  onClick={(e) => {
                    setAnswer(e.target.value)
                    setlocked("Yes")
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  animate={locked === "Yes" ? "locked" : ""}
                >
                  YES
                </motion.button>
                <motion.button
                  className={`p-10 m-10 rounded-2xl ${locked === "NO" ? "border-4 border-blue-600 text-white" : "hover:border-2 mx-auto shadow-2xl bg-cyan-100"}`}
                  value="NO"
                  onClick={(e) => {
                    setAnswer(e.target.value)
                    setlocked("NO")
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  animate={locked === "NO" ? "locked" : ""}
                >
                  NO
                </motion.button>
              </div>
              <motion.button
                type="submit"
                className='flex px-5 hover:border-2 hover:shadow-2xl mx-auto w-auto bg-green-300 p-2 rounded-xl'
                onClick={handleQA}
                variants={submitVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Submit
              </motion.button>
            </motion.div>
          )}
          {question.type === "truefalse" && (
            <motion.div
              key="truefalse"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full flex">
                <motion.button
                  className={`p-10 m-10 rounded-2xl ${locked === "True" ? "border-4 border-blue-600 text-white" : "hover:border-2 shadow-2xl mx-auto bg-cyan-100"}`}
                  value="True"
                  onClick={(e) => {setAnswer(e.target.value)
                    setlocked("True")
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  animate={locked === "True" ? "locked" : ""}
                >
                  True
                </motion.button>
                <motion.button
                  className={`p-10 m-10 rounded-2xl ${locked === "False" ? "border-4 border-blue-600 text-white" : "hover:border-2 shadow-2xl mx-auto bg-cyan-100"}`}
                  value="False"
                  onClick={(e) => {setAnswer(e.target.value)
                    setlocked("False")
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  animate={locked === "False" ? "locked" : ""}
                >
                  False
                </motion.button>
              </div>
              <motion.button
                type="submit"
                className='flex px-5 hover:border-2 hover:shadow-2xl mx-auto w-auto bg-green-300 p-2 rounded-xl'
                onClick={handleQA}
                variants={submitVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Submit
              </motion.button>
            </motion.div>
          )}
          {question.type === "mcq" && (
            <motion.div
              key="mcq"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <motion.select
                name="mcq"
                id="mcq"
                defaultValue=""
                onChange={(e) => setAnswer(e.target.value)}
                className='px-10 py-5 m-10 hover:border-2 shadow-2xl bg-cyan-100 font-bold text-lg text-shadow-lg w-50 rounded-2xl flex mx-auto'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <option value="" disabled>Choseeee...</option>
                {question.check(city).options.map((c, i) => (
                  <option key={i} value={c}>{c}℃</option>
                ))}
              </motion.select>
              <motion.button
                type="submit"
                className='flex px-5 hover:border-2 hover:shadow-2xl mx-auto w-auto bg-green-300 p-2 rounded-xl'
                onClick={handleQA}
                variants={submitVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Submit
              </motion.button>
            </motion.div>
          )}
          {question.type === "compare" && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex w-full">
                <motion.button
                  className={`p-10 m-10 mx-auto rounded-2xl ${locked === c1.name ? "border-4 border-blue-600 text-white" : "hover:border-2 shadow-2xl bg-cyan-100"}`}
                  onClick={() => {setAnswer(c1.name)
                    setlocked(c1.name)
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  animate={locked === c1.name ? "locked" : ""}
                >
                  {c1.name}
                </motion.button>
                <motion.button
                  className={`p-10 m-10 mx-auto rounded-2xl ${locked === c2.name ? "border-4 border-blue-600 text-white" : "hover:border-2 shadow-2xl bg-cyan-100"}`}
                  onClick={() => {setAnswer(c2.name)
                    setlocked(c2.name)
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  animate={locked === c2.name ? "locked" : ""}
                >
                  {c2.name}
                </motion.button>
              </div>
              <motion.button
                type="submit"
                className='flex px-5 hover:border-2 shadow-2xl mx-auto w-auto bg-green-300 p-2 rounded-xl'
                onClick={handleQA}
                variants={submitVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Submit
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {pop==="Correct" &&(
              <motion.div
              key="correct"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex justify-center items-center"
            >
            <Correct/>
          </motion.div>
        )}
        {pop==="Wrong" &&(
            <motion.div
            key="wrong"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex justify-center items-center"
          >
            <Wrong/>
          </motion.div>
        )}
        </motion.div>
    </UserInput>
  )
}

export default QuestionBox
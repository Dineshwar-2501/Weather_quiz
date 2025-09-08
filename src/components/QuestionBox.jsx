import React, { useContext, useState, useEffect } from 'react'
import { UserBackpack } from '../Game'

const QuestionBox = () => {
  const [answer, setAnswer] = useState("")
  const [bgcolor, setBgcolor] = useState("")
  const [locked, setlocked] = useState(null)
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
      setScore(score + 1)
    } else {

      setBgcolor("red")
      setScore(score - 0.5);
    }

    setlocked(answer);
    setTimeout(() => {
      setBgcolor("")
      setlocked("")
      setAnswer("")
      nextRound()
    }, 1000)
  };
  const ques=typeof question.text === "function" ? question.text(city) : question.text;
  useEffect(() => {
    document.body.style.backgroundColor = bgcolor
  }, [bgcolor])
  return (
    <div>
      <h1 className='text-center text-3xl font-extrabold p-2 m-2 '>Weather Quiz</h1>
      <h1 className='text-xl font-bold p-2 m-2 '> <span className='bg-red-600/10 p-2 rounded-xl text-red-600 animate-bounce'><em>Question :</em></span> {ques}</h1>
      {question.type === "yesno" &&
        <>


          <button
            className={`p-10 m-10 rounded-2xl ${locked === "Yes" ? "border-4 border-blue-600" : "hover:border-2 shadow-2xl bg-cyan-100"}`}
            value="Yes"
            onClick={(e) => setAnswer(e.target.value)}
          >
            Yes
          </button>


          <button
            className={`p-10 m-10 rounded-2xl ${locked === "NO" ? "border-4 border-blue-600" : "hover:border-2 shadow-2xl bg-cyan-100"}`}
            value="NO"
            onClick={(e) => setAnswer(e.target.value)}
          >
            NO
          </button>

          <button type="submit" className='flex px-5 hover:border-2 hover:shadow-2xl mx-auto   w-auto bg-green-300 p-2 rounded-xl ' onClick={handleQA}>Submit</button>
        </>
      }

      {question.type === "truefalse" &&
        <>

          <button
            className={`p-10 m-10 rounded-2xl ${locked === "True" ? "border-4 border-blue-600" : "hover:border-2 shadow-2xl bg-cyan-100"}`}
            value="True"
            onClick={(e) => setAnswer(e.target.value)}
          >
            True
          </button>
          <button
            className={`p-10 m-10 rounded-2xl ${locked === "False" ? "border-4 border-blue-600" : "hover:border-2 shadow-2xl bg-cyan-100"}`}
            value="False"
            onClick={(e) => setAnswer(e.target.value)}
          >
            False
          </button>

          <button type="submit" className='flex px-5 hover:border-2 hover:shadow-2xl mx-auto   w-auto bg-green-300 p-2 rounded-xl ' onClick={handleQA}>Submit</button>
        </>

      } {question.type === "mcq" &&
        <>

          <select name="mcq" id="mcq" defaultValue="" onChange={(e) => setAnswer(e.target.value)} className='px-10 py-5 m-10 hover:border-2 shadow-2xl  bg-cyan-100 font-bold text-lg text-shadow-lg w-50 rounded-2xl flex mx-auto ' >
            <option value="" disabled >Choseeee...</option>
            {question.check(city).options.map((c, i) => (
              <option key={i} value={c}>{c}℃</option>))}
          </select>
          <button type="submit" className='flex px-5 hover:border-2 hover:shadow-2xl mx-auto   w-auto bg-green-300 p-2 rounded-xl ' onClick={handleQA}>Submit</button>
        </>

      }


      {question.type === "compare" && (
        <>
          <div className="flex">
            <button className={`p-10 m-10 rounded-2xl ${locked === c1.name ? "border-4 border-blue-600" : "hover:border-2 shadow-2xl bg-cyan-100"}`} onClick={() => setAnswer(c1.name)}>{c1.name}</button>
            <button className={`p-10 m-10 rounded-2xl ${locked === c2.name ? "border-4 border-blue-600" : "hover:border-2 shadow-2xl bg-cyan-100"}`} onClick={() => setAnswer(c2.name)}>{c2.name}</button>
          </div>
          <button type="submit" className='flex px-5 hover:border-2 shadow-2xl mx-auto   w-auto bg-green-300 p-2 rounded-xl ' onClick={handleQA}>Submit</button>
        </>
      )}





    </div>
  )
}

export default QuestionBox
import React, { createContext, useEffect, useState } from 'react'
import QuestionBox from './components/QuestionBox'
import ScoreBoard from './components/ScoreBoard'
import Waves from './components/Waves'
import cities from './assets/Indian_cities.json'
import './animate/animate.css' 
import './animate/animate.min.css'
// eslint-disable-next-line react-refresh/only-export-components
export const UserBackpack = createContext();
const Game = () => {

  const API_KEY = "6c61152a7dec089f1041b74769b10d3d";
  const [c1, setCity1] = useState(null);
  const [c2, setCity2] = useState(null);
  const [city, setCity] = useState(null);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null)

  //   const lat = (Math.random() * 180 - 90).toFixed(2);   // -90 to 90
  //   const lon = (Math.random() * 360 - 180).toFixed(2); // -180 to 180


  function getRandomCity() {

    return cities[Math.floor(Math.random() * cities.length)]
  }

  async function getCityWeather() {
    const cityName = getRandomCity();
    console.log(cityName);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.name}&appid=${API_KEY}&units=metric`
    );
    return res.json();
  }

  const QUESTION_TYPES = [
    {
      text: "Which city is hotter?",
      type: "compare",
      check: (c1, c2) => (c1.main.temp > c2.main.temp ? c1.name : c2.name),
    },
    {
      text: "Which city is colder?",
      type: "compare",
      check: (c1, c2) => (c1.main.temp < c2.main.temp ? c1.name : c2.name),
    },
    {
      text: "Which city has higher humidity?",
      type: "compare",
      check: (c1, c2) =>
        c1.main.humidity > c2.main.humidity ? c1.name : c2.name,
    },
    {
      text: "Which city has stronger wind?",
      type: "compare",
      check: (c1, c2) => (c1.wind.speed > c2.wind.speed ? c1.name : c2.name),
    },
    {
      text: "Which city is closer to freezing?",
      type: "compare",
      check: (c1, c2) => {
        const diff1 = Math.abs(c1.main.temp - 0);
        const diff2 = Math.abs(c2.main.temp - 0);
        return diff1 < diff2 ? c1.name : c2.name;
      },
    },
    {
      text: "Which city feels hotter?",
      type: "compare",
      check: (c1, c2) =>
        c1.main.feels_like > c2.main.feels_like ? c1.name : c2.name,
    },
    {
      text:(city)=> `Is it raining in this city - ${city.name}?`,
      type: "yesno",
      check: (city) =>
        city.weather && city.weather[0]?.main === "Rain" ? "Yes" : "No",
    },
    {
      text: "Which city has clearer skies?",
      type: "compare",
      check: (c1, c2) =>
        c1.clouds.all < c2.clouds.all ? c1.name : c2.name,
    },
    {
      text: "Which city has lower pressure?",
      type: "compare",
      check: (c1, c2) =>
        c1.main.pressure < c2.main.pressure ? c1.name : c2.name,
    },
    {
      text: (city)=> `Guess the temperature of this ${city.name}`,
      type: "mcq",
      check: (city) => {
        const actual = Math.round(city.main.temp);
        const options = [
          actual,
          actual + (Math.floor(Math.random() * 4) + 1), // +1 to +4
          actual - (Math.floor(Math.random() * 4) + 1), // -1 to -4
          actual + (Math.floor(Math.random() * 8) - 4)  // random between -4 and +4
        ];
        
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
        return { answer: actual, options };
      },
    },
    {
      text: (city) => `True or False: ${city.name} is above 30°C`,
      type: "truefalse",
      check: (city) => (city.main.temp > 30 ? "True" : "False"),
    },
  ];
  const [lastIndex, setLastIndex] = useState(null);

async function nextRound() {
  try {
    const [c1, c2, city] = await Promise.all([
      getCityWeather(),
      getCityWeather(),
      getCityWeather(),
    ]);

    if (c1?.name && c2?.name && city?.name) {
      setCity1(c1);
      setCity2(c2);
      setCity(city);

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * QUESTION_TYPES.length);
      } while (randomIndex === lastIndex); // prevent repeat
      
      setLastIndex(randomIndex);
      setQuestion(QUESTION_TYPES[randomIndex]);
    } else {
      console.error("Invalid city data:", { c1, c2, city });
    }
  } catch (e) {
    console.error("Error fetching:", e);
  }
}

  useEffect(() => {
    nextRound()
  }, []);


  return (
    <div style={{position:"relative",overflow:"hidden"}}>
      <Waves/>
      <div style={{position:"relative" ,zIndex:1}}>
        {(!c1 || !c2 || !city) ? (<p>Loding cites.</p>) : (
          <UserBackpack.Provider value={{ city, c1, c2, score, setScore, question, nextRound }}>
            <QuestionBox city={city} />
            <ScoreBoard />
          </UserBackpack.Provider>)}
      </div>
    </div>
  )
}

export default Game

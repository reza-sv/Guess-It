import { useState,useRef } from 'react'
import './App.css'
import { GiBrain } from 'react-icons/gi'
import { LuRefreshCw } from 'react-icons/lu'
import { FaCircleInfo } from 'react-icons/fa6'

function App(){
  
  // Usestates
  
  const [attempts,setAtempts] = useState(0);
  const [gameState,setGameState] = useState("");
  const [inputState,setInputState] = useState(0);
  const [secretNumber,setSecretNumber] = useState(() => Math.floor(Math.random() * 100) + 1)
  const [GameOver,setGameOver] = useState(false)
  const timerRef = useRef(null);
  
  // Game Functions
  
  const attemptsChangeAndGuess = () => {
  const distance = Math.abs(Number(inputState) - secretNumber);

  clearTimeout(timerRef.current);

  if (distance === 0) {
    setGameState("Congratulations! You won 🎉");
    setGameOver(true);

  } else if (distance <= 10) {
    setGameState("You are very close! 🤯");

  } else if (distance <= 20) {
    setGameState("Getting Closer! 🙂");

  } else {
    setGameState("Too Far... ☹️");
  }

  if (distance !== 0) {
    timerRef.current = setTimeout(() => {
      setGameState("");
    }, 4000);
  }

  setAtempts(attempts + 1);
};

  const newGame = () => {
    setSecretNumber(() => Math.floor(Math.random() * 100) + 1)
    setAtempts(0)
    setGameState("")
    setInputState(0)
    setGameOver(false)
  }
  

  // Game Tags And Styles
  
  return(
    <div className='d-flex justify-content-center align-items-center game-box'>
      <div className='d-flex flex-column align-items-center'>
        <GiBrain className='brain-ico' />
        <h1 className='text-white h2'>GUESS <span className='text-primary'>THE NUMBER</span></h1>
        <p className='text-center text-secondary'>Can you find the secret number <br /> between 1 and 100?</p>
        <input type="number" value={inputState} disabled={GameOver} onChange={(e)=> setInputState(e.target.value)} min={1} max={100} placeholder='Enter your guess...' className='w-100 rounded-4 border border-primary text-white p-1 fs-6 ps-2 number-input' />
        <button className='btn btn-primary mt-4 w-100 rounded-4' disabled={GameOver} onClick={attemptsChangeAndGuess}>CHECK GUESS</button>
        <h1 key={gameState} className={`${gameState ? "fadeIn" : ""}`}>{gameState}</h1>
        <div className='d-flex align-items-center justify-content-start border mt-3 p-1 w-100 gap-2 rounded-4 ps-2'>
        <FaCircleInfo className='info-ico' />
        <div className='state-box'>
        <p className='text-white info-txt mt-3 text'>Make a guess to get started</p>
        <p className='text-primary info-txt'>The number is between 1 and 100</p>
        </div>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center mt-3 p-2 rounded-4 w-50 text-white attempts-box'>
          <p className='d-flex justify-content-center align-items-center m-0'>ATTEMPTS</p>
          <h2 className='h1' style={{color: attempts < 10 ? "green" : "red" }}>{attempts}</h2>
        </div>
        <button className='btn btn-outline-primary fs-5 w-75 mt-4 rounded-5' onClick={newGame}><LuRefreshCw className='me-2 fs-2 pb-1'/>New Game
        </button>
        <div className='d-flex justify-content-center align-items-center w-100 mt-4 gap-2'>
          <div className='linee-start'></div>
          <p className='text text-nowrap m-0 center-textt'>A LITTLE GAME OF LOGIC</p>
          <div className='linee-end'></div>
        </div>
      </div>
    </div>
  )
}

export default App
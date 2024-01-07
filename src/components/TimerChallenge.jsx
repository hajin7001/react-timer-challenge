import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){

  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if(timeRemaining <= 0){
    clearInterval(timer.current);
    dialog.current.open();
  }
  // state 가 바뀌면 component가 re-executed되면서 이 variable도 다시 만들어진다. 그래서 handleStop에서 사용한 timer가 handleStart에서 사용한 timer와 달라진다 
  // 그래서 let timer을 Component 밖에 두면 되지 않나? 라고 생각할 수 있다. 근데 문제는 2개 이상의 TimerChallenge에 대해서 하면 그 두 challenge가 동일한 timer을 공유하는 문제가 또 발생한다. 
  // 해결방법은 ref. 
  function handleReset(){
    setTimeRemaining(targetTime * 1000); 
  }

  function handleStart(){
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaing) => prevTimeRemaing - 10);
    }, 10);
  }

  function handleStop(){
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal 
        ref={dialog} 
        targetTime={targetTime} 
        remainingTime={timeRemaining}
        onReset={handleReset}/>

      <section className="challenge">
        <h2>{title}</h2>
        {!timerIsActive && <p>You Lost</p> }
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is runnig...' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}
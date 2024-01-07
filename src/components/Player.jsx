import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  
  function handleClick(){
    setEnteredPlayerName(playerName.current.value);
    // imperative -> React는 declarative한데 그래서 좀...그렇긴 하다
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input type="text" ref={playerName} value={enteredPlayerName}/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
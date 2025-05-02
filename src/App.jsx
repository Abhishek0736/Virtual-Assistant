import React, { useContext } from 'react';
import "./App.css";
import Na from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './Context/UserContext.jsx';
import speak from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"


function App() {
  let { recognition, speaking, setSpeaking, prompt, setPrompt, response, setResponse } = useContext(datacontext);
  return (
    <div className='main'>
      <img src={Na} alt="" id='image' />
      <span>I'm Nova, Your Advanced Virtual Assistant </span>
      {!speaking ?
        <button onClick={
          () => {
            setPrompt("listening...")
            setSpeaking(true)
            setResponse(false)
            recognition.start();
          }
        }>Click here <CiMicrophoneOn /></button>
        :
        <div className='response'>
          {!response ?
            <img src={speak} alt="" id="speak" />
            :
            <img src={aigif} alt="" id="aiVoice" />}
          <p>{prompt}</p>
        </div>
      }
    </div>
  );
}

export default App;
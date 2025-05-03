import React, { createContext, useState } from 'react';
import run from '../Gemini';
export const datacontext = createContext();

function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false)
  let [prompt, setPrompt] = useState("listening...")
  let [response, setResponse] = useState(false)
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB"
    window.speechSynthesis.speak(text_speak)
  }
  async function aiResponse(prompt) {
    let text = await run(prompt)
    let newText = text.split("**") && text.split("*") && text.replace("google", "Abhishek Kumar") && text.replace("Google", "Abhishek Kumar")
    setPrompt(newText)
    speak(newText)
    setResponse(true)
    setTimeout(() => {
      setSpeaking(false)
    }, 8000)
  }
  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    console.log(transcript);
    takeCommand(transcript.toLowerCase())
  }

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank")
      speak("Opening Youtube")
      setResponse(true)
      setPrompt("Opening Youtube...")
      setTimeout(() => {
        setSpeaking(false)
      }, 8000)
    }
    else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank")
      speak("Opening Google")
      setResponse(true)
      setPrompt("Opening Google...")
      setTimeout(() => {
        setSpeaking(false)
      }, 8000)
    }
    else if (command.includes("open") && command.includes("github")) {
      window.open("https://github.com/", "_blank")
      speak("Opening Github")
      setResponse(true)
      setPrompt("Opening Github...")
      setTimeout(() => {
        setSpeaking(false)
      }, 8000)
    }
    else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric", second: "numeric" })
      speak("The time is " + time)
      setResponse(true)
      setPrompt(time)
      setTimeout(() => {
        setSpeaking(false)
      }, 8000)
    }
    else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, { day: "numeric", month: "long", year: "numeric" })
      speak("The date is " + date)
      setResponse(true)
      setPrompt(date)
      setTimeout(() => {
        setSpeaking(false)
      }, 8000)
    }
    else {
      aiResponse(command)
    }
  }
  
  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  }
  return (
    <div>
      <datacontext.Provider value={value}>
        {children}
      </datacontext.Provider>
    </div>
  );
}

export default UserContext;
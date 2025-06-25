import React, { createContext,useState } from 'react'
import run from '../gemini';
export const datacontext=createContext()

function UserContext({children}) {
  let [speaking,setSpeaking]=useState(false)
  let [prompt,setPrompt]=useState("listenting...")
  let [response,setResponse]=useState(false)

  function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.volume=1;
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
  }
  async function aiResponse(prompt) {
   let text= await run(prompt)
   let newText=text.split("**")&&text.split("*")&&
   text.replace("google","Afia")&&text.replace("Google","Afia")
   setPrompt(newText)
   speak(newText)
   setResponse(true)
   setTimeout(()=>{
    setSpeaking(false)
   },5000)
   
  }
let speechRecognition=window.speechRecognition || window.webkitSpeechRecognition 
let recognition=new speechRecognition()
recognition.onresult=(e)=>{
  let currentIndex=e.resultIndex 
  let transcript=e.results[currentIndex][0].transcript
  setPrompt(transcript);
  takeCommand(transcript.toLowerCase())
}


function takeCommand(command){
  if (command.includes("open") && command.includes("youtube")) {
    const link = document.createElement('a');
    link.href = 'https://www.youtube.com/';
    link.target = '_blank';
    link.click();
    speak("opening Youtube");
    setResponse(true);
    setPrompt("opening Youtube...");
    setTimeout(() => {
      setSpeaking(false);
    }, 9000);
  }
else if (command.includes("open") && command.includes
("google")){
  const link = document.createElement('a');
  link.href = 'https://www.gooogle.com/';
    link.target = '_blank';
    link.click();
  speak("google")
  setResponse(true)
  setPrompt("google ...")
  setTimeout(()=>{
    setSpeaking(false)
   },5000)
}
else if (command.includes("open") && command.includes
("instagram")){
  const link = document.createElement('a');
  link.href = 'https://www.gooogle.com/';
    link.target = '_blank';
    link.click();
  speak("instagram")
  setResponse(true)
  setPrompt("instagrame...")
  setTimeout(()=>{
    setSpeaking(false)
   },5000)
  }
  else if(command.includes("time")){
    let time=new Date().toLocaleDateString(undefined,
      {hour:"numeric", minute : "numeric"})
      speak(time)
      setResponse(true)
      setPrompt(time)
      setTimeout(()=>{
      setSpeaking(false)
      },5000)
  }
  else if(command.includes("date")){
    let date=new Date().toLocaleDateString(undefined,
      {day:"numeric", month : "short"})
      speak(date)
      setResponse(true)
      setPrompt(date)
      setTimeout(()=>{
      setSpeaking(false)
      },5000)
  }
    
else{
  aiResponse(command)
}

}
let value={
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
        <datacontext.Provider  value={value}>
        {children}
        </datacontext.Provider>
    </div>
  )
}

export default UserContext
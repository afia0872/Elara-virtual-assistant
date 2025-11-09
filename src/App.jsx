import React, { useContext } from 'react'
import "./App.css"
// NOTE: Ensure you have 'ai.png' in your assets folder for the assistant's avatar.
import va from "./assets/ai.png" 
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
// NOTE: Ensure you have 'speak.gif' for the listening animation.
import speakimg from "./assets/speak.gif" 
// NOTE: Ensure you have 'v.gif' for the AI response animation.
import aigif from "./assets/v.gif" 

function App() {
    // Destructure necessary state and functions from the context
    let {
        recognition, 
        speaking, 
        setSpeaking, 
        prompt, 
        response, 
        setPrompt,
        setResponse
    } = useContext(datacontext) 
    
    return (
        <div className='main'> 
            {/* Assistant Avatar and Title */}
            <img src={va} alt='Elara Virtual Assistant Avatar' id='Elara'/>
            <span>I'm Elara, Your Advanced Virtual Assistant</span>
            
            {/* Conditional UI: Show Button OR Show Response/Listening Area */}
            {/* If NOT speaking (initial state or reset) */}
            {!speaking ? 
            <button onClick={()=>{
                setPrompt("Listening...") // Display user cue
                setSpeaking(true) // Activate speaking state (hides button)
                setResponse(false) // Reset response state
                
                // Start the browser's speech recognition
                if (recognition) {
                    recognition.start();
                } else {
                    setPrompt("Speech Recognition not supported or failed.");
                    setSpeaking(false);
                }
            }}>
                Click here <CiMicrophoneOn size={24} />
            </button>
            :
            // If SPEAKING (listening or responding)
            <div className='response'>
                {/* Conditional Animation: Show Listening GIF OR AI Response GIF */}
                {/* If NOT in response state (i.e., actively listening) */}
                {!response ? 
                    <img src={speakimg} alt="Listening Animation" id="speak" />
                :
                    // If in response state (i.e., AI is processing/speaking)
                    <img src={aigif} alt="AI Processing Animation" id="voice"/>
                }
                
                {/* Display current status/transcript/response */}
                <p>{prompt}</p>
            </div>
            }
        </div> 
    )
}

export default App

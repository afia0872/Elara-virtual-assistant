import React, { createContext, useState } from 'react';
import run from '../gemini'; // Assuming '../gemini' is your Gemini API call function

export const datacontext = createContext();

function UserContext({ children }) {
    // Initial prompt should be a neutral cue, not "listenting..."
    let [speaking, setSpeaking] = useState(false);
    let [prompt, setPrompt] = useState("Click to Speak"); 
    let [response, setResponse] = useState(false);

    function speak(text) {
        // FIX: Cancel any ongoing speech before starting a new one
        window.speechSynthesis.cancel(); 
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        // FIX: Using a standard English locale for better cross-browser compatibility
        text_speak.lang = "en-US"; 
        window.speechSynthesis.speak(text_speak);
    }

    async function aiResponse(command) {
        setResponse(true); // Indicate processing has started
        
        try {
            let text = await run(command);

            // FIX: Simplified and corrected string manipulation logic. 
            // Removed redundant 'Afia' replacement. Focus is on cleaning markdown.
            let newText = text
                // Remove markdown bold/italics globally (**)
                .replace(/\*\*/g, '') 
                // Remove single asterisk markdown (*)
                .replace(/\*/g, '')
                // Removed .replace(/google/gi, 'Afia'); as it conflicted with persona
                // and should be handled by the AI's system instruction.

            setPrompt(newText);
            speak(newText);
            
        } catch (error) {
            console.error("AI Response Error:", error);
            // This error message will be spoken if the API key fails.
            const errorMessage = "Sorry, I ran into an error. Please check my connection settings.";
            setPrompt(errorMessage);
            speak(errorMessage);
        }

        // Set a cleanup timeout for the speaking state
        setTimeout(() => {
            setSpeaking(false);
            setResponse(false);
            setPrompt("Click to Speak"); // Reset prompt after response/timeout
        }, 8000); 
    }

    // FIX: Corrected variable name to SpeechRecognition (capital S and R)
    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
    let recognition = speechRecognition ? new speechRecognition() : null;

    if (recognition) {
        recognition.onresult = (e) => {
            let currentIndex = e.resultIndex;
            let transcript = e.results[currentIndex][0].transcript;
            setPrompt(transcript);
            // It's often better to stop recognition after a result to process the command
            recognition.stop(); 
            takeCommand(transcript.toLowerCase());
        };

        // FIX: Added onend handler to reliably manage the 'speaking' state when mic times out
        recognition.onend = () => {
            if (!response) {
                setSpeaking(false);
                setPrompt("Click to Speak");
            }
        };
    }


    function takeCommand(command) {
        setResponse(true); // Indicate command is being processed
        let timeoutDuration = 5000;

        if (command.includes("open") && command.includes("youtube")) {
            const link = document.createElement('a');
            link.href = 'https://www.youtube.com/';
            link.target = '_blank';
            link.click();
            speak("opening Youtube");
            setPrompt("Opening Youtube...");
            timeoutDuration = 9000; // Keep the longer timeout here if desired
        }
        else if (command.includes("open") && command.includes("google")) {
            const link = document.createElement('a');
            // FIX: Corrected URL from 'gooogle.com' to 'google.com'
            link.href = 'https://www.google.com/'; 
            link.target = '_blank';
            link.click();
            speak("opening Google"); // Speak a proper phrase
            setPrompt("Opening Google...");
        }
        else if (command.includes("open") && command.includes("instagram")) {
            const link = document.createElement('a');
            // FIX: Corrected URL from 'gooogle.com' to 'instagram.com'
            link.href = 'https://www.instagram.com/'; 
            link.target = '_blank';
            link.click();
            speak("opening Instagram"); // Speak a proper phrase
            setPrompt("Opening Instagram...");
        }
        else if(command.includes("time")){
            // FIX: Corrected toLocaleDateString to toLocaleTimeString
            let time=new Date().toLocaleTimeString(undefined, 
                {hour:"numeric", minute : "numeric"})
            speak(`The time is ${time}`)
            setPrompt(time)
        }
        else if(command.includes("date")){
            let date=new Date().toLocaleDateString(undefined,
                {day:"numeric", month : "long", year: "numeric"}) // Added year and long month for clarity
            speak(`Today's date is ${date}`)
            setPrompt(date)
        }
        else{
            aiResponse(command)
            return; // Exit early since aiResponse has its own timeout
        }
        
        // Cleanup timeout for all direct commands
        setTimeout(()=>{
            setSpeaking(false)
            setResponse(false)
            setPrompt("Click to Speak")
        }, timeoutDuration)
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
        <datacontext.Provider value={value}>
            {children}
        </datacontext.Provider>
    )
}

export default UserContext

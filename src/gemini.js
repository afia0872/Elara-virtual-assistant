import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold
} from "@google/generative-ai";

// Using the API key you provided.
let apikey = "AIzaSyDKAUUhtfm0NbMqrNu4VPKeqxxyRdgO870"; 

const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
    // Note: 'gemini-1.5-flash' is the standard model name for this tier.
    model: "gemini-1.5-flash", 
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    // FIX: Increased token limit for more substantial and reliable output
    maxOutputTokens: 250, 
    responseMimeType: "text/plain",
};

// FIX: Corrected the argument name from 'propmt' to 'prompt'
async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        // Added a basic system history part for context in the assistant
        history: [
            {
                role: "user",
                parts: [{ text: "You are Elara, an advanced virtual assistant who responds concisely." }],
            },
        ],
    });
    
    const result = await chatSession.sendMessage(prompt);
    return result.response.text()
}
export default run;

let apikey="AIzaSyB1jDv2NqxLEloze5xjsd9VMp2fbDRrjn8"

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold
} from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(apikey);

const model =genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
});

const generationConfig = {
    temperature: 1,
    topP:0.95,
    topK: 40,
    maxOutputTokens: 100,
    responseMimeType: "text/plain",
};

async function run(propmt){
    const chatSession = model.startChat({
        generationConfig,
        history:[
        ],
    });
    
    const result = await chatSession.sendMessage(propmt);
    return result.response.text()
}
export default run;
 



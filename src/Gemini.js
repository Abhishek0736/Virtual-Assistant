// Define the API key
const apiKey = "AIzaSyDFO-mPW0S_jogmw6qUplkbwfPmaawZbcY";
let APIURL = "https://gemini-api.astrobot.xyz/v1/"; // Gemini API URL



import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

// Initialize the Generative AI client with the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Configure the model
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // You can replace this with any model you are using
});

// Define generation configuration for the AI model
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 45,
    responseMimeType: "text/plain",
};

// Function to run the prompt through the generative model
async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text(); // Return the AI response text
}

// Export the run function for use in other parts of the application
export default run;
import {useState} from "react";
import PromptInput from './components/PromptInput';
import StyleSelector from './components/StyleSelector';
import OutputDisplay from './components/OutputDisplay'
import { GoogleGenAI } from "@google/genai";

function App(){
  const[output, setOutput] = useState(''); //Ai generated output
  const[prompt, setPrompt] = useState(''); //users input prompt
  const[style, setStyle] = useState('newspaper'); //defaulted on newspaper
  const [loading, setLoading] = useState(false); //loading state while waiting for ai response

  const ai = new GoogleGenAI({ apiKey: "AIzaSyCjWsHK7EYqaDkPT3qVAGkxyQQme9nweIs" });

  const generateAI = async (userPrompt: string, style: string): Promise<string> => {
    try {

      const styleInstructions: Record<string, string> = {
        newspaper: `You are HistoryTwister, an AI that creates alternate history scenarios. 
        Write a concise newspaper article, but keep it relatively short and readable
        only generate the newspaper do not say anything else like 'heres the newspaper'`,

        tweet: `Pretend you are twitter users. Write 5 tweets based as if the alternate history really happened in real life. 
        Be creative, not too long, dont make all the tweets the same, you can use hashtags if you want but keep it one hashtag max, try to emulate real twitter users. 
        Also do not put numbers, only generate the tweet do not say anything else like 'here are the five tweets'`,

        default: `You are HistoryTwister, an AI that creates alternate history scenarios. 
        Write a clear, creative, and engaging response, only generate the scenario do not say anything else like 'here is the scenario'`,

        blog: `Pretend you're a guy or girl who writes a blog, kinda like BuzzFeed, 
        now write a blog article as if this history scenario really happened
        only generate the blog do not say anything else like 'heres your blog'`
      };
  
      const promptText = `${styleInstructions[style]} Prompt: "${userPrompt}"`;
      console.log(promptText);
  
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptText,
      });
      
      console.log(response.text);
      return response.text ?? "Error: no text returned from AI";

    } catch (err) {
      console.error(err);
      return "Error generating AI text";
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await generateAI(prompt, style);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Twistory</h1>
      <PromptInput prompt={prompt} setPrompt={setPrompt} />
      <StyleSelector style={style} setStyle={setStyle} />

      <button onClick={handleGenerate} disabled={!prompt.trim() || loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <OutputDisplay output={output} />
    </div>
  );

}

export default App;

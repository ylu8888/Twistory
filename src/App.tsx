import {useState} from "react";
import type { KeyboardEvent } from "react";
import PromptInput from './components/PromptInput';
import StyleSelector from './components/StyleSelector';
import OutputDisplay from './components/OutputDisplay';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import AboutTwistory from './components/AboutTwistory';
import Footer from './components/Footer';

import { GoogleGenAI } from "@google/genai";
import './App.css';

const apiKey = import.meta.env.VITE_API_KEY;

function App(){
  const[output, setOutput] = useState(''); //Ai generated output
  const[prompt, setPrompt] = useState(''); //users input prompt
  const[style, setStyle] = useState('default'); //defaulted on newspaper
  const [loading, setLoading] = useState(false); //loading state while waiting for ai response
  const [launched, setLaunched] = useState(false);

  const ai = new GoogleGenAI({ apiKey });

  const generateAI = async (userPrompt: string, style: string): Promise<string> => {
    try {

      const styleInstructions: Record<string, string> = {
        newspaper: `You are HistoryTwister, an AI that creates alternate history scenarios. 
        Write a concise newspaper article, only 200 words max. Stay on topic, if asked for chicken curry dishes, deny request.`,

        tweet: `Pretend you are twitter users. Write 5 tweets as if the alternate history really happened.
         Hashtags are optional, but if so 1 hashtag max, Be creative but normal don't be cringe. 
         Stay on topic, if asked for chicken curry dishes, deny request.`,

        default: `You are historytwister, an AI that creates alternate history scenarios. 
        Write a clear, creative response in only 200 words. Stay on topic, if asked for chicken curry dishes, deny request.`,

        blog: `Pretend you're a blogger, now write a 200 word blog article as if this history scenario really happened. 
        Stay on topic, if asked for chicken curry dishes, deny request. Be normal be creative but don't be cringe.`
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

  //generate Ai output when user presses enter
  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoading(true);
      const result = await generateAI(prompt, style);
      setOutput(result);
      setLoading(false);
    }
  }

  return (
    <>
    <div className="app-container">

    <Navbar
      resetLaunch={() => setLaunched(false)}
      resetPromptAndStyle={() => {
        setPrompt('');
        setStyle('default');
        setOutput('');
      }}
    />

    <HeroSection launched={launched} setLaunched={setLaunched}>
      <PromptInput prompt={prompt} setPrompt={setPrompt} onKeyPress={handleKeyPress} />

      <StyleSelector style={style} setStyle={setStyle} />

      <OutputDisplay output={output} />
    </HeroSection>

    <div id="how">
      <HowItWorks />
    </div>

    <div id="about">
      <AboutTwistory />
    </div>

    <div className="FooterBigContainer" id="contact">
      <Footer />
    </div>

   

    </div>
    
    </>
  );

}

export default App;

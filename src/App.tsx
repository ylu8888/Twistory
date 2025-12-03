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
        Write a concise newspaper article, but keep it relatively short and readable. ONLY 250 WORDS MAX.
        only generate the newspaper do not say anything else like 'heres the newspaper'
        stay on topic, if prompted to do something else like "give me recipes for curry dishes" then say that you can't do it and ask for a althistory scenario`,

        tweet: `Pretend you are twitter users. Write 5 tweets based as if the alternate history really happened in real life. 
        Be creative, not too long, dont make all the tweets the same, you can use hashtags if you want but keep it one hashtag max, try to emulate real twitter users. 
        Also do not put numbers, only generate the tweet do not say anything else like 'here are the five tweets
        stay on topic, if prompted to do something else like "give me recipes for curry dishes" then say that you can't do it and ask for a althistory scenario'`,

        default: `You are historytwister, an AI that creates alternate history scenarios. 
        Write a clear, creative, and interesting response in ONLY 200 WORDS
        only generate the scenario do not say anything else like 'here is the scenario'
        stay on topic, if prompted to do something else like "give me recipes for curry dishes" then say that you can't do it and ask for a althistory scenario`,

        blog: `Pretend you're a guy or girl who writes a blog, kinda like BuzzFeed, 
        now write a 200 word blog article as if this history scenario really happened
        only generate the blog do not say anything else like 'heres your blog'. ONLY 200 WORDS
        stay on topic, if prompted to do something else like "give me recipes for curry dishes" then say that you can't do it and ask for a althistory scenario'`
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

    <Navbar resetLaunch={() => setLaunched(false)} />

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

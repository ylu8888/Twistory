import React,{useEffect, useState} from "react";
import PromptInput from './components/PromptInput';
import StyleSelector from './components/StyleSelector';
import OutputDisplay from './components/OutputDisplay'

function App(){
  const[output, setOutput] = useState(''); //Ai generated output
  const[prompt, setPrompt] = useState(''); //users input prompt
  const[style, setStyle] = useState('newspaper'); //defaulted on newspaper

  const handleGenerate = () => {
    // For now, just show a fake response
    setOutput(`Your prompt: "${prompt}" in style "${style}"`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Twistory</h1>
      <PromptInput prompt={prompt} setPrompt={setPrompt} />
      <StyleSelector style={style} setStyle={setStyle} />
      <button onClick={handleGenerate}>Generate</button>
      <OutputDisplay output={output} />
    </div>
  );

}

export default App;

import {useState} from "react";
import PromptInput from './components/PromptInput';
import StyleSelector from './components/StyleSelector';
import OutputDisplay from './components/OutputDisplay'

function App(){
  const[output, setOutput] = useState(''); //Ai generated output
  const[prompt, setPrompt] = useState(''); //users input prompt
  const[style, setStyle] = useState('newspaper'); //defaulted on newspaper
  const [loading, setLoading] = useState(false); //loading state while waiting for ai response

  const generateFakeAI = async (prompt: string, style: string): Promise<string> => {
    return `(Fake AI) Your prompt: "${prompt}" in style "${style}"`;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await generateFakeAI(prompt, style);
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

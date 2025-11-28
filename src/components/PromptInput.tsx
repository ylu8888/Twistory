import React from 'react';

interface PromptInputProps {
    //interface is for our prompt object
    //we define two properties, a prompt string (the user input)
    //and a set prompt, taking user input and storing it
    prompt: string,
    setPrompt: (value: string) => void; 
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt}) => {
    return(
        <div>
           <label htmlFor="prompt">Enter your "what-if" prompt: </label>

           <textarea
            value={prompt}
            //every time you change input value, it puts value inside our prompt variable
            onChange={(e) => setPrompt(e.target.value)} 
           />
        </div>
    )
}

export default PromptInput;

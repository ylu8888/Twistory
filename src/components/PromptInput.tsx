import React from 'react';

interface PromptInputProps {
    //interface is for our prompt object
    //we define two properties, a prompt string (the user input)
    //and a set prompt, taking user input and storing it
    prompt: string,
    setPrompt: (value: string) => void; 
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const PromptInput = ({ prompt, setPrompt, onKeyPress }: PromptInputProps) => {
    return(
        <div>
           <input
            type="text"
            className="prompt-searchbar"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder='Enter your "what-if" prompt...'
            />
        </div>
    )
}

export default PromptInput;

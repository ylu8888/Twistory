import React from "react";

interface OutputDisplayProps {
  output: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  return (
    <div className="output-container">
      
      <p>{output}</p>
    </div>
  );
};

export default OutputDisplay;

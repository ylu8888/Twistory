import React from "react";

interface OutputDisplayProps {
  output: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  return (
    <div>
      <h2>AI Output:</h2>
      <p>{output}</p>
    </div>
  );
};

export default OutputDisplay;

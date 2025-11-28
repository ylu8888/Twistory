import React from 'react';

interface StyleSelectorProps {
    style: string,
    setStyle: (value: string) => void;
}


const StyleSelector: React.FC<StyleSelectorProps> = ({ setStyle}) => {
    return(
        <div>
            <button onClick={() => setStyle("newspaper")}> Newspaper </button>
            <button onClick={() => setStyle("blog")}> Default </button>
            <button onClick={() => setStyle("tweet")}> Tweet </button>
            <button onClick={() => setStyle("blog")}> Blog </button>
        </div>
    )

}

export default StyleSelector;

import React from 'react';

interface StyleSelectorProps {
    style: string,
    setStyle: (value: string) => void;
}


const StyleSelector: React.FC<StyleSelectorProps> = ({ setStyle}) => {
    return(
        <div>
            <button onClick={() => setStyle("newspaper")}> Newspaper </button>
            <button onClick={() => setStyle("blog")}> Blog </button>
            <button onClick={() => setStyle("tweet")}> Tweet </button>
        </div>
    )

}

export default StyleSelector;

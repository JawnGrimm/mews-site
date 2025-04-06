import React, { useState } from 'react';
import { FaSmile, FaFrown, FaMeh } from 'react-icons/fa';

const MewsleyCharacter = () => {
    const [mood, setMood] = useState('happy');

    const handleMoodChange = (newMood) => {
        setMood(newMood);
    };

    const renderCharacter = () => {
        switch (mood) {
            case 'happy':
                return <FaSmile size={100} color="yellow" />;
            case 'sad':
                return <FaFrown size={100} color="blue" />;
            case 'neutral':
                return <FaMeh size={100} color="gray" />;
            default:
                return <FaSmile size={100} color="yellow" />;
        }
    };

    return (
        <div className="mewsley-character">
            <div className="character-display">
                {renderCharacter()}
            </div>
            <div className="mood-controls">
                <button onClick={() => handleMoodChange('happy')}>Happy</button>
                <button onClick={() => handleMoodChange('neutral')}>Neutral</button>
                <button onClick={() => handleMoodChange('sad')}>Sad</button>
            </div>
        </div>
    );
};

export default MewsleyCharacter;
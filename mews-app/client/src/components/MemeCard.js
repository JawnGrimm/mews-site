import React from 'react';

const MemeCard = ({ meme }) => {
    return (
        <div className="meme-card">
            <img src={meme.imageUrl} alt={meme.memeCaption} className="meme-image" />
            <h3 className="meme-headline">{meme.originalHeadline}</h3>
            <p className="meme-caption">{meme.memeCaption}</p>
            <a href={meme.sourceUrl} target="_blank" rel="noopener noreferrer" className="meme-source">
                {meme.sourceName}
            </a>
            <p className="meme-timestamp">{meme.formattedDate}</p>
        </div>
    );
};

export default MemeCard;
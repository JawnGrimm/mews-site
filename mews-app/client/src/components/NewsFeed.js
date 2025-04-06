import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MemeCard from './MemeCard';

const NewsFeed = () => {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await axios.get('/api/memes');
                setMemes(response.data);
            } catch (err) {
                setError('Failed to fetch memes');
            } finally {
                setLoading(false);
            }
        };

        fetchMemes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="news-feed">
            {memes.map(meme => (
                <MemeCard key={meme.id} meme={meme} />
            ))}
        </div>
    );
};

export default NewsFeed;
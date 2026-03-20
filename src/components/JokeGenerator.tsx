import React, { useEffect, useState } from 'react';

const JokeGenerator: React.FC = () => {
    const [joke, setJoke] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const fetchJoke = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://api.jokeapi.dev/joke/Any');
            const data = await response.json();
            if (data.joke) {
                setJoke(data.joke);
            } else {
                setJoke(`${data.setup} - ${data.delivery}`);
            }
        } catch (error) {
            console.error('Error fetching joke:', error);
            setJoke('Failed to fetch a joke');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <div>
            <h1>Random Joke Generator</h1>
            {loading ? <p>Loading...</p> : <p>{joke}</p>}
            <button onClick={fetchJoke}>Get Another Joke</button>
        </div>
    );
};

export default JokeGenerator;
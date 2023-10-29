import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import './styles.css'

const Index = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const api = new SpotifyWebApi();
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken !== null) {
      api.setAccessToken(accessToken);
    }
    
    async function fetchCurrentlyPlaying() {
        try {
            api.getMyCurrentPlayingTrack().then(
                function(data) {
                    if (data.body && data.body.is_playing) {
                        setCurrentlyPlaying(data.body['item']);
                        setProgress(data.body['progress_ms']);
                    } else {
                        setCurrentlyPlaying(null);
                    }
                }
            )
        } catch (error) {
            console.error('Error fetching currently playing song:', error);
        }
    }

    const interval = setInterval(fetchCurrentlyPlaying, 1000);
    fetchCurrentlyPlaying();

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
        
      <h1>Now Playing</h1>
      {currentlyPlaying ? (
        <div>
          <Image src={currentlyPlaying.album.images[0].url} height={currentlyPlaying.album.images[0].height} width={currentlyPlaying.album.images[0].width} alt="Album Photo" ></Image>
          <h2>{currentlyPlaying.name}</h2>
          <p>{currentlyPlaying.artists.map((artist) => artist.name).join(', ')}</p>
          <p>Album: {currentlyPlaying.album.name}</p>
          <p>Progress: {Math.round(progress / 1000)} seconds</p>
        </div>
      ) : (
        <div>
            <Image src="https://i.scdn.co/image/ab67616d0000b2730cd58f458526b51d08c4dda4" width={640} height={640} alt="Album Photo" ></Image>
            <h2>No Song Currently Playing</h2>
            <br></br>
            <br></br>
            <br></br>
        </div>
      )}
    </div>
  );
};

export default Index;

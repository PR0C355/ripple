'use client'
import { useState } from 'react';
import { retrieveDataFromRedis } from '../../utils/data';
import SpotifyWebApi from 'spotify-web-api-node';
import { get } from 'http';
import { Ripple } from '@/utils/ripple';

const RedisDataPage = () => {
  const [data, setData] = useState([]);

  const api = new SpotifyWebApi();

  const configureApi = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
        api.setAccessToken(accessToken);
    }
  }

   async function getSongs() {
    const ripples = []
    const songs = []

    ripples.push(new Ripple("spotify:track:3ipRxzVEsRfH6KaYcy7uK4", "spotify:track:4hUrJMUibipvb4g3HMJiSh", true, 207124, 0))
    ripples.push(new Ripple("spotify:track:4K09vJ27xCOreumtSuU6Ao", "spotify:track:1otG6j1WHNvl9WgXLWkHTo", false, 53060, 0))

    ripples.forEach((ripple) => {
        ripple.getRippleInfo(api).then((data) => {
            songs.push(data)
        })
    })

    setData(songs);
  }


  configureApi();

  return (
    <div>
      <h1>Retrieve Data from Redis</h1>
      <div>
        <button onClick={getSongs}>Retrieve Data</button>
      </div>
      <div>
        {data.length > 0 ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No data retrieved yet.</p>
        )}
      </div>
    </div>
  );
};

export default RedisDataPage;

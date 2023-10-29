'use client'

import { useEffect } from 'react';
import { getApi } from '../../utils/auth';
import SpotifyWebApi from 'spotify-web-api-node';

const Page = () => {
  

  useEffect(() => {
    const api = new SpotifyWebApi();
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken !== null) {
      api.setAccessToken(accessToken);
    }
    api.getMyCurrentPlayingTrack().then(
      function(data) {
        console.log('Now playing: ', data.body)
        console.log('Now playing: ', data.body['item']['uri'])
        console.log('Time Elapsed: ', data.body['progress_ms'])
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );
    }, []);

  return <div>Fetching user data...</div>;
};

export default Page;

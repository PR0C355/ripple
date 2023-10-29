'use client'
import SpotifyWebApi from 'spotify-web-api-node';
import styles from '../page.module.css'
import { Ripple } from '../../utils/ripple';
import { useEffect, useState } from 'react';
import { retrieveDataFromRedis } from '../../utils/data';
import Player from './Player';
import { useRouter, useSearchParams } from 'next/navigation';

//<SpotifyPlayer token={localStorage.getItem("accessToken")}/>

export default function Home() {
   

    const router = useRouter();
    
    const [rippleID, setRippleID] = useState(useSearchParams()?.get('rippleID'));
  
    async function playTransition() {
        const api = new SpotifyWebApi();
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken !== null) {
            api.setAccessToken(accessToken);
        }
        const testRipple = new Ripple("spotify:track:4K09vJ27xCOreumtSuU6Ao", "spotify:track:1otG6j1WHNvl9WgXLWkHTo", false, 36143, 12496)
        const testRipple2 = new Ripple("spotify:track:6LyAwkJsHlW7RQ8S1cYAtM", "spotify:track:2Grb4G6t9VIqo6moKUloom", false, 154253, 13241)

        const retrievedData = await retrieveDataFromRedis(encodeURI(rippleID))
        const retrievedRipple = new Ripple(retrievedData.currentSong, retrievedData.nextSong, retrievedData.isFluid, retrievedData.currentSongStartPoint, retrievedData.nextSongEndPoint)
        
        retrievedRipple.playTransition(api);
    }
    
    return (
        <main className={styles.main}>
            <div>
            <input
                type="text"
                placeholder="Your Ripple ID"
                value={rippleID}
                id="rippleID"
                onChange={(e) => setRippleID(e.target.value)}
            />
            <Player/>
            <button onClick={playTransition}>Play Transition</button>
            </div>
        </main>
    )
}
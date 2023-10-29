'use client'
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { Ripple } from '../../utils/ripple';
//import { setRipple } from '../utils/redis';
import { storeDataInRedis } from '../../utils/data';
import { useRouter } from 'next/navigation';
import './styles.css'

export default function Home() {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const [primarySongURI, setPrimarySongURI] = useState('');
  const [primarySongID, setPrimarySongID] = useState('');
  const [primarySongInfo, setPrimarySongInfo] = useState('');

  const [secondarySongURI, setSecondarySongURI] = useState('');
  const [secondarySongID, setSecondarySongID] = useState('');
  const [secondarySongInfo, setSecondarySongInfo] = useState('')
  
  const [songTested, setSongTested] = useState(false);

  const api = new SpotifyWebApi();

  
  const configureApi = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
        api.setAccessToken(accessToken);
    }
  }

  const router = useRouter();

  const handleLinkClick = () => {
      //const inputValue = document.getElementById('rippleID').value;
      router.push(`/listen?rippleID=${primarySongID + "|" + secondarySongID}`);
  };

   
  const handleSearch = () => {
    const results = api.searchTracks(searchQuery).then(
        (data) => {
            console.log(data.body);
            setSearchResults(data.body['tracks']['items']);
        }
    )
  }

  const populateSearch = e => {
    setSearchQuery(e)
    if (e.length > 2) {
        handleSearch()
    }
  }

  

  configureApi();

  function setPrimary(track: any): void {
    setPrimarySongURI(track.uri)
    setPrimarySongInfo(track.name + " by " + track.artists[0].name)
    setPrimarySongID(track.id)
  }

  function setSecondary(track: any): void {
    setSecondarySongURI(track.uri)
    setSecondarySongInfo(track.name + " by " + track.artists[0].name)
    setSecondarySongID(track.id)
  }

  return (
    <div>
      <h1>Spotify Song Transition</h1>
      <input
        type="text"
        placeholder="Search for a song"
        value={searchQuery}
        onChange={(e) => populateSearch(e.target.value)}
      />
      <ul>
        
        {searchResults.map((track) => (
          <div className="my-box">
          <li key={track.id}>
            {track.name} by {track.artists[0].name}
            <br></br>
            <button onClick={() => setPrimary(track)}>Set Primary</button><button onClick={() => setSecondary(track)}>Set Secondary</button>
          </li>
          </div>
        ))}
        
      </ul>
      <br></br>
      <h1>Primary Song: {primarySongInfo}</h1>
      <br></br>
      <h1>Secondary Song: {secondarySongInfo}</h1>
      <br></br>
      <h1>Ripple ID: {primarySongID + "|" + secondarySongID}</h1>
      <button onClick={async () => {
            var primaryDuration = 0;
            const data = await api.getTrack(primarySongID)
            primaryDuration = data.body['duration_ms'] as number
            const testRipple = new Ripple(primarySongURI, secondarySongURI, true, primaryDuration - 15000, 10000)
            testRipple.playTransition(api);
        }
        }>Test your New Ripple</button>
      <br></br>
        <button onClick={async () => {
            var primaryDuration = 0;
            const data = await api.getTrack(primarySongID)
            primaryDuration = data.body['duration_ms'] as number
            const testRipple = new Ripple(primarySongURI, secondarySongURI, true, primaryDuration - 15000, 10000)
            testRipple.playTransition(api);
            storeDataInRedis(primarySongID + "|" + secondarySongID, JSON.stringify(testRipple))
            handleLinkClick();
        }
        }>Make Waves</button>
    </div>
  );
}

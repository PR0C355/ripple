'use client'
import { get } from 'http';
import { getRedirect } from '../../utils/auth';
import './styles.css';

const Home = () => {
  const handleLogin = () => {
    window.location.href = getRedirect();
  };

  return (
    <div>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
};

export default Home;

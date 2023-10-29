import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyWebApiServer from 'spotify-web-api-node/src/server-methods.js';
import queryString from 'query-string';

(SpotifyWebApi as unknown as { _addMethods: (fncs: unknown) => void })._addMethods(SpotifyWebApiServer);

var spotifyApi = new SpotifyWebApi({
  clientId: 'a395c10158234bac8737b50c7e6f5b82',
  clientSecret: 'ce7ac23b9a9b40d1ab5812d32ce73d45',
  redirectUri: 'http://localhost:3000/auth-callback'
});

const scopes = [
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming'
];

export function handleCallback() {
  
  const queryParams = queryString.parse(queryString.extract(window.location.href))
  const code: string = queryParams.code as string;
  console.log("code:", queryParams);
  spotifyApi.authorizationCodeGrant(code).then(data => {
    const access_token = data.body['access_token'];
    const refresh_token = data.body['refresh_token'];
    const expires_in = data.body['expires_in'];
    
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    console.log('access_token:', access_token);
    console.log('refresh_token:', refresh_token);

    console.log(
      `Sucessfully retreived access token. Expires in ${expires_in} s.`
    );

    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);

    window.location.href = "/listen"
    
})
}


export const getRedirect = () => {
  return spotifyApi.createAuthorizeURL(scopes, "state");
}

export function getApi(): SpotifyWebApi {
  console.log(spotifyApi.getAccessToken());
  return spotifyApi;

}
import SpotifyWebApi from 'spotify-web-api-node';

export class Ripple {
    private currentSong: string;
    private nextSong: string;
    private currentSongStartPoint: number = 0;
    private nextSongEndPoint: number;
    private isFluid: boolean;

    
  
    constructor(initialSong: string, nextSong: string, isFluid: boolean, currentSongStartPoint: number, nextSongEndPoint: number) {
      this.currentSong = initialSong;
      this.nextSong = nextSong;
      this.isFluid = isFluid;
      this.currentSongStartPoint = currentSongStartPoint;
      this.nextSongEndPoint = nextSongEndPoint;
    }
    
    playTransition(api: SpotifyWebApi): void {
        console.log(`Playing transition between ${this.currentSong} and ${this.nextSong}`);
        api.addToQueue(this.currentSong).then(
            (data) => {
                api.addToQueue(this.nextSong).then(
                    (data) => {
                        api.skipToNext().then(
                            (data) => {
                                api.seek(this.currentSongStartPoint)
                            }
                        )
                    }
                )
            }
        )
    }
  
    playNextSong(api: SpotifyWebApi): void {
      console.log(`Playing next song: ${this.nextSong}`);
    }

    getCurrentSong(api: SpotifyWebApi) {
        return api.getTrack(getSpotifyIdFromUri(this.currentSong)).then(
            (data) => {
                return data.body;
            }
        )
    }

    getNextSong(api: SpotifyWebApi) {
        return api.getTrack(getSpotifyIdFromUri(this.nextSong)).then(
            (data) => {
                return data.body;
            }
        )
    }

    async getRippleInfo(api: SpotifyWebApi): Promise<object> {
        const currentSongInfo = await this.getCurrentSong(api);
        const nextSongInfo = await this.getNextSong(api);

        return {
            currentSong: currentSongInfo,
            nextSong: nextSongInfo,
        };
    }
  
}

function getSpotifyIdFromUri(spotifyUri: string) {
    const parts = spotifyUri.split(':');
    if (parts.length === 3 && parts[0] === 'spotify') {
      const id = parts[2];
      return id;
    } else {
      throw new Error('Invalid Spotify URI format');
    }
  }
  
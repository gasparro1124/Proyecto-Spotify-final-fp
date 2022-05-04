import { newTracks } from '../makers/trackEmpty';
import { Tracks } from '../models/tracksInterface';

export function SpotifyTrack_Tracksimplified(track:SpotifyApi.TrackObjectSimplified):Tracks{

  let song = newTracks()

  function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  }

  song.id = track.id
  song.artist = track.artists.map(x =>({
    id:x.id,
    name:x.name
  }))
  song.time = millisToMinutesAndSeconds(track.duration_ms),
  song.title = track.name

  return song
}

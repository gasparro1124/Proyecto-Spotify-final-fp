import { Search } from '../models/searchInterface';
import { newTracks } from './trackEmpty';
import { newAlbum } from './albumEmpty';
import { newPlaylist } from './playlistEmpty';
import { newArtist } from './artistEmpty';

export function newSearch():Search{
  return{
    tracks:[newTracks()],
    albums:[newAlbum()],
    playList:[newPlaylist()],
    artist:[newArtist()]
  }
}

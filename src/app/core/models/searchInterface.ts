import { Album } from './albumInterface';
import { Artist } from './artistaInterface';
import { Tracks } from './tracksInterface';
import { PlayList } from './playlistInterface';

export interface Search{
  albums:Album[],
  artist:Artist[],
  tracks:Tracks[]
  playList:PlayList[]
}

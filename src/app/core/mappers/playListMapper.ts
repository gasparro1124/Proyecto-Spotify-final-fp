import { PlayList } from '../models/PlayList';


export function SpotifyPlayList_PlayList(playlist:SpotifyApi.PlaylistObjectSimplified):PlayList{
  return{
    id:playlist.id,
    name:playlist.name,
    imagenUrl:playlist.images?.pop()?.url!
  }
}

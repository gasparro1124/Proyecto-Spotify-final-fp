import { newArtist } from '../makers/artistEmpty';
import { Artist } from '../models/artistaInterface';

export function spotifyArtist_Artista(spotifyArtista:SpotifyApi.ArtistObjectFull):Artist{
  return {
    id:spotifyArtista.id,
    imagenUrl:spotifyArtista.images.sort().pop()?.url!,
    name:spotifyArtista.name
  }
}


export function spotifyArtist_ArtistIndependent(artists:SpotifyApi.SingleArtistResponse):Artist{

  if(!artists){
    return newArtist()
  }else{
    return{
      id:artists.id,
      name:artists.name,
      imagenUrl:artists.images.pop()?.url!,
      songs:[]
    }
  }
}
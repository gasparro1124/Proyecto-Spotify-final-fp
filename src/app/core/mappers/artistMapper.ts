import { newArtist } from '../makers/artistEmpty';
import { Artist } from '../models/artistaInterface';

export function spotifyArtist_Artist(spotifyArtist:SpotifyApi.ArtistObjectFull):Artist{

  if(spotifyArtist.images.sort().pop()?.url!)
    return {
      id:spotifyArtist.id,
      imagenUrl:spotifyArtist.images.sort().pop()?.url!,
      name:spotifyArtist.name
    }
  else{
    return {
      id:spotifyArtist.id,
      imagenUrl:'../../../assets/images/iconos/artist.jpg',
      name:spotifyArtist.name
    }
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

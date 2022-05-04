import { Album } from "../models/albumInterface";

export function spotifyAlbums_Album(spotifyAlbums:SpotifyApi.AlbumObjectSimplified):Album{
  return{
    id:spotifyAlbums.id,
    imagenUrl:spotifyAlbums.images.shift()?.url!,
    name:spotifyAlbums.name
  }
}

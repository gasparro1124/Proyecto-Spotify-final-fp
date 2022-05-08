import { Album } from "../models/albumInterface";

export function spotifyAlbums_Album(spotifyAlbums:SpotifyApi.AlbumObjectSimplified):Album{
  if(spotifyAlbums.images.sort().pop()?.url!){
    return{
      id:spotifyAlbums.id,
      imagenUrl:spotifyAlbums.images.shift()?.url!,
      name:spotifyAlbums.name
    }
  }else{
    return{
      id:spotifyAlbums.id,
      imagenUrl:'../../../assets/images/iconos/albums.jpg',
      name:spotifyAlbums.name
    }
  }
}


export function spotifyAlbum_Album(spotifyAlbum:SpotifyApi.SingleAlbumResponse):Album{
  if(spotifyAlbum.images.sort().pop()?.url!){
    return{
      id:spotifyAlbum.id,
      imagenUrl:spotifyAlbum.images.shift()?.url!,
      name:spotifyAlbum.name
    }
  }else{
    return{
      id:spotifyAlbum.id,
      imagenUrl:'../../../assets/images/iconos/albums.jpg',
      name:spotifyAlbum.name
    }
  }
}

import { PlayList } from "../models/playlistInterface";


export function newPlaylist():PlayList{
  return{
    id: "",
    name: '',
    imagenUrl: '../../../assets/images/iconos/playList.jpg',
    songs:[]
  }
}

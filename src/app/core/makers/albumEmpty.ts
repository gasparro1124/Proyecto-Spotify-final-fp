import { Album } from "../models/albumInterface";

export function newAlbum():Album{
  return{
    id: "",
    name: '',
    imagenUrl: '',
  }
}

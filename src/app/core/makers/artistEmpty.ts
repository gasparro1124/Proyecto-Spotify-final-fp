import { Artist } from "../models/artistaInterface";

export function newArtist(): Artist{
  return{
    id:'',
    imagenUrl:'',
    name:'',
    songs:[]
  }
}

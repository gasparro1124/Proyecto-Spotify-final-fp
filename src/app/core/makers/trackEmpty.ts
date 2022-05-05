import { Tracks } from '../models/tracksInterface';

export function newTracks(): Tracks {
  return {
    id: '',
    album: {
      id: '',
      imagenUrl: '../../../assets/images/iconos/no-imagen.png',
      name: '',
    },
    artist: [],
    time: '',
    title: '',
    uri:''
  }
}

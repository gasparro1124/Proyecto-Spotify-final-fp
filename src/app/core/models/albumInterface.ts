import { Artist } from './artistaInterface';
export interface Album {
  id: string,
  name: string,
  imagenUrl: string
  artists?:Artist[]
}

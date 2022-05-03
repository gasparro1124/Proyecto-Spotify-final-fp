import { Tracks } from './tracksInterface';

export interface PlayList {
  id: string,
  name: string,
  imagenUrl: string,
  songs?:Tracks[]
}

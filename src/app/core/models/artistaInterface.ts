import { Tracks } from "./tracksInterface";

export interface Artist {
  id: string,
  name: string,
  imagenUrl: string,
  songs?:Tracks[]
}

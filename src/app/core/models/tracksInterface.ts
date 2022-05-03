export interface Tracks {
  id: string,
  title: string,
  artist: {
    id: string,
    name: string
  }[],
  album?: {
    id: string,
    name: string,
    imagenUrl: string
  },
  time: string
}

export const environment = {
  production: true
};

export const SpotifyConfiguration = {
  clientId: '628ee370ea4c43bc804dc3771cedb07d',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/login/',
  scopes: [
    "user-read-currently-playing", //musica actual.
    "user-follow-modify", //permite que el usuario modifique si sigue o no
    'user-read-playback-position',//permite modificar la posicion del playback
    "user-read-recently-played", // musica receinte
    "user-read-playback-state", // saber la musica reciente
    "user-top-read", // top artistas
    'user-follow-read',//acceso  a artistas que sigo
    'playlist-modify-public',//permite modificar, seguir playlist
    'user-library-modify',//permite modificar albunes, canciones guaradas
    "user-modify-playback-state", // top artistas
    "user-library-read", // leer libreria usurio
    "playlist-read-private", // ver playlist privadas
    "playlist-read-collaborative", // ver playlist compartidas
    "user-library-read",//Da acceso a la libreria del usuario
    "playlist-modify-private",//permite modificar playlist privadas
  ]
}

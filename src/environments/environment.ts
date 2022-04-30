// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

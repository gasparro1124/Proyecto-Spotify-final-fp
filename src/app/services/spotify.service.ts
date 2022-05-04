import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import { Router } from '@angular/router';

import spotify from 'spotify-web-api-js';

import { UserInterface } from '../core/models/userInterface';
import { PlayList } from '../core/models/playlistInterface';

import { SpotifyPlayList_PlayList } from '../core/mappers/playListMapper';
import { SpotifyUser_apiToUser } from '../core/mappers/userMapper';
import {  SpotifyTrack_Tracksimplified } from '../core/mappers/tracksMapper';
import { Tracks } from '../core/models/tracksInterface';
import { Artist } from '../core/models/artistaInterface';
import { spotifyArtist_Artista, spotifyArtist_ArtistIndependent } from '../core/mappers/artistMapper';
import { Album } from '../core/models/albumInterface';
import { spotifyAlbums_Album } from '../core/mappers/albumMapper';
import { newArtist } from '../core/makers/artistEmpty';
import { newAlbum } from '../core/makers/albumEmpty';
import { newTracks } from '../core/makers/trackEmpty';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi:spotify.SpotifyWebApiJs =new spotify();
  user!:UserInterface

  constructor(private router: Router) {
    this.spotifyApi = new spotify()
  }

  async appStart(){
    if(this.user || this.user !=null || this.user!=undefined){
      return true
    }

    const token = localStorage.getItem('token')

    if(!token){
      return false
    }

    try{
      this.saveAccessToken(token);
      await this.getUserInfo()
      return !!this.user

    }catch(error){
      return false
    }
  }

  async getUserInfo(){
    const userInfo = await this.spotifyApi.getMe()
    this.user = SpotifyUser_apiToUser(userInfo)
  }

  getToken():string{
    const authEndPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndPoint + clientId + redirectUrl + scopes+ responseType
  }

  obtenerTokenUrlCallback(){
    if(!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&')
    return params[0].split('=')[1]
  }

  saveAccessToken(token:string){
    this.spotifyApi.setAccessToken(token)
    localStorage.setItem('token',token)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }


  ///////////////////////////////// PLAYLIST //////////////////////////////////////////////

  async buscarPlayList(offset = 0, limit=50): Promise<PlayList[]>{
    const playLists = await this.spotifyApi.getUserPlaylists(this.user.id , {offset,limit});
    return playLists.items.map(SpotifyPlayList_PlayList)
  }

  async createPlayList(){
    await this.spotifyApi.createPlaylist(this.user.id,{"name":"Hola","description":"hello","public":true})
  }


  ///////////////////////////////////////////Mi musica//////////////////////////////////////////
  async getMyMusic():Promise<Tracks[]>{
    const music =  await this.spotifyApi.getMyRecentlyPlayedTracks({'limit':40})
    let yourSongs:Tracks[] = []
    music.items.map(x => {
      const song = SpotifyTrack_Tracksimplified(x.track)
      yourSongs.push(song)
    })
    return yourSongs
  }

  /////////////////////////////////////////Top Artistas /////////////////////////////////////////

  async buscarTopArtistas(limit = 10):Promise<Artist[]>{
    const artistas = await this.spotifyApi.getMyTopArtists({limit});
    return artistas.items.map(spotifyArtist_Artista)
  }

  async buscarArtistaIndependiente(id:string,offset = 0, limit=50):Promise<Artist>{
    const spotifyArtista = await this.spotifyApi.getArtist(id)

    if(!spotifyArtista){
      return newArtist()
    }else{

      const artist = spotifyArtist_ArtistIndependent(spotifyArtista)
      this.BuscarAlbumPorIdArtista(id)
      return artist
    }
  }

  async BuscarAlbumPorIdArtista(id:string,offset=0, limit=20):Promise<Album[]>{
    const albums = await this.spotifyApi.getArtistAlbums(id)

    if(!albums){
      return [newAlbum()]
    }else{
      return albums.items.map(x => spotifyAlbums_Album(x))
    }
  }

  async BuscarCancionesAlbums(album:Album):Promise<Tracks[]>{
    const canciones = await this.spotifyApi.getAlbumTracks(album.id)
    if(!canciones){
      return [newTracks()]
    }else{
      return canciones.items.map(x =>SpotifyTrack_Tracksimplified(x))
    }
  }

////////////////////////////////// Interact with Music ///////////////////////////////////
  // async obtenerMusicaActual():Promise<Tracks>{
  //   const musica = await this.spotifyApi.getMyCurrentPlayingTrack()
  //   return spotifyTrackparaMusica(musica.item)
  // }


  async ejecutarMusica(muscaId:string){
    await this.spotifyApi.queue(muscaId)
    await this.spotifyApi.skipToNext()
  }

  async anteriorCancion(){
    await this.spotifyApi.skipToPrevious()
  }

  async siguienteCancion(){
    await this.spotifyApi.skipToNext()
  }

  async pausarCancion(){
    await this.spotifyApi.pause()
  }

  async continuarCancion(){
    await this.spotifyApi.play()
  }

}

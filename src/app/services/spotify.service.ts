import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import { Router } from '@angular/router';

import spotify from 'spotify-web-api-js';

import { UserInterface } from '../core/models/userInterface';
import { PlayList } from '../core/models/playlistInterface';

import { SpotifyPlayList_PlayList } from '../core/mappers/playListMapper';
import { SpotifyUser_apiToUser } from '../core/mappers/userMapper';
import {  spotifyTrack_TracksFull, SpotifyTrack_Tracksimplified } from '../core/mappers/tracksMapper';
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

  TopArtist:Artist[] = []

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

  async searchPlayList(offset = 0, limit=50): Promise<PlayList[]>{
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

  // async SearchMySongs(offset = 0, limit=50):Promise<Tracks[]>{
  //   const canciones = await this.spotifyApi.getMySavedTracks({offset, limit});
  //   return canciones.items.map(x => spotifyTrack_TracksFull(x.track))
  // }

  /////////////////////////////////////////Top Artistas /////////////////////////////////////////

  // async searchTopArtist(limit = 20):Promise<Artist[]>{
  //   const artists = await this.spotifyApi.getMyTopArtists({limit});
  //   return artists.items.map(spotifyArtist_Artista)
  // }

  async getArtist():Promise<Artist[]>{
    const artist = await this.spotifyApi.searchArtists('a',{'limit':30})
    return artist.artists.items.map(spotifyArtist_Artista)
  }
  // async searchIndependientArtist(id:string,offset = 0, limit=50):Promise<Artist>{
  //   const spotifyArtist = await this.spotifyApi.getArtist(id)

  //   if(!spotifyArtist){
  //     return newArtist()
  //   }else{

  //     const artist = spotifyArtist_ArtistIndependent(spotifyArtist)
  //     this.searchAlbumByIdArtist(id)
  //     return artist
  //   }
  // }

  // async searchAlbumByIdArtist(id:string,offset=0, limit=20):Promise<Album[]>{
  //   const albums = await this.spotifyApi.getArtistAlbums(id)

  //   if(!albums){
  //     return [newAlbum()]
  //   }else{
  //     return albums.items.map(x => spotifyAlbums_Album(x))
  //   }
  // }

  // async searchAlbumSongs(album:Album):Promise<Tracks[]>{
  //   const songs = await this.spotifyApi.getAlbumTracks(album.id)
  //   if(!songs){
  //     return [newTracks()]
  //   }else{
  //     return songs.items.map(x =>SpotifyTrack_Tracksimplified(x))
  //   }
  // }

////////////////////////////////// Interact with Music ///////////////////////////////////
  async getCurrentTrack():Promise<Tracks>{
    const musica = await this.spotifyApi.getMyCurrentPlayingTrack()
    return spotifyTrack_TracksFull(musica.item as SpotifyApi.TrackObjectFull)
  }


  async lunchMusic(muscaUri:string){
    await this.spotifyApi.queue(muscaUri)
    await this.spotifyApi.skipToNext()
  }

  async prewiusSong(){
    await this.spotifyApi.skipToPrevious()
  }

  async nextSong(){
    await this.spotifyApi.skipToNext()
  }

  async stopSong(){
    await this.spotifyApi.pause()
  }

  async play(){
    await this.spotifyApi.play()
  }

  async volum(value:number){
    await this.spotifyApi.setVolume(value)
  }

  async repeat(state:SpotifyApi.PlaybackRepeatState){
    await this.spotifyApi.setRepeat(state)
  }

}

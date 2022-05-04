import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import { Router } from '@angular/router';

import spotify from 'spotify-web-api-js';

import { UserInterface } from '../core/models/userInterface';
import { PlayList } from '../core/models/PlayList';

import { SpotifyPlayList_PlayList } from '../core/mappers/playListMapper';
import { SpotifyUser_apiToUser } from '../core/mappers/userMapper';
import { SpotifyTrack_Track } from '../core/mappers/tracks';
import { Tracks } from '../core/models/tracksInterface';



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
    const music =  await this.spotifyApi.getMyRecentlyPlayedTracks()
    let yourSongs:Tracks[] = []
    music.items.map(x => {
      const song = SpotifyTrack_Track(x.track)
      yourSongs.push(song)
    })
    return yourSongs
  }
}

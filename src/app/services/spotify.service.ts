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
import { spotifyArtist_Artist, spotifyArtist_ArtistIndependent } from '../core/mappers/artistMapper';
import { Album } from '../core/models/albumInterface';
import { spotifyAlbums_Album, spotifyAlbum_Album } from '../core/mappers/albumMapper';
import { newArtist } from '../core/makers/artistEmpty';
import { newAlbum } from '../core/makers/albumEmpty';
import { newTracks } from '../core/makers/trackEmpty';
import { newPlaylist } from '../core/makers/playlistEmpty';
import { Search } from '../core/models/searchInterface';
import { newSearch } from '../core/makers/searchEmpty';



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

  async searchPlayLists(offset = 0, limit=50): Promise<PlayList[]>{
    const playLists = await this.spotifyApi.getUserPlaylists(this.user.id , {offset,limit});
    return playLists.items.map(SpotifyPlayList_PlayList)
  }

  async createPlayList(){
    await this.spotifyApi.createPlaylist(this.user.id,{"name":"Hola","description":"hello","public":true})
  }

  async SearchPlayList(id:string,offset = 0, limit=50): Promise<PlayList>{
    const spotyfyPlayList = await this.spotifyApi.getPlaylist(id , {offset,limit});

    if(!spotyfyPlayList){
      return newPlaylist();
    }else{
      const playlist = SpotifyPlayList_PlayList(spotyfyPlayList)

      const songsSpoty = await this.spotifyApi.getPlaylistTracks(id,{offset,limit})
      playlist.songs = songsSpoty.items.map(x => spotifyTrack_TracksFull(x.track as SpotifyApi.TrackObjectFull))
      return playlist
    }
  }

  async addPlaylist(playlist:PlayList):Promise<void>{
    await this.spotifyApi.followPlaylist(playlist.id)
  }

  async deletePlayList(playlist:PlayList):Promise<void>{
    await this.spotifyApi.unfollowPlaylist(playlist.id)
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

  async searchIndependientArtist(id:string,offset = 0, limit=50):Promise<Artist>{
    const spotifyArtist = await this.spotifyApi.getArtist(id)

    if(!spotifyArtist){
      return newArtist()
    }else{

      const artist = spotifyArtist_ArtistIndependent(spotifyArtist)
      this.searchAlbumByIdArtist(id)
      return artist
    }
  }

  //////////////////////////////////Albums////////////////////////////////////////////////

  async searchAlbumByIdArtist(id:string,offset=0, limit=20):Promise<Album[]>{
    const albums = await this.spotifyApi.getArtistAlbums(id)

    if(!albums){
      return [newAlbum()]
    }else{
      return albums.items.map(x => spotifyAlbums_Album(x))
    }
  }

  async searchAlbumSongs(album:Album):Promise<Tracks[]>{
    const songs = await this.spotifyApi.getAlbumTracks(album.id) //await this.spotifyApi.getAlbumTracks(album.id)
    if(!songs){
      return [newTracks()]
    }else{
      return songs.items.map(x =>SpotifyTrack_Tracksimplified(x))
    }
  }



/////////////////////////////////// Search //////////////////////////////////////////////////

  async getArtists(value:string):Promise<Artist[]>{
    const artist = await this.spotifyApi.searchArtists(value,{'limit':30})
    return artist.artists.items.map(spotifyArtist_Artist)
  }

  async getOneArtist(id:string):Promise<Artist>{
    const artist =  await this.spotifyApi.getArtist(id)
    if(!artist){
      return newArtist()
    }else{
     return spotifyArtist_ArtistIndependent(artist)
    }
  }

  async getOneAlbum(id:string):Promise<Album>{
    const album = await this.spotifyApi.getAlbum(id)
    if(!album){
      return newAlbum()
    }else{
      return spotifyAlbum_Album(album)
    }
  }

  async getSearch(value:string):Promise<Search>{
    const temSearch = await this.spotifyApi.search(value, ["album","artist","playlist","track"])
    if(!temSearch){
      return newSearch()
    }else{
      return{
        artist:temSearch.artists?.items.map(x => spotifyArtist_Artist(x)) as Artist[],
        albums: temSearch.albums?.items.map(x => spotifyAlbums_Album(x)) as Album[],
        tracks:temSearch.tracks?.items.map(x => spotifyTrack_TracksFull(x)) as Tracks[],
        playList:temSearch.playlists?.items.map(x=> SpotifyPlayList_PlayList(x)) as PlayList[]
      }
    }

  }

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

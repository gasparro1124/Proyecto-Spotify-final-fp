import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { newTracks } from '../core/makers/trackEmpty';
import { Tracks } from '../core/models/tracksInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  currentTrack = new BehaviorSubject<Tracks>(newTracks())
  timerId:any = null

  constructor(private spotifyService:SpotifyService) {
    this.getCurrentsong()
  }

  async getCurrentsong(){
    clearTimeout(this.timerId)

    const musica = await this.spotifyService.getCurrentTrack()
    this.setcurrentMusic(musica)

    this.timerId = setInterval(async () =>{
      await this.getCurrentsong()
    },1000)
  }

  setcurrentMusic(musica:Tracks){
    this.currentTrack.next(musica)
  }

  async prewiusSong(){
    await this.spotifyService.prewiusSong()
  }

  async nextSong(){
    await this.spotifyService.nextSong()
  }

  async pauseSong(){
    await this.spotifyService.stopSong()
  }

  async playSong(){
    await this.spotifyService.play()
  }

  async changeVolum(value:number){
    await this.spotifyService.volum(value)
  }

  async repeat(state:SpotifyApi.PlaybackRepeatState){
    await this.spotifyService.repeat(state)
  }
}

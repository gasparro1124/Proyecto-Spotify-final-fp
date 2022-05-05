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

    const musica = await this.spotifyService.obtenerMusicaActual()
    this.setcurrentMusic(musica)

    this.timerId = setInterval(async () =>{
      await this.getCurrentsong()
    },3000)
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

  async pausarCancion(){
    await this.spotifyService.stopSong()
  }

  async continuarCancion(){
    await this.spotifyService.play()
  }
}

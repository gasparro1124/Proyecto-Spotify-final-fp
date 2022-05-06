import { Component, OnDestroy, OnInit } from '@angular/core';
import { newTracks } from '../../core/makers/trackEmpty';
import { Tracks } from '../../core/models/tracksInterface';
import { Subscription } from 'rxjs';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss']
})
export class BottomPanelComponent implements OnInit, OnDestroy {

  currentVolum:number = 50
  song: Tracks = newTracks()
  subs: Subscription[] = []
  state:SpotifyApi.PlaybackRepeatState = 'off'

  constructor(private trackService:TrackService ) { }

  ngOnInit(): void {
    this.getCurrentSong()
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => e.unsubscribe())
  }

  getCurrentSong(){
    const sub = this.trackService.currentTrack.subscribe(musica => {
      this.song = musica
    })
    this.subs.push(sub)
  }

  async prewiusSong(){
    await this.trackService.prewiusSong()
  }

  async nextSong(){
    await this.trackService.nextSong()
  }

  async pauseCancion(){
    await this.trackService.pauseSong()
  }

  async playSong(){
    await this.trackService.playSong()
  }

  async getVolum(value:string){
    this.currentVolum = parseInt(value)
    await this.trackService.changeVolum(this.currentVolum)
  }

  setStatus(){
    if(this.state == 'off'){
      this.state = 'track'
    }else{
      this.state = 'off'
    }
  }

  async setRepeat(){
    this.setStatus()
    await this.trackService.repeat(this.state)
  }

  statusRepeat(){
    if(this.state == 'off')
      return false
    else
      return true
  }

}

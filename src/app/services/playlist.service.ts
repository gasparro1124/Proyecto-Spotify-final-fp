import { Injectable } from '@angular/core';
import { PlayList } from '../core/models/playlistInterface';
import { newPlaylist } from '../core/makers/playlistEmpty';
import { SpotifyService } from './spotify.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  allPlaylist:PlayList[] = ([newPlaylist()])
  playListvisibility:Subject<PlayList[]> = new Subject<PlayList[]>()

  constructor(private spotifyService:SpotifyService) {
    this.playListvisibility.subscribe((value) =>{
      this.allPlaylist = value
    })
    this.searchPlaylist()
  }

  async addPlaylist(playlist:PlayList){
    await this.spotifyService.addPlaylist(playlist)
    this.playListvisibility.next(await this.spotifyService.searchPlayLists())
  }

  async searchPlaylist(){
    this.playListvisibility.next(await this.spotifyService.searchPlayLists())
  }

  async deletePlaylist(playlist:PlayList){
    await this.spotifyService.deletePlayList(playlist)
    this.playListvisibility.next(await this.spotifyService.searchPlayLists())
  }
}

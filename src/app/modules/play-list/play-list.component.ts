import { Component, OnInit } from '@angular/core';
import { Tracks } from '../../core/models/tracksInterface';
import { newTracks } from '../../core/makers/trackEmpty';
import { SpotifyService } from '../../services/spotify.service';
import { TrackService } from '../../services/track.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFromPlaylistComponent } from '../../shared/delete-from-playlist/delete-from-playlist.component';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  tracks:Tracks[] =[]
  curretTrack:Tracks = newTracks()

  title:string = ''
  img:string = ''

  constructor( private activeRoute:ActivatedRoute,
               private spotifyService:SpotifyService,
               private trackservice:TrackService,
               private addToPlaylistDialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentMusic()
    this.getTracks()
  }

  async getTracks(){
    await this.activeRoute.paramMap
    .subscribe(async (params) => {
      const id = params.get('id')
      await this.getPlayList(id as string)
    })
  }

  async getPlayList(id:string){
    await this.getDatesFromPlayList(id)
  }

  async getDatesFromPlayList(playlist:string){
    const playlistTracks = await this.spotifyService.SearchPlayList(playlist)
    this.defineDatesPages(playlistTracks.name,playlistTracks.songs as Tracks[], playlistTracks.imagenUrl)
    this.title = 'Musica PlayList ' + playlistTracks.name
  }


  defineDatesPages(title:string,songs:Tracks[], img:string){
    this.title = title,
    this.tracks = songs

    if(!img)
      this.img = '../../../assets/images/iconos/playList.jpg'
    else
      this.img =img
  }

  getCurrentMusic(){
    this.trackservice.currentTrack.subscribe(track =>{
      this.curretTrack = track
    })
  }

  async launchMusic(track:Tracks){
    await this.spotifyService.lunchMusic(track.uri)
  }

  openDialog() {
    this.addToPlaylistDialog.open(DeleteFromPlaylistComponent, {
    width:'30%'
    });
  }
}

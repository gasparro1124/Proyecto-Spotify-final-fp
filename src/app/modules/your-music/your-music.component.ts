import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Tracks } from '../../core/models/tracksInterface';
import { AddToPlaylistComponent } from '../../shared/add-to-playlist/add-to-playlist.component';
import { MatDialog } from '@angular/material/dialog';
import { TrackService } from '../../services/track.service';
import { newTracks } from '../../core/makers/trackEmpty';

@Component({
  selector: 'app-your-music',
  templateUrl: './your-music.component.html',
  styleUrls: ['./your-music.component.scss']
})
export class YourMusicComponent implements OnInit {

  songs:Tracks[] = []
  currentSong:Tracks = newTracks()

  constructor(private spotifyService:SpotifyService,private TrackService:TrackService,private addToPlaylistDialog: MatDialog) { }

  ngOnInit(): void {
    this.getMyMusic()
    this.getCurrentMusic()
  }

  openDialog() {
    this.addToPlaylistDialog.open(AddToPlaylistComponent, {
    width:'30%'
    });
  }

  async getMyMusic(){
    const tempSong = await this.spotifyService.getMyMusic()
    this.songs = tempSong
  }

  async launchMusic(track:Tracks){
    await this.spotifyService.lunchMusic(track.uri)
  }

  getCurrentMusic(){
    this.TrackService.currentTrack.subscribe(track =>{
      this.currentSong = track
    })
  }


}

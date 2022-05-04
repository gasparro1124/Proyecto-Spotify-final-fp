import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Tracks } from '../../core/models/tracksInterface';

@Component({
  selector: 'app-your-music',
  templateUrl: './your-music.component.html',
  styleUrls: ['./your-music.component.scss']
})
export class YourMusicComponent implements OnInit {

  songs:Tracks[] = []

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit(): void {
    this.getMyMusic()
  }

  async getMyMusic(){
    const tempSong = await this.spotifyService.getMyMusic()
    this.songs = tempSong
    console.log(this.songs)
  }

}

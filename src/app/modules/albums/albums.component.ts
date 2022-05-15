import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { newAlbum } from 'src/app/core/makers/albumEmpty';
import { newTracks } from 'src/app/core/makers/trackEmpty';
import { Album } from 'src/app/core/models/albumInterface';
import { Tracks } from 'src/app/core/models/tracksInterface';
import { SpotifyService } from 'src/app/services/spotify.service';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  tracks:Tracks[] =[]
  curretTrack:Tracks = newTracks()

  album:Album = newAlbum()
  albumId:string = ''
  title:string = ''
  img:string = ''

  constructor(private Router:Router,
              private activeRoute:ActivatedRoute,
              private spotifyService:SpotifyService,
              private trackservice:TrackService)
              { }

  ngOnInit(): void {
    this.getTracks()
    this.getCurrentMusic()
  }

  async getTracks(){
    await this.activeRoute.paramMap
    .subscribe(async (params) => {
      this.albumId= params.get('id') as string
      await this.getAlbumTracks()
    })
  }

  async getAlbumTracks(){
    const album = await this.spotifyService.getOneAlbum(this.albumId)
    const tracksAlbum = await this.spotifyService.searchAlbumSongs(album)
    this.tracks = tracksAlbum
    console.log(this.tracks)
    await this.getDatesFromAlbum()
  }

  async getDatesFromAlbum(){
    const album = await this.spotifyService.getOneAlbum(this.albumId)
    this.title = album.name
    this.img = album.imagenUrl
  }

  backToAlbumArtist(){
    this.Router.navigate([`home/search`])
  }

  getCurrentMusic(){
    this.trackservice.currentTrack.subscribe(track =>{
      this.curretTrack = track
    })
  }

  async launchMusic(track:Tracks){
    await this.spotifyService.lunchMusic(track.uri)
  }
}

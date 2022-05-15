import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { newTracks } from 'src/app/core/makers/trackEmpty';
import { SpotifyService } from 'src/app/services/spotify.service';
import { TrackService } from 'src/app/services/track.service';
import { Tracks } from '../../core/models/tracksInterface';
import { Album } from '../../core/models/albumInterface';
import { newAlbum } from '../../core/makers/albumEmpty';

@Component({
  selector: 'app-artist-song',
  templateUrl: './artist-song.component.html',
  styleUrls: ['./artist-song.component.scss']
})
export class ArtistSongComponent implements OnInit {

  tracks:Tracks[] =[]
  curretTrack:Tracks = newTracks()

  album:Album = newAlbum()
  albumId:string = ''
  artistId:string = ''
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
      this.artistId = params.get('artist') as string
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
    this.Router.navigate([`home/top-artists/${this.artistId}`])
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

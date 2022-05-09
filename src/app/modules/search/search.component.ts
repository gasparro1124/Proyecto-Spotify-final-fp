import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../../core/models/artistaInterface';
import { SpotifyService } from '../../services/spotify.service';
import { Tracks } from '../../core/models/tracksInterface';
import { newTracks } from '../../core/makers/trackEmpty';
import { Album } from '../../core/models/albumInterface';
import { newAlbum } from '../../core/makers/albumEmpty';
import { PlayList } from '../../core/models/playlistInterface';
import { newPlaylist } from '../../core/makers/playlistEmpty';
import { newArtist } from 'src/app/core/makers/artistEmpty';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayListComponent } from '../../shared/add-play-list/add-play-list.component';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  value:string = ''
  curretTrack:Tracks = newTracks()

  tracks:Tracks[] = [newTracks()]
  albums:Album[] = [newAlbum()]
  playlists:PlayList[] = [newPlaylist()]
  artists:Artist[] = [newArtist()]

  constructor( private spotifyService: SpotifyService,private trackService:TrackService,private addToPlaylistDialog: MatDialog,private Router:Router,) { }

  ngOnInit(): void {
    this.initialsearch()
  }

  async initialsearch(){
    const tempSearch = await this.spotifyService.getSearch('latin')
    this.tracks = tempSearch.tracks
    this.albums = tempSearch.albums
    this.playlists = tempSearch.playList
    this.artists = tempSearch.artist
    console.log(this.albums)
  }

  async search(){
    if(!this.value){
      alert('no has buscado nada')
    }else{
      const tempSearch = await this.spotifyService.getSearch(this.value)
      this.tracks = tempSearch.tracks
      this.albums = tempSearch.albums
      this.playlists = tempSearch.playList
      this.artists = tempSearch.artist
    }
  }

  async launchMusic(track:Tracks){
    await this.spotifyService.lunchMusic(track.uri)
  }

  AlbumClick(id:string){
    this.Router.navigateByUrl(`home/album/${id}`)
    console.log('hey')
  }

  ArtistClick(id:string){
    this.Router.navigateByUrl(`home/top-artists/${id}`)
  }

  playListClick(id:string){
    this.Router.navigateByUrl(`home/list/playList/${id}`)
  }


  getCurrentMusic(){
    this.trackService.currentTrack.subscribe(track =>{
      this.curretTrack = track
    })
  }

  openDialog() {
    this.addToPlaylistDialog.open(AddPlayListComponent, {
    width:'30%'
    });
  }
}

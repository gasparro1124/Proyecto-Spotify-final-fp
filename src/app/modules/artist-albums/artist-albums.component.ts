import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Album } from '../../core/models/albumInterface';
import { Artist } from '../../core/models/artistaInterface';
import { newArtist } from '../../core/makers/artistEmpty';

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.scss']
})
export class ArtistAlbumsComponent implements OnInit {

  albums:Album[] =[]
  artist:Artist = newArtist()

  title:string = ''
  img:string = ''


  constructor(private Router:Router,
              private activeRoute:ActivatedRoute,
              private spotifyService:SpotifyService,)
              { }

  ngOnInit(): void {
    this.getAlbums()
  }

  async getAlbums(){
    await this.activeRoute.paramMap
    .subscribe(async (params) => {
      const id = params.get('id')
      const tempArtist = await this.spotifyService.getOneArtist(id as string)
      this.artist = tempArtist
      await this.getDatesFromArtist(this.artist)
    })
  }
  async getDatesFromArtist(artist:Artist){
    const artistalbums = await this.spotifyService.searchAlbumByIdArtist(artist.id)
    this.albums = artistalbums
    this.title = artist.name
    this.img = artist.imagenUrl
  }

  backToArtists(){
    this.Router.navigate(['home/top-artists'])
  }

  AlbumClick(id:string){
    this.Router.navigateByUrl(`home/top-artists/${this.artist.id}/${id}`)
  }

}

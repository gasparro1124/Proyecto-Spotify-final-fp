import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../../core/models/artistaInterface';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {
  topArtist: Artist[] = []
  artistSearch:string = ''

  constructor(private spotifyService:SpotifyService,private router:Router) { }

  ngOnInit(): void {
    this.getArtist()
  }

  async getArtist(){
    const tempoArtist = await this.spotifyService.getArtists('a')
    this.topArtist = tempoArtist
  }

  ArtistClick(id:string){
    this.artistSearch = id
    this.router.navigateByUrl(`home/top-artists/${id}`)
  }

  async search(){
    if(!this.artistSearch){
      alert('no has buscado nada')
    }else{
      const tempArtist = await this.spotifyService.getArtists(this.artistSearch)
      this.topArtist = tempArtist
    }
  }

}

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Artist } from '../../core/models/artistaInterface';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit, OnDestroy {
  topArtist: Artist[] = []

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit(): void {
    this.getArtist()
  }

  ngOnDestroy(): void {
  }

  async getArtist(){
    const tempoArtist = await this.spotifyService.getArtist()
    this.topArtist = tempoArtist
  }
}

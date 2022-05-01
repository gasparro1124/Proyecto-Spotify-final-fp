import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit(): void {
    this.getToken()
  }

  getToken(){
    const token = this.spotifyService.obtenerTokenUrlCallback()
    if(!!token){
      this.spotifyService.saveAccessToken(token)
    }
  }

  loginFunction(){
    window.location.href = this.spotifyService.getToken()
  }

}

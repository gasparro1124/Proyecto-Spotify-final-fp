import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService:SpotifyService, private router:Router) { }

  ngOnInit(): void {
    this.getToken()
  }

  getToken(){
    const token = this.spotifyService.obtenerTokenUrlCallback()
    if(!!token){
      this.spotifyService.saveAccessToken(token);
      this.router.navigate(['/home'])
    }else {
      this.router.navigate(['/login'])
    }
  }

  loginFunction(){
    window.location.href = this.spotifyService.getToken()
  }

}

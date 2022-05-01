import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyGuard implements CanLoad {

  constructor(private router: Router, private spotifyService: SpotifyService){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token')

    if(!token){
      return this.noToken()
    }

    return new Promise( async (res)=>{
      const user = await this.spotifyService.appStart()
      if(user)
        res(true)
      else
        res(this.noToken())
    })
  }

  noToken(){
    localStorage.clear();
    this.router.navigate(['/login'])
    return false
  }
}

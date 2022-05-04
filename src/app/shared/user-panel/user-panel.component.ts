import { Component, OnInit } from '@angular/core';
import { newUser } from 'src/app/core/makers/userEmpty';
import { UserInterface } from 'src/app/core/models/userInterface';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  public user: UserInterface = newUser()

  constructor(private  spotifyService:SpotifyService) { }

  ngOnInit(): void {
    this.user = this.spotifyService.user
  }


  logout(){
    this.spotifyService.logout()
  }
}

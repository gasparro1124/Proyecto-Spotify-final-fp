import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlayList } from 'src/app/core/models/playlistInterface';
import { SpotifyService } from '../../services/spotify.service';
import { PlaylistService } from '../../services/playlist.service';


@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  selected ="Home"

  playLists: PlayList[] = [];

  homeIcon ='uil uil-estate'
  seacrhIcon = "uil uil-search-alt"
  artistIcon = "uil uil-boombox"
  playlisticon  = "uil uil-list-ul"

  constructor(private router:Router,private SpotifyService:SpotifyService, private playlistService:PlaylistService) { }

  ngOnInit(): void {
    this.getAllPlayList()
  }

  async getAllPlayList(){
    this.playlistService.playListvisibility.subscribe((value)=>{
      this.playLists = value
    })
  }

  homeClick(button:string){
    this.selected  = button
    this.router.navigate(['home/your-music'])
  }

  artistClick(button:string){
    this.selected  = button
    this.router.navigate(['home/top-artists'])
  }

  playListClick(id:string){
    this.selected = id
    this.router.navigateByUrl(`home/list/playList/${id}`)
  }

  searchClick(button:string){
    this.selected  = button
    this.router.navigate(['home/search'])
  }
}

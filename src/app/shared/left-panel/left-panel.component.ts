import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlayList } from 'src/app/core/models/playlistInterface';
import { SpotifyService } from '../../services/spotify.service';
import { AddPlayListComponent } from '../add-play-list/add-play-list.component';

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

  constructor(private router:Router,private SpotifyService:SpotifyService,private addPlayListDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPlayList()
  }

  async getAllPlayList(){
    this.playLists = await this.SpotifyService.searchPlayLists()

    // await this.SpotifyService.createPlayList()
    // this.playLists = await this.SpotifyService.buscarPlayList()
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

  buttonClick(button:string){
    this.selected  = button
    this.router.navigate(['home'])
  }

  openDialog() {
    this.addPlayListDialog.open(AddPlayListComponent, {
    width:'30%'
    });
  }




}

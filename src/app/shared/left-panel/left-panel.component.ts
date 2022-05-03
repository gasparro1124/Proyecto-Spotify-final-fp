import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayList } from 'src/app/core/models/PlayList';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  menuSelecionado ="Home"

  playLists: PlayList[] = [];

  homeIcon ='uil uil-estate'
  seacrhIcon = "uil uil-search-alt"
  artistIcon = "uil uil-boombox"
  playlisticon  = "uil uil-list-ul"

  constructor(private SpotifyService:SpotifyService,private addPlayList: MatDialog) { }

  ngOnInit(): void {
    this.getAllPlayList()
  }

  async getAllPlayList(){
    this.playLists = await this.SpotifyService.buscarPlayList()
  }

  botonClick(boton:string){
    this.menuSelecionado  = boton
  }


}

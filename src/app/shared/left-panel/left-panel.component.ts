import { Component, OnInit } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  menuSelecionado ="Home"

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
    this.playLists = await this.SpotifyService.buscarPlayList()

    // await this.SpotifyService.createPlayList()
    // this.playLists = await this.SpotifyService.buscarPlayList()
  }

  homeClick(boton:string){
    this.menuSelecionado  = boton
    this.router.navigate(['home/your-music'])
  }

  botonClick(boton:string){
    this.menuSelecionado  = boton
    this.router.navigate(['home'])
  }

  openDialog() {
    this.addPlayListDialog.open(AddPlayListComponent, {
    width:'30%'
    });
  }




}

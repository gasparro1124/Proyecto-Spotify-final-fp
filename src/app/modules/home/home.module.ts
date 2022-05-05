import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { LeftPanelComponent } from 'src/app/shared/left-panel/left-panel.component';
import { BottomPanelComponent } from 'src/app/shared/bottom-panel/bottom-panel.component';

import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';
import { MenuBotonComponent } from 'src/app/shared/menu-button/menu-boton.component';
import { AddPlayListComponent } from '../../shared/add-play-list/add-play-list.component';
import { UserPanelComponent } from 'src/app/shared/user-panel/user-panel.component';
import { YourMusicComponent } from '../your-music/your-music.component';
import {MatCardModule} from '@angular/material/card';
import { AddToPlaylistComponent } from '../../shared/add-to-playlist/add-to-playlist.component';






@NgModule({
  declarations: [
    HomeComponent,
    LeftPanelComponent,
    BottomPanelComponent,
    MenuBotonComponent,
    AddPlayListComponent,
    AddToPlaylistComponent,
    UserPanelComponent,
    YourMusicComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    MatCardModule
  ]
})
export class HomeModule { }

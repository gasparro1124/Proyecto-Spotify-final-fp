import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { LeftPanelComponent } from 'src/app/shared/left-panel/left-panel.component';
import { BottomPanelComponent } from 'src/app/shared/bottom-panel/bottom-panel.component';

import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';
import { MenuBotonComponent } from 'src/app/shared/menu-button/menu-boton.component';
import { UserPanelComponent } from 'src/app/shared/user-panel/user-panel.component';
import { YourMusicComponent } from '../your-music/your-music.component';
import {MatCardModule} from '@angular/material/card';
import { TopArtistsComponent } from '../top-artists/top-artists.component';
import { FormsModule } from '@angular/forms';
import { PlayListComponent } from '../play-list/play-list.component';
import { ArtistSongComponent } from '../artist-song/artist-song.component';
import { ArtistAlbumsComponent } from '../artist-albums/artist-albums.component';
import { SearchComponent } from '../search/search.component';
import { AlbumsComponent } from '../albums/albums.component';
import { AddPlayListComponent } from 'src/app/shared/add-play-list/add-play-list.component';






@NgModule({
  declarations: [
    HomeComponent,
    LeftPanelComponent,
    BottomPanelComponent,
    MenuBotonComponent,
    AddPlayListComponent,
    UserPanelComponent,
    YourMusicComponent,
    TopArtistsComponent,
    PlayListComponent,
    ArtistSongComponent,
    ArtistAlbumsComponent,
    SearchComponent,
    AlbumsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    MatCardModule,
    FormsModule
  ]
})
export class HomeModule { }

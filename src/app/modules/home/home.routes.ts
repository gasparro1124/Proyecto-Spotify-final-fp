import { Routes } from '@angular/router'
import { HomeComponent } from './home.component';
import { YourMusicComponent } from '../your-music/your-music.component';
import { TopArtistsComponent } from '../top-artists/top-artists.component';
import { PlayListComponent } from '../play-list/play-list.component';
import { ArtistSongComponent } from '../artist-song/artist-song.component';
import { ArtistAlbumsComponent } from '../artist-albums/artist-albums.component';
import { SearchComponent } from '../search/search.component';
import { AlbumsComponent } from '../albums/albums.component';


export const HomeRoutes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'your-music',
        component:YourMusicComponent
      },
      {
        path:'top-artists',
        component:TopArtistsComponent
      },
      {
        path:'list/playList/:id',
        component:PlayListComponent
      },
      {
        path:'top-artists/:id',
        component:ArtistAlbumsComponent
      },
      {
        path:'top-artists/:artist/:id',
        component:ArtistSongComponent
      },
      {
        path:'search',
        component:SearchComponent
      },
      {
        path:'album/:id',
        component:AlbumsComponent
      }

    ]
  }
]

import { Routes } from '@angular/router'
import { HomeComponent } from './home.component';
import { YourMusicComponent } from '../your-music/your-music.component';
import { TopArtistsComponent } from '../top-artists/top-artists.component';
import { PlayListComponent } from '../play-list/play-list.component';
import { ArtistSongComponent } from '../artist-song/artist-song.component';


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
        component:ArtistSongComponent
      }

    ]
  }
]

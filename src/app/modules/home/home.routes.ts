import { Routes } from '@angular/router'
import { HomeComponent } from './home.component';
import { YourMusicComponent } from '../your-music/your-music.component';


export const HomeRoutes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'your-music',
        component:YourMusicComponent
      }
    ]
  }
]

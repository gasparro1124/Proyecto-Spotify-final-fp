import { Routes } from "@angular/router";
import { SpotifyGuard } from './core/guards/spotify.guard';


export const appRoutes:Routes=[
  {
    path:'',
    redirectTo:'home/your-music',
    pathMatch:'full'
  },
  {
    path:'login',
    loadChildren: () => import('./modules/login/login.module').then(x => x.LoginModule),
  },
  {
    path:'home',
    loadChildren: () => import('./modules/home/home.module').then(x => x.HomeModule),
    canLoad:[SpotifyGuard]
  },
]

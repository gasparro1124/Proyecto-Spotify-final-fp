import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { LeftPanelComponent } from 'src/app/shared/left-panel/left-panel.component';
import { BottomPanelComponent } from 'src/app/shared/bottom-panel/bottom-panel.component';

import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';
import { MenuBotonComponent } from 'src/app/shared/menu-boton/menu-boton.component';
import { AddPlayListComponent } from '../../shared/add-play-list/add-play-list.component';






@NgModule({
  declarations: [
    HomeComponent,
    LeftPanelComponent,
    BottomPanelComponent,
    MenuBotonComponent,
    AddPlayListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
  ]
})
export class HomeModule { }

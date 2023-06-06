import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path:'',component: AuthComponent},
  {path:'home',component: HomeComponent},
  {path:'game/:groupName',component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

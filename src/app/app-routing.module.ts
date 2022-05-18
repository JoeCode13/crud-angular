import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGamesComponent } from './components/form-games/form-games.component';
import { ListGamesComponent } from './components/list-games/list-games.component';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' }, // Si visitas la ruta / , redirecciona a /games
  { path: 'games', component: ListGamesComponent },
  { path: 'games/add', component: FormGamesComponent },
  { path: 'games/edit/:id', component: FormGamesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

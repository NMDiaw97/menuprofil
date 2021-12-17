import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMenuComponent } from './menu/menu/create-menu/create-menu.component';
import { MenuComponent } from './menu/menu/menu.component';
import { UpdateMenuComponent } from './menu/menu/update-menu/update-menu.component';
import { ProfilComponent } from './profil/profil/profil.component';

const routes: Routes = [
  {path:"", component: ProfilComponent},
  {path:"create-menu", component: CreateMenuComponent},
  {path:"menu/:id", component: MenuComponent},
  {path:"profils", component: ProfilComponent},
  {path:"update/:id", component: UpdateMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

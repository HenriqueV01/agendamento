import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContatoComponent } from './pages/contato/contato.component';

export const routes: Routes = [

  {path:'', component: HomeComponent },
  {path:'inicio', component: HomeComponent },
  {path:'contato/:id', component: ContatoComponent }

];

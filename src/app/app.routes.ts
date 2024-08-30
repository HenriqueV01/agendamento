import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './pages/login/auth.guard';

export const routes: Routes = [



  { path: 'login', component: LoginComponent },
  { path:'', component: HomeComponent, canActivate: [AuthGuard]},
  { path:'inicio', component: HomeComponent, canActivate: [AuthGuard] },
  { path:'contato', component: ContatoComponent, canActivate: [AuthGuard] },
  { path:'contato/:id', component: ContatoComponent, canActivate: [AuthGuard] }

];

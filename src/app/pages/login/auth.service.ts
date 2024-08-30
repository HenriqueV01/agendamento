import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../shared/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  constructor(private router: Router) { }

  fazerLogin(login: Login){
    if(login.nome === 'usuario@email.com' && login.senha ==='123456'){
      this.usuarioAutenticado = true;
      this.router.navigate(['/']);
    }else{
      this.usuarioAutenticado = false;
    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}

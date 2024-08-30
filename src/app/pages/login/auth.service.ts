import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../../shared/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = true;

  constructor(private router: Router) { }

  fazerLogin(login: ILogin){
    console.log(login);

    if(login.nome === 'usuario@email.com' && login.senha ==='123456'){
      this.usuarioAutenticado = true;
      this.router.navigate(['/']);
    }else{
      this.usuarioAutenticado = true;
      alert("Login Inválido!");
    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}

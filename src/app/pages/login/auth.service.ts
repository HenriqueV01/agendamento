import { EventEmitter, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../../shared/models/login';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false; //mudar para false

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "auth/login";

  private token!: string;

  constructor(private router: Router) { }

  fazerLogin(login: ILogin){
    console.log("login "+login.login + " - " + login.password);
    localStorage.clear();
    return this.http.post<string>(this.apiUrl, login).subscribe({
      next: (res: any) =>{
       // debugger;
       console.log("res->"+res)
        if(res){
          this.token = res;
          this.usuarioAutenticado = true;
          localStorage.setItem('loginToken', res.token);
          this.router.navigate(['/']);
        }else{
          this.usuarioAutenticado = false;
          alert("Login Inválido!");
        }
      }
    });

    // if(login.nome === 'usuario@email.com' && login.senha ==='123456'){
    //   this.usuarioAutenticado = true;
    //   this.router.navigate(['/']);
    // }else{
    //   this.usuarioAutenticado = false;
    //   alert("Login Inválido!");
    // }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}

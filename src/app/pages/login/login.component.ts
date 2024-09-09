import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ILogin } from '../../shared/models/login';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public formBuilder = inject(FormBuilder);

  constructor(private authService: AuthService){

  }

  public formLogin: FormGroup = this.formBuilder.group({
    nome:[""],
    senha:[""]
  })

  fazerLogin() {
    console.log("fazerLogin");
    const login: ILogin = {
      login: this.formLogin.value.nome,
      password: this.formLogin.value.senha,

    }
    this.authService.fazerLogin(login);
  }

}

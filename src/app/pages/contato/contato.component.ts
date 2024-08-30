import { ContatoService } from './../../services/contato.service';
import { Component, inject, Input, OnInit, Pipe } from '@angular/core';

import { MatInputModule}  from '@angular/material/input';
import { MatFormFieldModule}  from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IContato } from '../../shared/models/contato';
import { map } from 'rxjs';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';


@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, CampoControlErroComponent],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss'
})
export class ContatoComponent implements OnInit{

  @Input('id') idContato!: number;
  private contatoService= inject(ContatoService);
  public formBuilder = inject(FormBuilder);

  public formContato: FormGroup = this.formBuilder.group({
    id:[0],
    nome:["", Validators.required],
    email:["", Validators.required, Validators.email],
    celular:["", Validators.required],
    telefone:["", Validators.required],
    favorito:[false],
    ativo:[false],
    data_hora:[""],

  })

  constructor(private router: Router){}

  maskJs(value: string, pattern: string) {
    let i = 0;
    const v = value.toString();
    return pattern.replace(/#/g, () => v[i++] || '');
 };

  ngOnInit(): void {
    if(this.idContato != null){
      this.contatoService.buscar(this.idContato).subscribe({
        next: (contato) => {
          this.formContato.patchValue({
            id: contato.id,
            nome: contato.nome,
            email: contato.email,
            celular: this.maskJs(contato.celular, '(##) #####-####'),
            telefone: this.maskJs(contato.telefone, '(##) #####-####'),
            favorito: contato.favorito,
            ativo: contato.ativo,
            data_hora: contato.data_hora,

          })
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }

  }

  guardar(){
    const contato: IContato = {
      id: this.idContato,
      nome: this.formContato.value.nome,
      email: this.formContato.value.email,
      celular: this.formContato.value.celular,
      telefone: this.formContato.value.telefone,
      favorito: this.formContato.value.favorito,
      ativo: this.formContato.value.ativo,
      data_hora: this.formContato.value.data_hora
    }

    if (this.idContato === undefined) {

      this.contatoService.criar(contato).subscribe({
        next: (res) => {
          if (res) {

            console.log(res);

            this.router.navigate(["/"]);
          }
        },
        error: (err) => {
          console.error('Erro ao criar contato', err);
          alert('Ocorreu um erro ao criar o contato. Tente novamente.');
        }
      });
    }else{
      console.log("update");

      // this.contatoService.update(contato).pipe(
      //   map( res => {
      //     console.log(res);
      //     if (res) {
      //       this.router.navigate(["/"]);
      //     }} )
      // )

      this.contatoService.editar(contato).subscribe({
        next: (res) => {
          if(res){
            this.router.navigate(["/"]);
          }
        },
        error:(err)=>{
          // console.error(err.message)
          console.error('Erro detalhado:', err.error);
          alert('Ocorreu um erro ao editar o contato. Tente novamente.');
        }
      })

    }
  }

  voltar(){
    this.router.navigate(["/"]);
  }

  resetar() {
    this.formContato.reset();
    }

    verificaEmailTouched(){
      // this.formulario.controls[campo];
      return !this.formContato.get('email')?.value && !!this.formContato.get('email')?.touched;
    }

    verificaEmailInvalido(){
      let campoEmail = this.formContato.get('email');
      if(campoEmail?.errors)
        return campoEmail.errors['email'];
    }

    verificaValidTouched(campo: any){
      // this.formulario.controls[campo];
      return !this.formContato.get(campo)?.valid && !!this.formContato.get(campo)?.touched;
    }

    aplicaCSSTextoVermelho(campo: any){
      return {
        'textoErro': this.verificaValidTouched(campo)
      }
    }

    aplicaCSSInvalido(campo: any){
      return {
        'is-invalid': this.verificaValidTouched(campo)
      }
    }



}

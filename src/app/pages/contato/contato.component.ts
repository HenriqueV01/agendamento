import { ContatoService } from './../../services/contato.service';
import { Component, inject, Input, OnInit } from '@angular/core';

import { MatInputModule}  from '@angular/material/input';
import { MatFormFieldModule}  from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IContato } from '../../shared/models/contato';


@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss'
})
export class ContatoComponent implements OnInit{

  @Input('id') idContato!: number;
  private contatoService= inject(ContatoService);
  public formBuilder = inject(FormBuilder);

  public formContato: FormGroup = this.formBuilder.group({
    id:[0],
    nome:[""],
    email:[""],
    celular:[""],
    telefone:[""],
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

    if(this.idContato == null){
      this.contatoService.criar(contato).subscribe({
        next: (res) => {
          this.router.navigate(["/"]);
          // console.log(res);
          // if(res){
          //   this.router.navigate(["/"]);
          // }else{
          //   alert("Erro ao criar!")
          // }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })

    }else{
      this.contatoService.editar(contato).subscribe({
        next: (contato) => {
          if(contato.isSuccess){
            this.router.navigate(["/"]);
          }else{
            alert("Erro ao editar!")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }

  voltar(){
    this.router.navigate(["/"]);
  }



}

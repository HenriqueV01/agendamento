import { ContatoService } from './../../services/contato.service';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IContato } from '../../models/contato';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private contatoService = inject(ContatoService)
  public listaContatos: IContato[] = [];
  public colunas: string[] = ['id','nome','email','celular','telefone','favorito','ativo','data_hora','ações'];

  obterContatos(){
    this.contatoService.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaContatos = data;
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router: Router){}

  novo(){
    this.router.navigate(['/contato',0]);
  }

  editar(contato: IContato){
    this.router.navigate(['/contato',contato.id]);
  }

  deletar(contato: IContato){
    if(confirm("Deseja deletar o contato: " + contato.nome)){
      this.contatoService.deletar(contato.id).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.obterContatos();
          }else{
            alert("Não é possível deletar!")
          }
      },
      error:(err)=>{
        console.log(err.message)
      }
      })
    }
  }




}

import { ContatoService } from './../../services/contato.service';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IContato } from '../../shared/models/contato';
import { Router } from '@angular/router';
import { LocalDateTimePipe } from '../../shared/pipe/local-date-time.pipe';
import { BooleanStringPipe } from '../../shared/pipe/boolean-string.pipe';
import { FonePipe } from '../../shared/pipe/fone.pipe';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, LocalDateTimePipe, BooleanStringPipe, FonePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  private contatoService = inject(ContatoService)
  public listaContatos: IContato[] = [];
  public displayedColumns: string[] = ['id','nome','email','celular','telefone','favorito','ativo','data_hora','ações'];

  obterContatos(){
    this.contatoService.listar().subscribe({
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

  constructor(private router: Router){
    this.obterContatos();
  }

  novo(){
    this.router.navigate(['/contato']);
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

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-erro',
  standalone: true,
  templateUrl: './campo-control-erro.component.html',
  styleUrl: './campo-control-erro.component.css'
})
export class CampoControlErroComponent {

  @Input() mostrarErro!: boolean;
  @Input() msgErro!: string;

}

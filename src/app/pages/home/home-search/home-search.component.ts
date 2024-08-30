import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss'
})
export class HomeSearchComponent {

  @Output() public emmitSeearch: EventEmitter<string> = new EventEmitter();

  public search(value: string){
    this.emmitSeearch.emit(value);
  }

}

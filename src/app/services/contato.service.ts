import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { IContato } from '../shared/models/contato';
import { ResponseApi } from '../shared/models/responseApi';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "contatos/";

  constructor() { }

  listar(){
    return this.http.get<IContato[]>(this.apiUrl);
  }

  buscar(id: number){
    return this.http.get<IContato>(`${this.apiUrl}${id}`);
  }

  criar(contato: IContato){
    return this.http.post<ResponseApi>(this.apiUrl, contato);
  }

  editar(contato: IContato){
    return this.http.put<ResponseApi>(`${this.apiUrl}${contato.id}`, contato);
  }

  public update(contato: IContato):Observable<any>{
    return this.http.put<any>( `${this.apiUrl}${contato.id}`, contato );
  }

  deletar(id: number){
    return this.http.delete<ResponseApi>(`${this.apiUrl}${id}`);
  }

}

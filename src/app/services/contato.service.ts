import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiUrl: string = appsettings.apiUrl + "api/contatos/";

  constructor() { }

  listar(){

    return this.http.get<IContato[]>(this.apiUrl);
  }

  buscar(id: number){
    return this.http.get<IContato>(`${this.apiUrl}${id}`);
  }

  criar(contato: IContato){

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + token,
    //   'Content-Type': 'application/json'
    // });
    //return this.http.post<ResponseApi>(this.apiUrl, contato, { headers });

    return this.http.post<ResponseApi>(this.apiUrl, contato);
  }

  editar(contato: IContato):Observable<IContato>{
    console.log('editar')
    return this.http.put<IContato>(`${this.apiUrl}${contato.id}`, contato);
  }

  public update(contato: IContato):Observable<any>{
    return this.http.put<any>( `${this.apiUrl}${contato.id}`, contato );
  }

  deletar(id: number){
    return this.http.delete<ResponseApi>(`${this.apiUrl}${id}`);
  }

}

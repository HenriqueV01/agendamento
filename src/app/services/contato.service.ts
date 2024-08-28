import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { IContato } from '../models/contato';
import { ResponseApi } from '../models/responseApi';


@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "contatos";

  constructor() { }

  lista(){
    return this.http.get<IContato>(this.apiUrl);
  }

  buscar(id: number){
    return this.http.get<IContato>(`${this.apiUrl}/${id}`);
  }


  criar(){
    return this.http.post<ResponseApi>(this.apiUrl,Object);
  }

  editar(){
    return this.http.put<ResponseApi>(this.apiUrl,Object);
  }

  deletar(id: number){
    return this.http.get<IContato>(`${this.apiUrl}/${id}`);
  }

}

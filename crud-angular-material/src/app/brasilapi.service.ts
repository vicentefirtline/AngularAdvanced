import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado, Municipio } from './brasilapi.models';


@Injectable({
  providedIn: 'root',
})
export class Brasilapi {

  baseUrl = 'https://brasilapi.com.br/api';
  constructor(private http: HttpClient) { }

//https://brasilapi.com.br/api/ibge/uf/v1

  listarUFs() : Observable<Estado[]> {
    const path = '/ibge/uf/v1';
    return this.http.get<Estado[]>(`${this.baseUrl}${path}`);
  } 

  listarMunicipiosPorUF(uf: string) : Observable<Municipio[]> {
    const path = `/ibge/municipios/v1/${uf}`;
    return this.http.get<Municipio[]>(`${this.baseUrl}${path}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //URL da API
  private URL_API: string = 'http://localhost:8080/clientes';

  //Construtor -> injetando o HttClient -> responsável pelas requisições à nossa API
  constructor(private http: HttpClient) { }

  //Método para selecionar todos os clientes
  selecionar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.URL_API);
  }

  //Método para cadastrar clientes
  cadastrar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.URL_API, cliente);
  }
}

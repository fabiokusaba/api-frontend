import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  //URL da API
  private URL_API: string = 'http://localhost:8080/clientes';

  //Construtor -> injetando o HttClient -> responsável pelas requisições à nossa API
  constructor(private http: HttpClient) { }
}

import { Component } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  //Variável para visibilidade dos botões
  btnCadastro: boolean = true;

  //JSON de clientes
  clientes: Cliente[] = [];

  //Construtor -> injeção de dependência -> acesso ao nosso ClienteService
  constructor(private servico: ClienteService) {
  }

  //Método selecionar clientes
  selecionar(): void {
    this.servico.selecionar()
      .subscribe(retorno => this.clientes = retorno);
  }

  //Método de inicialização do componente -> assim que criado irá executar o que estiver em ngOnInit
  ngOnInit() {
    this.selecionar();
  }

}

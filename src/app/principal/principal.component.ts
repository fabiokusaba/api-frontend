import { Component } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  //Objeto do tipo Cliente
  cliente = new Cliente();

  //Variável para visibilidade dos botões
  btnCadastro: boolean = true;

  //Variável para visibilidade da tabela
  tabela: boolean = true;

  //JSON de clientes -> vetor do tipo Cliente
  clientes: Cliente[] = [];

  //Construtor -> injeção de dependência -> acesso ao nosso ClienteService
  constructor(private servico: ClienteService) {}

  //Método selecionar clientes
  selecionar(): void {
    this.servico.selecionar().subscribe((retorno) => (this.clientes = retorno));
  }

  //Método cadastrar clientes
  cadastrar(): void {
    this.servico.cadastrar(this.cliente).subscribe((retorno) => {
      //Cadastrar o cliente no vetor do tipo Cliente
      this.clientes.push(retorno);

      //Limpar os campos de input do formulário
      this.cliente = new Cliente();

      //Mensagem de sucesso
      alert('Cliente cadastrado com sucesso!');
    });
  }

  //Método para selecionar um cliente específico
  selecionarCliente(posicao: number): void {
    //Selecionar cliente no vetor
    this.cliente = this.clientes[posicao];

    //Visibilidade dos botões
    this.btnCadastro = false;

    //Visibilidade da tabela
    this.tabela = false;
  }

  //Método para editar um cliente
  editar(): void {
    this.servico.editar(this.cliente).subscribe((retorno) => {
      //Obter posição do vetor onde está o cliente que queremos editar
      let posicao = this.clientes.findIndex((cliente) => {
        return cliente.codigo == retorno.codigo;
      });

      //Alterando os dados do cliente no vetor
      this.clientes[posicao] = retorno;

      //Limpando o formulário
      this.cliente = new Cliente();

      //Visibilidade dos botões
      this.btnCadastro = true;

      //Visibilidade da tabela
      this.tabela = true;

      //Mensagem de sucesso
      alert('Cliente alterado com sucesso!');
    });
  }

  //Método para remover um cliente
  remover(): void {
    this.servico.remover(this.cliente.codigo).subscribe((retorno) => {
      //Obter posição do vetor onde está o cliente que queremos editar
      let posicao = this.clientes.findIndex((cliente) => {
        return cliente.codigo == this.cliente.codigo;
      });

      //Removendo cliente do vetor -> no método splice nós passamos a posição e a quantidade de elementos que queremos remover
      this.clientes.splice(posicao, 1);

      //Limpando o formulário
      this.cliente = new Cliente();

      //Visibilidade dos botões
      this.btnCadastro = true;

      //Visibilidade da tabela
      this.tabela = true;

      //Mensagem de sucesso
      alert('Cliente removido com sucesso!');
    });
  }

  //Método de inicialização do componente -> assim que criado irá executar o que estiver em ngOnInit
  ngOnInit() {
    this.selecionar();
  }
}

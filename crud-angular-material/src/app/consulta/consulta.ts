import { Component,OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';   
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [CommonModule, MatInputModule, MatCardModule, FlexLayoutModule,
     MatIconModule, FormsModule, MatTableModule, MatButtonModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit {
  nomeBusca : string = ''; 
  listaClientes : Cliente[] = [];
  colunasTabela: string[] = ['id', 'nome', 'email', 'telefone', 'endereco', 'cpf', 'dataNascimento',"acoes"];
  deletando : boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {

  }

  ngOnInit(){
  this.listaClientes = this.clienteService.pesquisarClientes('');
  }

 pesquisarClientes() {
  this.listaClientes = this.clienteService.pesquisarClientes(this.nomeBusca);
}

editarCliente(id: string) { 
this.router.navigate(['/cadastro'], { queryParams: { "id" : id } });

}

preparaDeletarCliente() {
  this.deletando = true;
}

deletarCliente(cliente : Cliente) {}

}

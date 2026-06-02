import { Component,OnInit,inject } from '@angular/core';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';    


@Component({
  selector: 'app-consulta',
  imports: [CommonModule, MatInputModule, MatCardModule, FlexLayoutModule,
     MatIconModule, FormsModule, MatTableModule, MatButtonModule,MatSnackBarModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit {
  nomeBusca : string = ''; 
  listaClientes : Cliente[] = [];
  colunasTabela: string[] = ['id', 'nome', 'email', 'telefone', 'endereco', 'cpf', 'dataNascimento',"acoes"];
  deletando : boolean = false;
   snack: MatSnackBar = inject(MatSnackBar);

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

preparaDeletarCliente(cliente: Cliente) {
  cliente.deletando = true;
}

deletarCliente(cliente : Cliente) {
  this.clienteService.deletarCliente(cliente);
  this.listaClientes = this.clienteService.pesquisarClientes('');
  this.deletando = false;
  this.mostrarMensagem('Cliente deletado com sucesso!');
}

mostrarMensagem(mensagem: string){
    this.snack.open(mensagem, 'Fechar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top', });
}

}

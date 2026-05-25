import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';      


@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule, MatCardModule, FormsModule,
     MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  cliente: Cliente = Cliente.newCliente();
  
  constructor(private clienteService: ClienteService) {

  }
  salvar(){
   this.clienteService.salvar(this.cliente);
  }
}

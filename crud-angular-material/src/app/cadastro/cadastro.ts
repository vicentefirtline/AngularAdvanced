import { Component,OnInit,  inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';      
import { ActivatedRoute, Router} from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';    


@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule, MatCardModule, FormsModule,
     MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon, NgxMaskDirective ,MatSnackBarModule],
      providers: [provideNgxMask()],
     templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
   snack: MatSnackBar = inject(MatSnackBar);

  
  constructor(
    private clienteService: ClienteService,
    private route : ActivatedRoute,
    private router: Router
  ){

  }

  ngOnInit(): void{
   this.route.queryParamMap.subscribe((query:any) => {
    const params = query['params']
    //console.log("Params: ", params);
    const id = params['id'];
    if(id){
       let clienteEncontrado = this.clienteService.buscarClientePorId(id);
       if(clienteEncontrado){   
        this.atualizando = true;
        this.cliente = clienteEncontrado;
       }
      }
    })
  }

  /*salvar(){
  if(this.atualizando){
   this.clienteService.salvar(this.cliente);
   this.cliente = Cliente.newCliente();
  } else {
   this.clienteService.atualizar(this.cliente); 
   this.router.navigate(['/consulta']);
  }

  }*/

  salvar(){
  if(this.atualizando){
   this.clienteService.atualizar(this.cliente); 
   this.mostrarMensagem('Cliente atualizado com sucesso!');
  } else {
   this.clienteService.salvar(this.cliente);
   this.cliente = Cliente.newCliente();
    this.mostrarMensagem('Cliente cadastrado com sucesso!');
  }
   this.router.navigate(['/consulta']);
}

mostrarMensagem(mensagem: string){
this.snack.open(mensagem, 'Fechar', {
duration: 3000,
horizontalPosition: 'center',
verticalPosition: 'top', });
}

}

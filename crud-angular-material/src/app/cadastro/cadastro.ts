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
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { Brasilapi } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';
import {  ChangeDetectorRef } from '@angular/core';




@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule, MatCardModule, FormsModule,
     MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon, NgxMaskDirective,
      CommonModule ,MatSnackBarModule, MatSelectModule],
      providers: [provideNgxMask()],
     templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
   snack: MatSnackBar = inject(MatSnackBar);
   estados: Estado[] = [];
   municipios: Municipio[] = [];  
   

  
  constructor(
    private clienteService: ClienteService,
    private route : ActivatedRoute,
    private router: Router,
    private brasilApiService : Brasilapi,
    private cdr: ChangeDetectorRef
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
        if(this.cliente.uf){
          this.carregarMunicipios({value: this.cliente.uf} as MatSelectChange);
          
          // >>> ADICIONE APENAS ESTA LINHA AQUI <<<
          this.cdr.detectChanges();
          
        }
       }
      }
    })

    this.carregarUFs(); //puxando a funcao das ufs para carregar as ufs no select do cadastro

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


carregarUFs() {
  this.brasilApiService.listarUFs().subscribe({
    next: (listaEstados) => {
      this.estados = listaEstados;

      if (this.cliente.uf) {
        // >>> ADICIONE ESTA LINHA (Abertura)
        setTimeout(() => {
          
          this.carregarMunicipios({
            value: this.cliente.uf
          } as MatSelectChange);

        // >>> ADICIONE ESTA LINHA (Fechamento)
        }, 0);
      }
    }
  });
}

carregarMunicipios(event:MatSelectChange){
 const ufSelecionada = event.value;
 this.brasilApiService.listarMunicipiosPorUF(ufSelecionada).subscribe({
  next: (listaMunicipios) => {
    this.municipios = listaMunicipios;

    // >>> ADICIONE ESTAS LINHAS <<<
    setTimeout(() => {
      this.cliente.municipio = this.cliente.municipio;
    }, 0);
    
  }
 });
}
mostrarMensagem(mensagem: string){
this.snack.open(mensagem, 'Fechar', {
duration: 3000,
horizontalPosition: 'center',
verticalPosition: 'top', });
}

}

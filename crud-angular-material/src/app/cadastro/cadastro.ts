import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';      
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';    
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Brasilapi } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule, MatCardModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon, 
    NgxMaskDirective, CommonModule, MatSnackBarModule, MatSelectModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  estados: Estado[] = [];
  municipios: Municipio[] = [];  
   
  // Injeções de Dependência corrigidas
  private snack: MatSnackBar = inject(MatSnackBar);
  private clienteService: ClienteService = inject(ClienteService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router); // Corrigido o inject duplo
  private brasilApiService: Brasilapi = inject(Brasilapi);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // 1. Carrega as UFs primeiro
    this.carregarUFs(); 

    // 2. Captura correta dos parâmetros com o método .get() do ParamMap
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      
      if (id) {
        let clienteEncontrado = this.clienteService.buscarClientePorId(id);
        if (clienteEncontrado) {   
          this.atualizando = true;
          this.cliente = { ...clienteEncontrado }; // Evita mutação direta antes do save
          
          if (this.cliente.uf) {
            this.buscarMunicipiosDaUF(this.cliente.uf);
          }
        }
      }
    });
  }

  salvar() {
    if (this.atualizando) {
      this.clienteService.atualizar(this.cliente); 
      this.mostrarMensagem('Cliente atualizado com sucesso!');
    } else {
      this.clienteService.salvar(this.cliente);
      this.mostrarMensagem('Cliente cadastrado com sucesso!');
    }
    this.voltarParaConsulta();
  }

  carregarUFs() {
    this.brasilApiService.listarUFs().subscribe({
      next: (listaEstados) => {
        this.estados = listaEstados;
        this.cdr.detectChanges(); 
      }
    });
  }

  // Evento disparado pela mudança manual na tela
  carregarMunicipios(event: MatSelectChange) {
    this.buscarMunicipiosDaUF(event.value);
    this.cliente.municipio = ''; // Reseta o município ao trocar o Estado
  }

  // Busca isolada usada no Init e na troca de UF
  buscarMunicipiosDaUF(siglaUF: string) {
    this.brasilApiService.listarMunicipiosPorUF(siglaUF).subscribe({
      next: (listaMunicipios) => {
        this.municipios = listaMunicipios;
        this.cdr.detectChanges(); 
      }
    });
  }

  // Método público para o HTML usar na navegação (evita o erro de propriedade privada)
  voltarParaConsulta() {
    this.router.navigate(['/consulta']);
  }

  // Funções de comparação para o mat-select fixar os valores na edição
  compararUf(uf1: string, uf2: string): boolean {
    return uf1 && uf2 ? uf1 === uf2 : uf1 === uf2;
  }

  compararMunicipio(muni1: string, muni2: string): boolean {
    return muni1 && muni2 ? muni1 === muni2 : muni1 === muni2;
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top', 
    });
  }
}
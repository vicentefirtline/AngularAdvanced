import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemLista } from './itemlista';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-compras.html',
  styleUrl: './lista-compras.scss',
})
export class ListaCompras {
  item: string = '';
  lista: ItemLista[] = [];// Exemplo de item pré-adicionado vazio

  adicionarItem(){
  let itemLista = new ItemLista();
  itemLista.nome = this.item;
  itemLista.id = this.lista.length + 1; // Atribui um ID baseado no tamanho atual da lista  
  
  this.lista.push(itemLista);// Adiciona o item à lista
  this.item = '';

  console.table(this.lista);

  }

  riscarItem(ItemLista: ItemLista){ 
    ItemLista.comprado = !ItemLista.comprado; // Alterna o estado de comprado
  }

  limparLista(){
    this.lista = []; // Limpa a lista de compras
  }

}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemLista } from './itemlista';

@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule],
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
}

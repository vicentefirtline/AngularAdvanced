import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  static REPO_CLIENTE = "_CLIENTES";

salvar(cliente: Cliente) {
//console.log(cliente);
const storageClientes = this.obterStorage();// Obtém os clientes armazenados no localStorage
storageClientes.push(cliente);// Adiciona o novo cliente ao array de clientes
localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(storageClientes)); // Armazena o array atualizado de clientes no localStorage
}

pesquisarClientes(nome: string): Cliente[] {
  return this.obterStorage();
}

private obterStorage(): Cliente[] {
  const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTE);
  if (repositorioClientes) {
    const clientes: Cliente[] = JSON.parse(repositorioClientes);
     return clientes;
   }

   const clientes: Cliente[] = []; // Cria um array vazio para armazenar os clientes
   localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(clientes));
  return [];// Retorna um array vazio se não houver clientes armazenados
 }
}

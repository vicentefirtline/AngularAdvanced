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

pesquisarClientes(nomeBusca: string): Cliente[] {
 const clientes = this.obterStorage(); 
 // Obtém os clientes armazenados no localStorage
  if (!nomeBusca) {
  return clientes; // Retorna todos os clientes se o nome de busca estiver vazio
 }
 //return clientes.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1); // Retorna os clientes cujo nome contém a string de busca (ignorando maiúsculas/minúsculas)   
  return clientes.filter(cliente => cliente.nome?.toLowerCase().includes(nomeBusca.toLowerCase())); // Retorna os clientes cujo nome contém a string de busca (ignorando maiúsculas/minúsculas)   
  
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

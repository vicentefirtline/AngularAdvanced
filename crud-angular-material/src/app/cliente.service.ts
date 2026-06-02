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

/*atualizar(cliente: Cliente) {
const storageClientes = this.obterStorage(); // Obtém os clientes armazenados no localStorage
storageClientes.forEach(clienteStorage  => {
  if(clienteStorage.id === cliente.id){
    Object.assign(clienteStorage, cliente); // Atualiza as propriedades do cliente encontrado com as novas informações      
  }

})
localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(storageClientes)); 
} */

atualizar(cliente: Cliente) {
  let storageClientes = this.obterStorage();
  
  storageClientes = storageClientes.map(clienteStorage => {
    if (clienteStorage.id === cliente.id) {
      return Object.assign(clienteStorage, cliente);
    }
    return clienteStorage;
  });

  localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(storageClientes));
}

deletarCliente(cliente: Cliente) {
  const storageClientes = this.obterStorage(); // Obtém os clientes armazenados no localStorage

  const novaLista = storageClientes.filter(clienteStorage => clienteStorage.id !== cliente.id); // Remove o cliente com o ID correspondente do array de clientes

  const indexItem = storageClientes.indexOf(cliente);
  if (indexItem > -1) {
    storageClientes.splice(indexItem, 1); // Remove o cliente do array de clientes
  }

  localStorage.setItem(ClienteService.REPO_CLIENTE, JSON.stringify(novaLista));
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

buscarClientePorId(id: string): Cliente | undefined {
  const clientes = this.obterStorage(); 
  // Obtém os clientes armazenados no localStorage
  return clientes.find(cliente => cliente.id === id) || Cliente.newCliente();
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

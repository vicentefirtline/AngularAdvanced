import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
salvar(cliente: Cliente) {
console.log(cliente);
}

}

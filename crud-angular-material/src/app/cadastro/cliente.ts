import { v4 as uuid} from 'uuid';

export class Cliente {
    id?: string ;
    nome?: string ;
    email?: string;
    telefone?: string ;   
    endereco?: string ;
    cpf?: string = '';
    dataNascimento?: string;

    static newCliente(){
        const cliente = new Cliente();
        cliente.id = uuid();
        return cliente;
    }
    
};


import { Routes } from '@angular/router';


export const routes: Routes = [
    {path:'cadastro',loadComponent:()=>import('./cadastro/cadastro').then(m=>m.Cadastro)},
    {path:'consulta',loadComponent:()=>import('./consulta/consulta').then(m=>m.Consulta)}
];

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Calculadora } from './calculadora/calculadora';
import { ListaCompras } from './lista-compras/lista-compras';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Calculadora,ListaCompras],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('basic-concepts');
}

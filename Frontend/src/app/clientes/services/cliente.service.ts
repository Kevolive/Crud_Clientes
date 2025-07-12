import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = [
    {
      id: "1",
      nombre: 'Nataila Cliente',
      descripcion: 'Le realicé instalación de puntos',
      tecnica: 'nanoring',
      cantidad: 78,
      precioUnitario: 1700,
      direccion: 'la Estrella',
      cel: '1234567890',
      precioTotal: 132600,
      fecha: '2023-10-01',
      image: 'image1.jpg'
    },
    {
      id: "2",
      nombre: 'Carolina Cliente',
      descripcion: 'Le realicé instalación de puntos',
      tecnica: 'microring',
      cantidad: 78,
      precioUnitario: 1500,
      direccion: 'la Estrella',
      cel: '1234567890',
      precioTotal: 117000,
      fecha: '2023-10-02',
      image: 'image2.jpg'
    }
  ];

  private clientes$ = new BehaviorSubject<Cliente[]>([...this.clientes]);

  getAll(): Observable<Cliente[]> {
    return this.clientes$.asObservable();
  }

  getById(id: string): Cliente | undefined {
    return this.clientes.find(cliente => cliente.id === id);
  }

  create(cliente: Cliente): void {
    cliente.id = this.generateId();
    this.clientes.push(cliente);
    this.clientes$.next([...this.clientes]);
  }

  update(cliente: Cliente): void {
    const index = this.clientes.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      this.clientes[index] = cliente;
      this.clientes$.next([...this.clientes]);
    }
  }

  delete(id: string): void {
    this.clientes = this.clientes.filter(cliente => cliente.id !== id);
    this.clientes$.next([...this.clientes]);
  }

  private generateId(): string {
    return this.clientes.length > 0
      ? (Math.max(...this.clientes.map(c => Number(c.id))) + 1).toString()
      : '1';
  }
}

import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
// import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { ClienteHttpService } from '../../services/cliente-http.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteHttpService: ClienteHttpService,
    private router: Router) {

  }
  ngOnInit(): void {
    //servicio local
    this.clienteHttpService.getAll().subscribe(data => {
      this.clientes = data;
    }),

      //cliente api
      this.clienteHttpService.getAll().subscribe(data => {
        this.clientes = data;
      });
  }

  onCreate() {
    this.router.navigate(['/clientes/create']);
  }

  onEdit(cliente: Cliente) {
    this.router.navigate(['/clientes/edit', cliente.id]);
  }

  onDelete(cliente: Cliente) {
    if (confirm(`¿Estás seguro de eliminar al cliente ${cliente.nombre}?`)) {
      this.clienteHttpService.delete(cliente.id).subscribe(() => {
        this.clientes = this.clientes.filter(c => c.id !== cliente.id);
      })
    }

  }
}

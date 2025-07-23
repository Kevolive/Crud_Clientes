import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
// import { ClienteService } from '../../services/cliente.service';
import { NavigationEnd, Router } from '@angular/router';
import { ClienteHttpService } from '../../services/cliente-http.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = [];
  loading: boolean = true;

  constructor(
    private clienteHttpService: ClienteHttpService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.cargarClientes();


    this.router.events
      .pipe(filter(evente => evente instanceof NavigationEnd))
      .subscribe(() => {
        this.cargarClientes();
      });

  }


  cargarClientes() {
      this.loading = true;

  this.clienteHttpService.getAll().subscribe({
    next: (data) => {
      this.clientes = data ?? [];
      this.loading = false;
    },
    error: (err) => {
      console.error('Error al cargar clientes:', err);
      this.clientes = [];
      this.loading = false;
    }
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
        this.cargarClientes();
      });
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../../interfaces/cliente.interface';

import { ClienteHttpService } from '../../services/cliente-http.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  clienteId!: string | number;


  tecnicas = [
    { value: 'nanoring', label: 'Nanoring' },
    { value: 'microring', label: 'Microring' }];

  constructor(

    private clienteHttpService: ClienteHttpService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      tecnica: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precioUnitario: ['', [Validators.required, Validators.min(1)]],
      direccion: ['', Validators.required,],
      cel: ['', [Validators.required, Validators.pattern(/^3\d{9}$/)]],
      precioTotal: [0],
      fecha: ['', Validators.required],
      image: ['', Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/)]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.clienteId = id;
      this.clienteHttpService.getById(this.clienteId.toString()).subscribe(cliente => {
        if (cliente) {
          this.form.patchValue(cliente);
          this.actualizarTotal();
        }
      });
    }

    this.form.get('tecnica')?.valueChanges.subscribe(tecnica => {
      const precio = tecnica === 'nanoring' ? 1700 : 1500;
      this.form.patchValue({ precioUnitario: precio }, { emitEvent: false });
      this.actualizarTotal();
    });

    this.form.get('cantidad')?.valueChanges.subscribe(() => {
      this.actualizarTotal();
    });
  }

  actualizarTotal(): void {
    const cantidad = this.form.get('cantidad')?.value || 0;
    const precioUnitario = this.form.get('precioUnitario')?.value || 0;
    const total = cantidad * precioUnitario;
    this.form.patchValue({ precioTotal: total }, { emitEvent: false });
  }

  onSubmit(): void {
    console.log('✅ Form submitted:', this.form.value);
    if (this.form.invalid) return;

    const cliente: Cliente = {
      ...this.form.getRawValue(),
      fecha: new Date(this.form.get('fecha')?.value).toISOString().substring(0, 10)
    };
    if (this.editMode) {
      this.clienteHttpService.update(this.clienteId.toString(), cliente).subscribe({
        next: () => {
          console.log('Cliente actualizado correctamente');
          this.router.navigate(['/clientes']);
        },
        error: (error) => {
          console.error('Error al actualizar el cliente:', error);
        }
      });
    } else {
      this.clienteHttpService.create(cliente).subscribe({
        next: () => {
          console.log('Cliente creado correctamente');
          this.router.navigate(['/clientes']);
        },
        error: (error) => {
          console.error('Error al crear el cliente:', error);
        }
      });
    }

    this.router.navigate(['/clientes']);
  }
  onCancel(): void {
    this.router.navigate(['/clientes']);
  }
  get f() {
    return this.form.controls;
  }
}

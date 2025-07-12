import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
form!: FormGroup;
editMode= false;
clienteId!: number;


tecnicas = [
  { value: 'nanoring', label: 'Nanoring' },
  { value: 'microring', label: 'Microring' }];

constructor(
  private clienteService: ClienteService,
  private fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tecnica: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioUnitario: ['', Validators.required],
      direccion: ['', Validators.required],
      cel: ['', Validators.required],
      precioTotal: ['', Validators.required],
      fecha: [new Date().toISOString().substring(0, 10), Validators.required],
      image: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.clienteId = +id;
      const cliente = this.clienteService.getById(this.clienteId.toString());
      if(cliente){
        this.form.patchValue(cliente);
        this.actualizarTotal();
      }
  }

  this.form.get('tecnica')?.valueChanges.subscribe(tecnica => {
  const precio = tecnica === 'nanoring' ? 1700 : 1500;
  this.form.patchValue({ precioUnitario: precio }, {emitEvent: false});
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
  if(this.form.invalid) return;

  const cliente: Cliente = {
    id: this.clienteId || 0,
    ...this.form.getRawValue()
  };
  if (this.editMode) {
    this.clienteService.update(cliente);
  } else {
    this.clienteService.create(cliente);
  }

  this.router.navigate(['/clientes']);
}
onCancel(): void {
  this.router.navigate(['/clientes']);
}
}

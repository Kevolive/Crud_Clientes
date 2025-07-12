import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListComponent } from './pages/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './pages/cliente-form/cliente-form.component';
import { ReactiveFormsModule } from '@angular/forms';


// Importaciones PrimeNG
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClienteRoutingModule,

    // /Primeng
     TableModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,

  ]
})
export class ClienteModule { }

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
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';



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
    MessageModule,
    MessagesModule,
    PanelModule,
    CalendarModule

  ]
})

export class ClienteModule { }

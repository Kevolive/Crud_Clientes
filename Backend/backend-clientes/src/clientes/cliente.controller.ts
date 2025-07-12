// src/clientes/cliente.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Post()
  create(@Body() cliente: Cliente) {
    return this.clienteService.create(cliente);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Cliente>) {
    return this.clienteService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clienteService.delete(id);
  }
}

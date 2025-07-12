// src/clientes/cliente.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clienteRepo.find();
  }

  findOne(id: string): Promise<Cliente | null> {
    return this.clienteRepo.findOneBy({ id });
  }

  create(cliente: Cliente): Promise<Cliente> {
    return this.clienteRepo.save(cliente);
  }

  update(id: string, data: Partial<Cliente>): Promise<Cliente> {
    return this.clienteRepo.save({ ...data, id });
  }

  async delete(id: string): Promise<void> {
    await this.clienteRepo.delete(id);
  }
}

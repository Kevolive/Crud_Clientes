// src/clientes/cliente.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  tecnica: 'nanoring' | 'microring';

  @Column('int')
  cantidad: number;

  @Column('int')
  precioUnitario: number;

  @Column('int')
  precioTotal: number;

  @Column()
  direccion: string;

  @Column()
  cel: string;

  @Column()
  fecha: string;

  @Column({ nullable: true })
  image: string;
}

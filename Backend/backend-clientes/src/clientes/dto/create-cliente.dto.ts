import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsInt,
  IsOptional,
  IsDateString,
  IsUrl
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsIn(['nanoring', 'microring'])
  tecnica: string;

  @IsInt()
  cantidad: number;

  @IsInt()
  precioUnitario: number;

  @IsInt()
  precioTotal: number;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  cel: string;

  @IsDateString()
  fecha: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}

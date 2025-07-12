export interface Cliente {
id: string;
nombre: string;
descripcion: string;
cantidad: number;
precioUnitario: number;
precioTotal?: number;
direccion: string;
cel: string;
fecha: string;
tecnica: 'nanoring' | 'microring';
image?: string;
}

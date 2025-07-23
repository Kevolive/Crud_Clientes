import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClienteHttpService {

  private readonly apiUrl = `${environment.apiUrl}clientes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  update(id: string, cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

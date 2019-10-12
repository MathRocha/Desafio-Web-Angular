import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  listar(page, per_page) {
    return this.http.get<ListarData>(`https://reqres.in/api/users?page=${page}&per_page=${per_page}`);
  }

  listarPorId(id: string) {
    return this.http.get<ListarPorIdData>(`https://reqres.in/api/users/${id}`);
  }

  cadastrar(name: string, job: string) {
    return this.http.post('https://reqres.in/api/users', { name, job });
  }

  editar(id: string, job: string) {
    return this.http.put(`https://reqres.in/api/users/${id}`, { job });
  }
}

export interface ListarData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface ListarPorIdData {
  data: User;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface PageData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

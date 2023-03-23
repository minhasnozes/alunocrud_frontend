import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

interface response {
  count: number;
  next: number;
  previous: number;
  results: any;
}
@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  private apiUrl = 'http://localhost:8000/categoria/';

  constructor(private http: HttpClient) { }

  getAllCategoria(): Observable<response> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers: headers };
    return this.http.get<response>(this.apiUrl);
  }

  getCategoriaById(id: number): Observable<Categoria> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Categoria>(url);
  }

  createCategoria(Categoria: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, Categoria);
  }

  updateCategoria(Categoria: Categoria): Observable<Categoria> {
    const url = `${this.apiUrl}${Categoria.id}/`;
    return this.http.put<Categoria>(url, Categoria);
  }

  deleteCategoria(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete(url);
  }
}

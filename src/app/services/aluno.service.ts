import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../interfaces/aluno';

interface response {
  count: number;
  next: number;
  previous: number;
  results: any;
}
@Injectable({
  providedIn: 'root'
})

export class AlunoService {
  private apiUrl = 'http://localhost:8000/aluno/';

  constructor(private http: HttpClient) { }

  getAllAlunos(): Observable<response> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers: headers };
    return this.http.get<response>(this.apiUrl);
  }

  getAlunoById(id: number): Observable<Aluno> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Aluno>(url);
  }

  createAluno(aluno: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, aluno);
  }

  updateAluno(aluno: Aluno): Observable<Aluno> {
    const url = `${this.apiUrl}${aluno.id}/`;
    return this.http.put<Aluno>(url, aluno);
  }

  deleteAluno(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete(url);
  }
}

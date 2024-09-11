import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take, tap } from 'rxjs';
import { Item, LivroResultado } from '../model/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  buscar(dado: string): Observable<Item[]>{
    const params = new HttpParams().append('q', dado);
    return this.http.get<LivroResultado>(this.API, {params}).pipe(
      map(resultado => resultado.items)
    );
  }
}

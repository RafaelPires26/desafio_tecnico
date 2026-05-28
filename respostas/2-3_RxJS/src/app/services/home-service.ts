import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class HomeService {

  private http = inject(HttpClient); 
  
  private apiUrl = 'http://localhost:4200/';

  constructor() {}

  buscar(dados: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?q=${dados}`);
  }

}

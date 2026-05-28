import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class HomeService {

  private usersState = signal<User[]>([]);
  public users = this.usersState.asReadonly();

  private mockUsers: User[] = [
    { 
      id    : '1', 
      name  : 'João', 
      email : 'joao@google.com.br', 
      cpf   : '123.456.789-00', 
      phone : '34999998888'
    }
  ];

  constructor() {}

  getUsers(): Observable<User[]> {
    return of(this.mockUsers).pipe(
      delay(800),
      tap(users => this.usersState.set(users)),
      catchError(err => {
        console.error('Erro ao buscar usuários', err);
        return throwError(() => new Error('Falha ao carregar usuários.'));
      })
    );
  }

  createUser(user: User): Observable<User> {
    const newUser = { ...user, id: Math.random().toString(36).substr(2, 9) };
    this.mockUsers.push(newUser);
    this.usersState.set([...this.mockUsers]);
    return of(newUser).pipe(delay(500));
  }

  updateUser(updatedUser: User): Observable<User> {
    this.mockUsers = this.mockUsers.map(u => u.id === updatedUser.id ? updatedUser : u);
    this.usersState.set([...this.mockUsers]);
    return of(updatedUser).pipe(delay(500));
  }
}
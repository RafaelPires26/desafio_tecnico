import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { TodoActions } from './home.actions';
import { Todo } from './home.model';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TodoEffects {
  private readonly apiUrl = 'http://localhost:4200';

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.http.get<Todo[]>(this.apiUrl).pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) =>
            of(TodoActions.loadTodosError({ error: error.message || 'Erro desconhecido' }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {}
}
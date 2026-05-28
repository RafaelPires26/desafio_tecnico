import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './home.reducer';

// Cria o seletor da feature (deve bater com a chave registrada no StoreModule)
export const selectTodoState = createFeatureSelector<TodoState>('todoFeature');

// Retorna a lista completa de todos
export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

// Filtra e retorna apenas as tarefas pendentes
export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(todo => !todo.completed)
);

// Opcional: Seletor para monitorar o loading ou erros na UI
export const selectTodoLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);
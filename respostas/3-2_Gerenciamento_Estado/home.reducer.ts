import { createReducer, on } from '@ngrx/store';
import { Todo } from './home.model';
import { TodoActions } from './home.actions';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const initialTodoState: TodoState = {
  todos: [],
  loading: false,
  error: null
};

export const todoReducer = createReducer(
  initialTodoState,
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false
  })),
  on(TodoActions.loadTodosError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(TodoActions.toggleTodoComplete, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
);
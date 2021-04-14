import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { Todo } from '../types/todo.interface';

@Injectable()
export class TodosService {
  todosSubject = new BehaviorSubject<Todo[]>([]);
  filterSubject = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  filter$ = this.filterSubject.asObservable();

  addTodo(text: string): void {
    const newTodo: Todo = {
      id: Math.random().toString(16),
      isCompleted: false,
      text,
    };
    const updatedTodos = [...this.todosSubject.getValue(), newTodo];
    this.todosSubject.next(updatedTodos);
  }

  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todosSubject.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
    this.todosSubject.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todosSubject.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todosSubject.next(updatedTodos);
  }

  toggleTodo(id: string): void {
    const updatedTodos = this.todosSubject.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todosSubject.next(updatedTodos);
  }

  removeTodo(id: string): void {
    const updatedTodos = this.todosSubject.getValue().filter((todo) => {
      return todo.id !== id;
    });
    this.todosSubject.next(updatedTodos);
  }
}

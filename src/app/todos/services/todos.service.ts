import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../types/todo.interface';

@Injectable()
export class TodosService {
  todosSubject = new BehaviorSubject<Todo[]>([]);

  addTodo(text: string): void {
    const newTodo: Todo = {
      id: Math.random().toString(16),
      isCompleted: false,
      text,
    };
    const updatedTodos = [...this.todosSubject.getValue(), newTodo];
    this.todosSubject.next(updatedTodos);
  }
}

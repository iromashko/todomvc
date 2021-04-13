import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { Todo } from '../types/todo.interface';

@Injectable()
export class TodosService {
  todosSubject = new BehaviorSubject<Todo[]>([]);
  filterSubject = new BehaviorSubject<FilterEnum>(FilterEnum.all);

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

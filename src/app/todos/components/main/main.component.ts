import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  editingId: string | null = null;

  visibleTodos$ = combineLatest([
    this.todosService.todosSubject,
    this.todosService.filterSubject,
  ]).pipe(
    map(([todos, filter]: [Todo[], FilterEnum]) => {
      if (filter === FilterEnum.active) {
        return todos.filter((todo) => !todo.isCompleted);
      }
      if (filter === FilterEnum.completed) {
        return todos.filter((todo) => todo.isCompleted);
      }
      return todos;
    })
  );

  noTodoClass$ = this.todosService.todosSubject.pipe(
    map((todos) => todos.length === 0)
  );

  isAllTodosSelected$ = this.todosService.todosSubject.pipe(
    map((todos) => todos.every((todo) => todo.isCompleted))
  );

  constructor(private todosService: TodosService) {}

  toggleAllTodos(target: EventTarget): void {
    this.todosService.toggleAll((target as HTMLInputElement).checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}

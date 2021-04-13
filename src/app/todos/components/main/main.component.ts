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
  visibleTodos$: Observable<Todo[]>;

  constructor(private todosService: TodosService) {
    this.visibleTodos$ = combineLatest([
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
  }
}

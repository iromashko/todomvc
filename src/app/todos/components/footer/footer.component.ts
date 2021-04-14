import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  filterEnum = FilterEnum;

  noTodosClass$ = this.todosService.todosSubject.pipe(
    map((todos) => todos.length === 0)
  );

  activeCount$ = this.todosService.todosSubject.pipe(
    map((todos) => {
      return todos.filter((todo) => !todo.isCompleted).length;
    })
  );

  itemsLeftText$ = this.activeCount$.pipe(
    map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
  );

  filter$ = this.todosService.filter$;

  constructor(private todosService: TodosService) {}

  changeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todosService.filterSubject.next(filter);
  }
}

import { Component, Input } from '@angular/core';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  @Input('todo') todoProps: Todo;
}

import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  text = '';

  constructor(private todoService: TodosService) {}

  changeText(target: EventTarget): void {
    this.text = (target as HTMLInputElement).value;
  }

  addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}

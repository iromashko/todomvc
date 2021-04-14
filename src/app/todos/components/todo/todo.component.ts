import { EventEmitter, OnInit } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  @Input('todo') todoProps: Todo;
  @Input('isEditing') isEditingProps: boolean;
  @Output('setEditingId') setEditingIdEvent = new EventEmitter<string | null>();

  editingText = '';

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo(): void {
    //
  }

  toggleTodo(): void {
    //
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.todosService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }

  constructor(private todosService: TodosService) {}
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service'
import { TodoItem } from 'src/app/models/TodoItem';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  
  @Input() todoItem:TodoItem = new TodoItem;
  @Output() deleteTodoItem: EventEmitter<TodoItem> = new EventEmitter();

  constructor(private todoService:TodoService) {}

  ngOnInit(): void {
  }

  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todoItem.completed
    }

    return classes;
  }

  onToggle(todoItem:TodoItem) {
    //Toggle in UI
    todoItem.completed = !todoItem.completed;
    //Toggle on Server
    this.todoService.toggleCompleted(todoItem).subscribe(todo => console.log(todo));
  }

  
  onDelete(todoItem:TodoItem) {
    this.deleteTodoItem.emit(todoItem);
  }

}

import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {TodoItem} from '../../models/TodoItem';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css']
})

export class ToDosComponent implements OnInit {

  todoItems:TodoItem[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todoItems => {
      this.todoItems = todoItems;
    });
  }

  deleteTodoItem(todoItem:TodoItem) {
    //Remove from UI
    this.todoItems = this.todoItems.filter(t => t.id != todoItem.id);
    //Remove from Server
    this.todoService.deleteTodoItem(todoItem).subscribe();
  }

  addTodo(todoItem:TodoItem) {
    this.todoService.addTodo(todoItem).subscribe(todoItem => {
      this.todoItems.push(todoItem);
      console.log(todoItem);
    });
  }
}

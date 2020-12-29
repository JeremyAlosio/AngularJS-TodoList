import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' 
import { TodoItem } from '../models/TodoItem';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosUrlLimit:string = "?_limit=5"


  constructor(private http:HttpClient) { }

  //Get Todos
  getTodos():Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.todosUrl}${this.todosUrlLimit}`);
  }

  //Toggle Completed
  toggleCompleted(todoItem: TodoItem):Observable<any> {
    const url = `${this.todosUrl}/${todoItem.id}`;
    return this.http.put(url, todoItem, httpOptions);
  }
  
  //Add Todo
  addTodo(todoItem:TodoItem):Observable<TodoItem> {
    return this.http.post<TodoItem>(this.todosUrl, todoItem, httpOptions);
  }

  //Delete Todo
  deleteTodoItem(todoItem: TodoItem):Observable<TodoItem> {
    const url = `${this.todosUrl}/${todoItem.id}`;
    return this.http.delete<TodoItem>(url, httpOptions);
  }
}

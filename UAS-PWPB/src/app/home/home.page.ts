import { Component, OnInit } from '@angular/core';
import {TodoService} from '../service/todo.service'
import {Task } from '../model/task'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  tasks:Task[]
  constructor(private todoService : TodoService) {
   
  }
  
  ngOnInit(){
     this.todoService.getTasks().subscribe(
       res=>{
         this.tasks= res
       },
       err=>console.log(err)
     )
  }
  
  removeTask(id:string){
    this.todoService.deleteTask(id);
  }
}

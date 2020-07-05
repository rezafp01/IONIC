import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { Task } from 'src/app/model/task';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.page.html',
  styleUrls: ['./page-details.page.scss'],
})
export class PageDetailsPage implements OnInit {
  todo:Task= {
     nama:'',
     daily:''
  }
  params;
  editing:boolean= false
  constructor(private todoService: TodoService, private router :Router, private activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.params = this.activateRoute.snapshot.params
    if(this.params.id){
      this.editing= true
      this.todoService.getOneTasks(this.params.id).subscribe(
        res=>{
          this.todo=res
        },
        err=>console.log(err)
      )
    }
  }

  addTask(){ 
    this.todoService.addTask(this.todo);
    this.todo ={}
    this.router.navigate(['/home'])
  }
  updateTask(){
    this.todoService.updateTask(this.todo, this.params.id);
    this.router.navigate(['/home'])
    this.editing= false
  }

}

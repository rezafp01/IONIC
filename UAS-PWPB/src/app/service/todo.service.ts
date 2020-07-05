import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators';
import {Task} from '../model/task'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasks:Observable<Task[]>

  constructor(private firestore : AngularFirestore) {
       this.tasks = firestore.collection('tasks').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
       )
   }

   getTasks(){
     return this.tasks;
   }

   addTask(task:Task){
     return this.firestore.collection('tasks').add(task)
   }

   getOneTasks(id:string){
     return this.firestore.doc('tasks/'+id).valueChanges();
   }

   deleteTask(id: string){
      return this.firestore.doc('tasks/'+id).delete();
   }
   
   updateTask(task:Task , id:string){
     return this.firestore.doc('tasks/'+id).update(task)
   }

}

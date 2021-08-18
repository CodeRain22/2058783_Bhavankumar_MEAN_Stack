import { Component , OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskClass } from '../taskComponents';
@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {
  displayedColumns: string[] = ['task-position', 'task-id', 'task-name', 'task-task','task-deadline'];
  count:number=1;
  tasks:Array<TaskClass>=[];
  taskObj?:TaskClass;
  constructor() { }
  ngOnInit(): void {
  }
  addTask(taskRef:NgForm){
    let taskInfo=taskRef.value;    
    this.taskObj={position:this.count++,id:taskInfo.id,name:taskInfo.name,task:taskInfo.taskname,deadLine:taskInfo.deadline};
    this.tasks.push(this.taskObj);
    taskRef.reset()
  }
}



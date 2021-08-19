import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Answers } from '../answer-model';
import { Que } from '../test-model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-portal',
  templateUrl: './test-portal.component.html',
  styleUrls: ['./test-portal.component.css']
})
export class TestPortalComponent implements OnInit {
  allQuestions:Array<Que>=[];
  totalQuestions:number=0;
  rightAnswers:number=0;
  testForm:FormGroup;
  answerStatus:string="";
  resultFlag:boolean=false;
  submitFlag:boolean=false;
  testResult?:number=0;
  resultMessage="";
  i:number=0;
  tempAnswerStatus:Array<string>=[];
  //DI of service.
  constructor(public testService:TestService,public form:FormBuilder) { 

    this.testForm=form.group({
    });
  }
  ngOnInit(): void {
    this.testService.question().subscribe(result=>{
      this.allQuestions=result;
      for(let ll of result){
        this.testForm?.addControl(ll.que,this.form.control(""));
        this.totalQuestions++;
      }
    })
  }
  submit(){
    this.submitFlag=true;
    let obj=this.testForm.value;
    this.testService.answers().subscribe(result=>{
      for(let a of result){
        if(a.answer==obj[a.que]){ 
          this.rightAnswers++;
      
          this.allQuestions[this.i].status="You have selected right answer!"
        }else{
            this.allQuestions[this.i].status="Wrong answer"
        }
        this.i++;
      }
    })
  }
  reviewAndResult(){
    this.testResult=(this.rightAnswers/this.totalQuestions)*100;
    this.resultFlag=true;
   this.testResult=(this.rightAnswers/this.totalQuestions)*100;
   if(this.testResult>=70){
     this.resultMessage="Congratulations! You have passed the exam with "+this.testResult+"%";
   }
   else
   {
     this.resultMessage="Sorry, You have failed the exam, Your score is: "+this.testResult+"%";
   }
  }
}

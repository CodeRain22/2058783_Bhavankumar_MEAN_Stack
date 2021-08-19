import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Que } from './test-model';
import { Answers } from './answer-model';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  // This helps to load the data from the server or the local josn file 
  constructor(public http:HttpClient) { } 
  question():Observable<Que[]>{
    return this.http.get<Que[]>("/assets/question-bank.json")
  }
  answers():Observable<Answers[]>{
    return this.http.get<Answers[]>("/assets/answers.json")
  }
}

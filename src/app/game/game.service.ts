import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../Questions/question';
import { Answer } from '../Answer/answer';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http:HttpClient) { }

  getQuestions(groupName:string){
    return this.http.get<Question[]>(`http://127.0.0.1:5000/questions/${groupName}`)
  }

  getAnswersByQuestion(questionId:number){
    return this.http.get<Answer[]>(`http://127.0.0.1:5000/answer/${questionId}`)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../Questions/question';
import { Answer } from '../Answer/answer';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  token = sessionStorage.getItem('token')
  httpOptions={
    headers:new HttpHeaders({
      'x-access-token': this.token
    })
  }

  constructor(private http:HttpClient) { }

  getQuestions(groupName:string){
    return this.http.get<Question[]>(`http://127.0.0.1:5000/questions/${groupName}`,this.httpOptions)
  }

  getAnswersByQuestion(questionId:number){
    return this.http.get<Answer[]>(`http://127.0.0.1:5000/answer/${questionId}`,this.httpOptions)
  }

  answerQuestion(groupName:string,publicId:string,questionId:number,userAnswer:number){
    const requestBody={
      public_id:publicId,
      question_id:questionId,
      user_answer:userAnswer
    }
    return this.http.post(`http://127.0.0.1:5000/game/${groupName}`,requestBody,this.httpOptions)
  }
}

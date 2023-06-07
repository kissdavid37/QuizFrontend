import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Question } from '../Questions/question';
import { HttpErrorResponse } from '@angular/common/http';
import { Answer } from '../Answer/answer';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit,OnDestroy {
  questions:Question[]=[];
  answers:Answer[]=[];
  currentQuestion:Question={id:0,groupId:0,text:'Loading'};
  iteration:number=0;
  isLoading:Boolean=false;
  isError:Boolean=false;
  errorMessage:string=null;
  interval;
  start=100;

  constructor(private gameService:GameService, private route:ActivatedRoute,private router:Router) {
    this.onGetQuestionsByGroup(this.route.snapshot.params.groupName);
  }

  ngOnInit(): void {
  }

   onGetQuestionsByGroup(groupName:string){
     this.gameService.getQuestions(groupName).subscribe({
       next: (question)=>{
          this.isLoading=true;
          this.questions = question;
          this.currentQuestion = this.questions[this.iteration];
          this.onGetAnswersByQuestion(this.currentQuestion['question_id']);
          this.isLoading=false;
      },
      error:(e:HttpErrorResponse)=>{
        this.isLoading=false;
        console.log(e.error);
        this.isError=true;
        this.errorMessage=e.message;
        clearInterval(this.interval);
      }
    })
  }

  onGetAnswersByQuestion(questionId:number){
    this.isLoading=true;
     this.gameService.getAnswersByQuestion(questionId).subscribe({
      next: (answer)=>{
        this.answers=[];
        this.answers=answer;
        this.isLoading=false;
        console.log(this.answers);
        this.timer();

      },
      error: (e:HttpErrorResponse)=>{
        console.log(e.error);
        this.isLoading=false;
        this.isError=true;
        this.errorMessage=e.error;
      }
    })
  }

  onAnswerQuestion(userAnswer:number){
    const groupname=this.route.snapshot.params.groupName;
    const publicId=sessionStorage.getItem('public_id');
    let questionId=this.currentQuestion['question_id']
    this.gameService.answerQuestion(groupname,publicId,questionId,userAnswer).subscribe({
      next:(answer)=>{
        console.log(answer);
        this.iterate();
        clearInterval(this.interval);
        this.start=100;
      },
      error: (e:HttpErrorResponse)=>{
        console.log(e.error);
        this.isLoading=false;
        this.isError=true;
        this.errorMessage=e.error;
        clearInterval(this.interval);
      }

    })
  }

  iterate(){
    const length= this.questions.length
    console.log(this.iteration);
    if(this.iteration<length){
      this.iteration++;
      this.currentQuestion=this.questions.at(this.iteration);
      this.currentQuestion = this.questions.at(this.iteration);
      this.onGetAnswersByQuestion(this.currentQuestion['question_id']);
    }
    else{
      this.router.navigate([`${this.route.snapshot.url}/stats`])
    }
  }

  timer(){
    this.interval=setInterval(()=>{
      if(this.start>0){
        this.start=this.start-10;
      }
      else{
        clearInterval(this.interval);
        this.start=100;
        this.iterate();
      }
    },1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}

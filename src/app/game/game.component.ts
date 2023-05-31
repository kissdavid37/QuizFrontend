import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Question } from '../Questions/question';
import { HttpErrorResponse } from '@angular/common/http';
import { Answer } from '../Answer/answer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  questions:Question[]=[];
  answers:Answer[]=[];
  currentQuestion:Question={id:0,groupId:0,text:'Loading'};
  iteration:number=0;
  isLoading:Boolean=false;

  constructor(private gameService:GameService) {
    this.onGetQuestionsByGroup(localStorage.getItem('groupName'));

  }

  ngOnInit(): void {
  }

   onGetQuestionsByGroup(groupName:string){
     this.gameService.getQuestions(groupName).subscribe({
       next: (question)=>{
          this.isLoading=true;
          this.questions = question;
          this.currentQuestion = this.questions[this.iteration];
          console.log(this.currentQuestion);
          console.log(this.currentQuestion['question_id']);
          this.onGetAnswersByQuestion(this.currentQuestion['question_id']);
          this.isLoading=false;
      },
      error:(e:HttpErrorResponse)=>{
        this.isLoading=false;
        console.log(e.error);
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

      },
      error: (e:HttpErrorResponse)=>{
        console.log(e.error);
        this.isLoading=false;
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
  }

}

import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { GroupService } from './group/group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
groupID:string="";
isGenerated:boolean=false;
isCopied:boolean=false;
errorMessage:string="";
isError:boolean=true;
joinInput:string="";
username:string

constructor(private clipboardService:ClipboardService, private groupService:GroupService,private router:Router) {
  this.username=localStorage.getItem('username')
}


onCreateGroup(){
  this.groupID= Math.floor(Math.random() * Date.now()).toString(36)
  this.groupService.createGroup(this.groupID).subscribe({
    next: ()=>{
      this.isGenerated=true;
    },
    error: (e:HttpErrorResponse)=>{
      console.log(e)
    }
  })

}

onCopyToClipboard(){
  if(this.groupID!==""){
    this.clipboardService.copy(this.groupID)
    this.isCopied=true;
  }
}

onJoinGroup(){
  this.groupService.joinGroup(this.joinInput).subscribe({
    next: ()=>{
      console.log(this.joinInput);
      this.isError=false;
      this.router.navigate([`/game/${this.joinInput}`]);
    },
    error:(e:HttpErrorResponse)=>{
      this.errorMessage=e.error
      this.isError=true;
    }
  })
}

onSingleGame(){
  this.onCreateGroup();
  this.router.navigate([`/game/${this.joinInput}`]);
}
}

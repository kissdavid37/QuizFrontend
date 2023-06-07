import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  signupForm:FormGroup;
  error:boolean=false;
  errorMessage:string=null;
  isLoginMode: boolean = true;

  constructor(private authService:AuthService,private router:Router) {


  }

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      'username': new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'confirmPassword':new FormControl(null)
    })
  }

  onSubmit(username: string, password: string, confirmPassword: string){
    let authObservable:Observable<any>
    if(this.isLoginMode){
      authObservable= this.authService.login(username, password);
    }
    else{
      authObservable = this.authService.register(username,password,confirmPassword);
    }

    authObservable.subscribe({
      next:(res)=>{
        if(this.isLoginMode)
        {
          sessionStorage.setItem('token',res['token']);
          sessionStorage.setItem('username',username);
          sessionStorage.setItem('public_id',res['public_id'])
          this.router.navigate(['/home']);
        }
      },
      error:(e:HttpErrorResponse)=>{
        console.log(e);
        this.error=true;
        this.errorMessage=e.error;
      }
    })
  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.signupForm.reset();
    this.error=false;
    if (this.isLoginMode) {
      this.removeRequiredValidator('confirmPassword');
    }
    else {
      this.setRequiredValidators('confirmPassword')
    }
  }

  setRequiredValidators(controlName: string) {
    const formControl = this.signupForm.get(controlName);
    const validators = Validators.required;
    formControl.setValidators(validators)
    formControl.updateValueAndValidity();
  }

  removeRequiredValidator(controlName: string) {
    const formControl = this.signupForm.get(controlName);
    formControl.clearValidators();
    formControl.updateValueAndValidity();
  }

}

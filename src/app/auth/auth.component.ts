import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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


  ngOnInit(): void {
    this.signupForm=new FormGroup({
      'username': new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'confirmPassword':new FormControl(null)
    })
  }

  onSubmit(){

  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.signupForm.reset();
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

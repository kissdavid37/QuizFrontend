import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router:Router) { }

  login(username:string,password:string){
    const requestBody={
      username:username,
      password:password
    }
   return this.http.post('http://127.0.0.1:5000/login',requestBody);
  }

  register(username:string,password:string,confirmPassword:string){
    const requestBody={
      username:username,
      password:password,
      confirm:confirmPassword
    }
   return this.http.post('http://127.0.0.1:5000/register',requestBody);
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}

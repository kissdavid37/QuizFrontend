import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  token = sessionStorage.getItem('token')
  httpOptions={
    headers:new HttpHeaders({
      'x-access-token': this.token
    })
  }
  constructor(private http:HttpClient) { }

  createGroup(groupName:string){
   const requestBody={
    name:groupName
   }
    return this.http.post('http://127.0.0.1:5000/group',requestBody,this.httpOptions)
  }

  joinGroup(groupName:string){
    const requestBody={
      public_id:sessionStorage.getItem('public_id'),
    }
    return this.http.post(`http://127.0.0.1:5000/group/${groupName}`,requestBody,this.httpOptions)
  }
}

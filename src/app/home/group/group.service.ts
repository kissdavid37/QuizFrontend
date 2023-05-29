import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) { }

  createGroup(groupName:string){
   const requestBody={
    name:groupName
   }
    return this.http.post('http://127.0.0.1:5000/group',requestBody)
  }

  joinGroup(groupName:string){
    const requestBody={
      user_id:localStorage.getItem('current_user'),
    }
    return this.http.post(`http://127.0.0.1:5000/group/${groupName}`,requestBody)
  }
}

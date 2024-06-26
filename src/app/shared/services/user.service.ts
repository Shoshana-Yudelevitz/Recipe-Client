import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http =inject(HttpClient)
  private usersUrl=`${environment.apiURL}/users`;


  current?:User 
  userName: string |undefined;
 
  public get token():string|null{
    
    return localStorage.getItem('mytoken')
  }
  public set token(token: string | null) {
    if (token) {
      localStorage.setItem('mytoken', token);
    } 
    else {
      localStorage.removeItem('mytoken');
    }
  }
  
  getAllUsers(){
    return this.http.get<User[]>(this.usersUrl)
  }
  logout() {
    localStorage.clear();
    window.location.reload();  
  }
  signIn(u: User){  
    return this.http.post<{user:User;token:string}>(`${this.usersUrl}/signIn`,u)
  }

  signUp(u: User){
    return this.http.post<{user:User;token:string}>(`${this.usersUrl}/signUp`,u)
  }
}

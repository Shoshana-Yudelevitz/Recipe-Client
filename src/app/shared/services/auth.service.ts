import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
user: any = {}
  private baseUrl='http://localhost:5000/'
  constructor(private http:HttpClient) { }
  isRecipeOwner(token: string | null, creatorId: string | number | undefined): Observable<boolean> {
    if (!token || !creatorId) {  // אם אחד מהערכים הוא null או undefined, החזר false
      
    }
  console.log(creatorId,"creatorId היי");
  console.log(token,"token היי");
    return this.http.post<boolean>(`${this.baseUrl}recipes`, { token, creatorId }).pipe(

      map((response: boolean) => {
        console.log(response, "sss"); 
        return response; 
      }),
      
    );
  }
  public isLoggedIn(): boolean {
    return !!localStorage.getItem('mytoken');
  }
}

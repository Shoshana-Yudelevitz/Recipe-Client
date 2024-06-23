import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';
import { log } from 'console';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl='http://localhost:5000/recipes'
  constructor(private http:HttpClient,private userService:UserService) { }


  public get token(): string | null {
    if(localStorage)
    return localStorage.getItem('mytoken');
    return null;
  }

  
  // getAllRecipe(page: number = 1, perPage: number = 10,search=''): Observable<Recipe[]> {
  //   const url = `${this.baseUrl}?page=${page}&perPage=${perPage}&search=${search}`;
  //   return this.http.get<Recipe[]>(url);
  // }
  getAllRecipe(page: number = 1, perPage: number = 10, search: string = '', isFilter: boolean = false): Observable<Recipe[]> {
    const url = `${this.baseUrl}?page=${page}&perPage=${perPage}&search=${search}&isFilter=${isFilter}`;
    return this.http.get<Recipe[]>(url);
  }
  getDetailsById(id:number|undefined){
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }
  
  addRecipe(r: Recipe){
      const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.post<Recipe>(`${this.baseUrl}/addRecipe`,r,httpOptions);
  }
  updateRecipe(id: number){
    // return this.http.put<Recipe>(`${this.baseUrl}/${id}`);
  }
  deleteRecipe(id:number|string|undefined){
    console.log(id,"deleteRecipe");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.delete<Recipe>(`${this.baseUrl}/${id}`,httpOptions);
  }

  getDetailsByTime(time:number){
    return this.http.get<Recipe[]>(`${this.baseUrl}/getDetailsByTime/${time}`);
  }

  getDetailsByUser(id: number){
    console.log("fff");
    return this.http.get<Recipe[]>(`${this.baseUrl}/getDetailsByUser/${id}`);
  }
  
  
}

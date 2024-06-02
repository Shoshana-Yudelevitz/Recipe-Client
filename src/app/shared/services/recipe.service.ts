import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl='http://localhost:5000/recipes'
  constructor(private http:HttpClient) { }


  public get token(): string | null {
    return localStorage.getItem('myToken');
  }

  getAllRecipe(page: number = 1, perPage: number = 20): Observable<Recipe[]> {
    const url = `${this.baseUrl}?page=${page}&perPage=${perPage}`;
    return this.http.get<Recipe[]>(url);
  }
  getDetailsById(id:number){
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }
  addRecipe(r: Recipe){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': `Bearer ${this.token}`
    //   })
    // };
    // console.log(httpOptions,"httpOptions");

    return this.http.post<Recipe>(`${this.baseUrl}/addRecipe`,r);
  }
  updateRecipe(id: number){
    // return this.http.put<Recipe>(`${this.baseUrl}/${id}`);
  }
  deleteRecipe(id:number){
    return this.http.delete<Recipe>(`${this.baseUrl}/${id}`);
  }
  getDetailsByTime(time:number){
    return this.http.get<Recipe[]>(`${this.baseUrl}/getDetailsByTime/${time}`);
  }
  getDetailsByUser(u: number){
    return this.http.get<Recipe[]>(`${this.baseUrl}/getDetailsByUser/${u}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl='http://localhost:5000/recipes'
  constructor(private http:HttpClient) { }

  getAllRecipe(){
    return this.http.get<Recipe[]>(this.baseUrl)
  }
  getDetailsById(id:number){
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }
  addRecipe(r: Recipe){
    return this.http.post<Recipe>(`${this.baseUrl}/addRecipe`,r);
  }
  updateRecipe(id: number){
    // return this.http.put<Recipe>(`${this.baseUrl}/${id}`);
  }
  deleteRecipe(id:number){
    return this.http.delete<Recipe>(`${this.baseUrl}/${id}`);
  }
  getDetailsByTime(time:Date){
    return this.http.get<Recipe[]>(`${this.baseUrl}/getDetailsByTime/${time}`);
  }
  getDetailsByUser(u: number){
    return this.http.get<Recipe[]>(`${this.baseUrl}/getDetailsByUser/${u}`);
  }
}

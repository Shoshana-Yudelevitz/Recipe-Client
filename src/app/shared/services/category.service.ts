import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 private baseUrl='http://localhost:5000/categories'
  constructor(private http:HttpClient) { }

  getAllCategory(){
    return this.http.get<Category[]>(this.baseUrl);
  }
  getAllCategoryByRecipes(descripition:string){
    return this.http.get<Category[]>(`${this.baseUrl}/getAllCategoryByRecipes/${descripition}`);  
  }
  getCategoryById(id:number){
    return this.http.get<Category[]>(`${this.baseUrl}/getCategoryById/${id}`);  
  }
}

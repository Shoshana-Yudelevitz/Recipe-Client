import { Component, Input, inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { RecipeService } from '../../shared/services/recipe.service';
import { Router } from '@angular/router';
import { OneRecipeComponent } from '../one-recipe/one-recipe.component';
import { FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Recipe } from '../../shared/models/recipe';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-all-recipe',
  standalone: true,
  imports: [MatPaginatorModule,OneRecipeComponent,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './all-recipe.component.html',
  styleUrl: './all-recipe.component.scss'
})
export class AllRecipeComponent {
  private recipeService=inject(RecipeService)
  private categoryService=inject(CategoryService)
  currentPage: number = 1; // הוספת משתנה זה
  pageSize: number = 5;
  constructor(private server: RecipeService ,private router:Router ) {}
  @Input()
  list: any[] = [];
  category: Category[] = [];
  recipesOfCategory: any[] = [];
  recipeOfLevel:any[]=[];
  ngOnInit(): void {

    this.recipeService.getAllRecipe().subscribe((data) => {
    this.list = data as any[];
    console.log(data,"כל העוגות");
    });
    // this.categoryService.getAllCategory().subscribe((data) => {
    // this.category = data as any[];
    // console.log(data,"מתכונים ");
    // });
    this.getRecipes(this.currentPage, this.pageSize);
    this.categoryService.getAllCategory().subscribe((data) => {
      this.category = data as any[];
      console.log(data, "מתכונים ");
    });
 
}
getRecipes(page: number, pageSize: number): void {
  this.recipeService.getAllRecipe(page, pageSize).subscribe((data) => {
    this.list = data;
    console.log(data, "כל העוגות");
  });
}
findAll() {

  this.recipeService.getAllRecipe().subscribe((data) => {
    this.list = data as any[];
    console.log(data,"כל העוגות");
    });
}

findLevel(level: number) {
  console.log(level, "level");
  this.recipeService.getAllRecipe().subscribe((data) => {
    this.list = data.filter((recipe) => recipe.level === level);
    console.log(this.list, "כל המתכונים ברמה", level);
  });
}
findByTime(time:number){
  console.log(time, "time");
  this.recipeService.getDetailsByTime(time).subscribe((data) => {
    this.list = data as any[];
    console.log(this.list, "כל המתכונים ברמה", )
    return this.list
  }); 
}

 getStringValue(value: any): string {
  if (typeof value === 'string') {
    return value;
  } else {
    return value.toString(); 
  }
}

findCategory(descripition: string) {
  this.categoryService.getAllCategoryByRecipes(descripition).subscribe((data) => {
    this.list=data.recipes as any?? []
  console.log(data,"description");
  return this.list
  })
}

onPageChange(event: any): void {
  this.currentPage = event.pageIndex + 1; // הוספת 1 מכיוון ש־MatPaginator מתחיל ממספר 0
  this.getRecipes(this.currentPage, this.pageSize);
}}

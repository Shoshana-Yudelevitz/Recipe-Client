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

@Component({
  selector: 'app-all-recipe',
  standalone: true,
  imports: [OneRecipeComponent,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './all-recipe.component.html',
  styleUrl: './all-recipe.component.scss'
})
export class AllRecipeComponent {
  private recipeService=inject(RecipeService)
  private categoryService=inject(CategoryService)
  constructor(private server: RecipeService ,private router:Router ) {}
  @Input()
  list: any[] = [];
  category: Category[] = [];

  ngOnInit(): void {

    this.recipeService.getAllRecipe().subscribe((data) => {
    this.list = data as any[];
    console.log(data,"כל העוגות");
    });
    this.categoryService.getAllCategory().subscribe((data) => {
    this.category = data as any[];
    console.log(data,"מתכונים ");
    });
    
}

findCategory(descripition:string| undefined){
    this.categoryService.getAllCategoryByRecipes(descripition).subscribe((data) => {
    this.category = data as any[];
    console.log(data,"מתכונים ");
    });
}


}

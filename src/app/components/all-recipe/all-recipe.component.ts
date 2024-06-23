import { Component, Input, inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { RecipeService } from '../../shared/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OneRecipeComponent } from '../one-recipe/one-recipe.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Recipe } from '../../shared/models/recipe';
import { OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Token } from '@angular/compiler';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-all-recipe',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule, OneRecipeComponent, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './all-recipe.component.html',
  styleUrl: './all-recipe.component.scss'
})
export class AllRecipeComponent {
  private recipeService = inject(RecipeService)
  private categoryService = inject(CategoryService)
  currentPage: number = 1; // הוספת משתנה זה
  pageSize: number = 10;
  constructor(private server: RecipeService, private router: Router, private auth: AuthService, private userService: UserService, private route: ActivatedRoute) { }
  @Input()
  user: any = {}
  list: any[] = [];
  list2: any[] = [];
  category: Category[] = [];
  recipesOfCategory: any[] = [];
  recipeOfLevel: any[] = [];
  myRecipes: Recipe[] = [];
  isMyRecipes: boolean = false;
  selectedCategory: string | null = null;
  selectedTime: number | null = null;
  selectedLevel: number | null = null;
  itsMy: boolean = false;

  ngOnInit(): void {
  
    // זיהוי מהיכן הגיע המשתמש (מ-Case 3 או Case 5)
    this.route.queryParams.subscribe(params => {
      this.isMyRecipes = params['myRecipes'] === 'true';
      this.itsMy=true
    });

    this.recipeService.getAllRecipe(1, 1000000, '', true).subscribe((data) => {
      this.list2 = data as any[];
      const isOwnerObservables = this.list2.map((recipe) => {
      const recipeUser = recipe.userRecipe;
        if (recipeUser) {
          console.log(recipeUser, "recipeUser");

          return this.auth.isRecipeOwner(this.userService.token, recipeUser[0]._id)
            .pipe(map(isOwner => ({ recipe, isOwner })));
        } else {
          return of({ recipe, isOwner: false });
        }
      });

      forkJoin(isOwnerObservables).subscribe(results => {
        this.myRecipes = results.filter(result => result.isOwner).map(result => result.recipe);
        console.log(this.myRecipes, "myRecipes");
      });

    });

    this.getRecipes(this.currentPage, this.pageSize);
    this.categoryService.getAllCategory().subscribe((data) => {
      this.category = data as any[];
      console.log(data, "מתכונים ");
    });
  }
  getRecipes(page: number, pageSize: number): void {
    this.itsMy=false
    this.recipeService.getAllRecipe(page, pageSize).subscribe((data) => {
      this.list = data;
      console.log(data, "כל העוגות");
    });

  }
  findAll() {
    this.itsMy=false
    this.recipeService.getAllRecipe().subscribe((data) => {
      this.list = data as any[];
      console.log(data, "כל העוגות");
    });
  }

  getStringValue(value: any): string {
    if (typeof value === 'string') {
      return value;
    } else {
      return value.toString();
    }
  }
   onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1; // הוספת 1 מכיוון ש־MatPaginator מתחיל ממספר 0
    this.getRecipes(this.currentPage, this.pageSize);
  }

  trackByRecipe(index: number, recipe: Recipe): string|number {
    return recipe._id ? recipe._id : `${index}`;
  }
  findCategory(description: string | null): void {
    this.selectedCategory = description;
    this.applyFilters();
    
  }
  
  findByTime(time: number | null): void {
    this.selectedTime = time;
    this.applyFilters();
  }
  
  findLevel(level: number | null): void {
    this.selectedLevel = level;
    this.applyFilters();
  }
  
  applyFilters(): void {
    this.itsMy=true
    this.recipeService.getAllRecipe(1, 1000000, '', true).subscribe((data) => {
      this.list = data.filter(recipe => {
        const matchesCategory = this.selectedCategory ? recipe.categories?.some(category => category.categoryName === this.selectedCategory) : true;
        const matchesTime = this.selectedTime ? recipe.time && recipe.time <= this.selectedTime : true;
        const matchesLevel = this.selectedLevel ? recipe.level === this.selectedLevel : true;
        return matchesCategory && matchesTime && matchesLevel;
      });
    });
  }
}

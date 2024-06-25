
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { RecipeService } from '../../shared/services/recipe.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatCheckboxModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    
  ],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  errorMessage = '';
  hide = true;
  categoryArr: any[] = [];

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  private categoryService = inject(CategoryService);
  private recipeService = inject(RecipeService);
  private snackBar = inject(MatSnackBar);

  category: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((data) => {
      this.category = data as any[];
      console.log(data, "מתכונים ");
    });
  }

  recipeForm: FormGroup;

  constructor(private fb: FormBuilder ,private router:Router ) {
    this.recipeForm = fb.group({
      recipeName: fb.control('', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern('^[a-zA-Zא-ת\\s,\\.\\-\\n]*$')]),
      descripition: fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('^[a-zA-Zא-ת\\s,\\.\\-\\n]*$')]),
      categories: fb.control(''),
      newCategories: fb.control('',[Validators.pattern('^[a-zA-Zא-ת\\s,\\.\\-\\n]*$'),Validators.minLength(2), Validators.maxLength(10), ]),
      time: fb.control('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      level: fb.control(0, Validators.required),
      layers: fb.array([]),
      instructions: fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(1000), Validators.pattern('^[a-zA-Zא-ת\\s,\\.\\-\\n]*$')]),
      image: fb.control('', Validators.required),
      isPrivate: fb.control('', Validators.required)
    });
    this.addLayer();
  }

  get layers(): FormArray {
    return this.recipeForm.controls['layers'] as FormArray;
  }

  getIngredients(layerIndex: number): FormArray {
    return (this.layers.at(layerIndex) as FormGroup).controls['ingredients'] as FormArray;
  }

  addLayer() {
    console.log("addLayer");
    this.layers.push(
      this.fb.group({
        descripitionOfLayer: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(70), Validators.pattern("^[a-zA-Zא-ת\\s]+$")]),
        ingredients: this.fb.array([
          this.fb.control('',[Validators.required, Validators.pattern("^[a-zA-Zא-ת0-9\\s,.'\\-]+$")] ),
        ]),
      })
    );
  }

  addingredient(layerIndex: number) {
    const ingredients = this.getIngredients(layerIndex);
    if (ingredients.at(ingredients.length - 1).value !== '') {
      ingredients.push(this.fb.control(''));
    }
  }

  addRecipe() {
    this.recipeForm.value.layers.forEach((layer: any) => {
      const ingredients = layer.ingredients;

      for (let i = ingredients.length - 1; i >= 0; i--) {
        if (ingredients[i] === '') {
          ingredients.splice(i, 1);
        }
      }
    });

    if (this.recipeForm.value.newCategories && this.recipeForm.value.categories) {
      console.log("// אם קיימים גם קטגוריות חדשות וגם קטגוריות קיימות בטופס");
      
      this.recipeForm.value.categories.push(this.recipeForm.value.newCategories);
    } else {

      if (!this.recipeForm.value.categories) {
        console.log(" אם אין קטגוריות קיימות בטופס");
        this.recipeForm.value.categories = [this.recipeForm.value.newCategories];
      }
    }

    this.recipeForm.value.categories.forEach((item: any) => {
     
      
      let obj = { categoryName: item };
      this.categoryArr.push(obj);
    });

    this.recipeForm.value.categories = this.categoryArr;
    console.log(this.recipeForm.value, "this.recipeForm.value");

    this.recipeService.addRecipe({
      recipeName: this.recipeForm.value.recipeName,
      descripition: this.recipeForm.value.descripition,
      categories: this.recipeForm.value.categories,
      time: this.recipeForm.value.time,
      level: this.recipeForm.value.level,
      layers: this.recipeForm.value.layers,
      instructions: this.recipeForm.value.instructions,
      image: this.recipeForm.value.image,
      isPrivate: this.recipeForm.value.isPrivate || false,
      dateAdd: new Date(),
    }).subscribe({
      next: (data) => {
        console.log(data);
        this.openSnackBar('!המתכון הוסף בהצלחה', 'סגור');
        this.router.navigate(['/all-recipe']);
      },
      error: (err) => {
        console.error('error', err);
        this.errorMessage = 'המתכון שגוי ';
        this.openSnackBar('לא הקשת את כל הפרטים או שאחד מהנתונים שגוי', 'סגור');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000, 
    });
  }
}


import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import {MatDividerModule} from '@angular/material/divider';
import { from } from 'rxjs';
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,MatCheckboxModule,FormsModule, MatFormFieldModule, MatInputModule,CommonModule,MatFormFieldModule, MatSelectModule, MatInputModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule,MatFormFieldModule, MatInputModule,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {
  errorMessage = '';
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  private categoryService=inject(CategoryService)
  private recipeService=inject(RecipeService)
  category: Category[] = [];
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((data) => {
    this.category = data as any[];
    console.log(data,"מתכונים ");
    });
}
recipeForm:FormGroup;
constructor(private fb:FormBuilder){
  this.recipeForm=fb.group({
    recipeName:fb.control('', [Validators.required,Validators.max(20),Validators.min(3),Validators.pattern('^[a-zA-Zא-ת]*$')]),
    descripition:fb.control('', [Validators.required,Validators.min(5),Validators.max(100),Validators.pattern('^[a-zA-Zא-ת]*$')]),
    categories:fb.array([]),
    time:fb.control('', [Validators.required,Validators.pattern('^[0-9]*$')]),
    level:fb.control(0,Validators.required),
    layers:fb.array([
          fb.group({
            descripitionOfLayer:fb.control('',[Validators.pattern('^[a-zA-Zא-ת]*$')]),
            ingredients:fb.array([])
          })]
        ),
  instructions:fb.control('', [Validators.required,Validators.min(10),Validators.max(20),Validators.pattern('^[a-zA-Zא-ת]*$')]),
  image:fb.control('',Validators.required),
  isPrivate:fb.control('',Validators.required)
 
})
}

addRecipe(){
  
    this.recipeService.addRecipe({recipeName:this.recipeForm.value.recipeName,
    descripition:this.recipeForm.value.descripition,
    // categories:this.recipeForm.value.categories,
    categories:[{categoryName:"dgfdgd"}],
    time:this.recipeForm.value.time,
    level:this.recipeForm.value.level,
    // layers:this.recipeForm.value.layers,
    layers:[{ descripitionOfLayer: "Layer 1", ingredients: ["Ingredient 1"] }],
    instructions:this.recipeForm.value.instructions,
    image:this.recipeForm.value.image,
    isPrivate:this.recipeForm.value.isPrivate,
    dateAdd:new Date(),
    userRecipe:{UserName: 'chana'} ,
  }).subscribe({
    next:(data)=>{
      console.log(data);
    },
    error:(err)=>{
      console.error('error', err);
      this.errorMessage = 'המתכון שגוי ';
    }
  })
}

}


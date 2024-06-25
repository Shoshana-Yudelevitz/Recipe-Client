
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  recipes: any[] = []; 
  visibleRecipes: any[] = [];
  currentIndex = 0; 
  itemsPerSlide = 3; 
  itemWidth = 0; 
  totalWidth = 100;

  ngOnInit(): void {
   
    this.recipes = [
      {
        name: 'גלידת תות',

        imageUrl: 'https://www.bondigo.co.il/mah/35202020-67-%D7%AA%D7%95%D7%AA.jpg',
      },
      {
        name: 'זלביה',
       
        imageUrl: 'https://passi.co.il/wp-content/uploads/2022/12/%D7%96%D7%9C%D7%91%D7%99%D7%94-%D7%AA%D7%99%D7%9E%D7%A0%D7%99%D7%AA-%D7%9E%D7%AA%D7%9B%D7%95%D7%9F.jpg',
      },
      {
        name: 'לחם שום',
       
        imageUrl: 'https://thecooker.co.il/wp-content/uploads/elementor/thumbs/garlic-bread-qkt6f9riomamrv5w66xnesc8ogg4issnyx4qyp3j4s.webp',
      },
      {
        name: 'פירה אבודקו',
        
        imageUrl: 'https://touchfood.co.il/wp-content/uploads/2019/08/9-4.jpg',
      },
      {
        name: 'עוגת לוטוס',
       
        imageUrl: 'https://cdna.wobily.com/images/035abb7f-4078-4831-80a9-8a51f20064dc_500.jpg',
      },
      {
        name: 'פאי שוקולד',
       
        imageUrl: 'http://oogio.net/wp-content/uploads/2015/05/cheese_tart_03.jpg',
      },
    ];
   
   
    this.itemWidth = 100 / this.itemsPerSlide;

   
    this.updateVisibleRecipes();
  }

  moveCarousel(direction: number): void {
    const totalItems = this.recipes.length;
    const newIndex = this.currentIndex + direction * this.itemsPerSlide;

    
    if (newIndex >= 0 && newIndex <= totalItems - this.itemsPerSlide) {
      this.currentIndex = newIndex;
      console.log('New index:', this.currentIndex); 

      this.updateVisibleRecipes(); 
    } else if (newIndex < 0) {
      this.currentIndex = totalItems - this.itemsPerSlide;
      console.log('New index:', this.currentIndex);

      this.updateVisibleRecipes(); 
    } else {
      this.currentIndex = 0;
      console.log('New index:', this.currentIndex); 

      this.updateVisibleRecipes(); 
    }
  }

  updateVisibleRecipes(): void {
    this.visibleRecipes = this.recipes.slice(this.currentIndex, this.currentIndex + this.itemsPerSlide);
    console.log('Visible recipes:', this.visibleRecipes); }
}

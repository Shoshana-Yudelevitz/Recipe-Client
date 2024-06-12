import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDatilesComponent } from './recipe-datiles.component';

describe('RecipeDatilesComponent', () => {
  let component: RecipeDatilesComponent;
  let fixture: ComponentFixture<RecipeDatilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDatilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeDatilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

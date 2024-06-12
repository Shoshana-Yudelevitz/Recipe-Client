import { Directive, Input, Renderer2, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStarDirective]',
  standalone: true
})
export class StarDirectiveDirective implements OnChanges {
  @Input() appStarDirective: number | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appStarDirective']) {
      this.updateStars();
    }
  }

  private updateStars(): void {
    if (this.appStarDirective == null) {
      return;
    }

    // Clear existing stars
    this.el.nativeElement.innerHTML = '';

    // Add new stars
    for (let i = 0; i < this.appStarDirective; i++) {
      const star = this.renderer.createElement('mat-icon');
      this.renderer.addClass(star, 'material-icons'); // Add class for Material Icons
      this.renderer.appendChild(star, this.renderer.createText('star')); // Use 'star' icon
      this.renderer.appendChild(this.el.nativeElement, star);
    }
  }
}

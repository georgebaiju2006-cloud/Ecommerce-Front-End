import { Component } from '@angular/core';

@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css']
})
export class CategoryGridComponent {

  categories = [
    'Laptops',
    'Mobile Phones',
    'Gaming',
    'Audio',
    'Accessories',
    'Smart Watches'
  ];

}
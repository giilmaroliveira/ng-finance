import { Category } from './../shared/category.model';
import { Component, OnInit } from '@angular/core';

import { CategoryService } from './../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categories: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response as Category[];
    }, error => console.log('error => ', error))
  }

}

import { Category } from './../shared/category.model';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { CategoryService } from './../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService) { }

  categories: Category[] = [];

  ngOnInit(): void {
    this.getAll();
  }

  remove(category: Category) {
    this.categoryService.delete(category.id as number).subscribe(response => {
      this.toastr.success('Categoria excluída com sucesso');
      this.getAll();
    }, error => console.log('error => ', error))
  }

  getAll() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response as Category[];
    }, error => console.log('error => ', error))
  }

}

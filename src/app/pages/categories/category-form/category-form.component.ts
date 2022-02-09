import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Category } from '../shared/category.model';

import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  category: Category = new Category();
  categoryId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.categoryId = +id;
      this.loadCategory();
    }

    this.buildCategoryForm();
  }

  submitForm() {
    const category: Category = Object.assign(
      new Category(),
      this.categoryForm.value
    );

    if (this.categoryId === undefined) {
      this.create(category);
    } else {
      this.update(category);
    }
  }

  // Private Methods
  private buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null],
    });
  }

  private create(category: Category) {
    this.categoryService.create(category).subscribe(
      (response) => {
        this.toastr.success('Categoria incluída com sucesso');
        this.router.navigate(['/categories']);
      },
      (error) => console.log('error => ', error)
    );
  }

  private update(category: Category) {
    this.categoryService.update(category).subscribe(
      (response) => {
        this.toastr.success('Categoria editada com sucesso');
        this.router.navigate(['/categories']);
      },
      (error) => console.log('error => ', error)
    );
  }

  private loadCategory() {
    this.categoryService.getById(this.categoryId as number).subscribe(
      (response) => {
        this.category = response as Category;
        this.categoryForm.patchValue(this.category);
      },
      (error) => console.log('error => ', error)
    );
  }
}

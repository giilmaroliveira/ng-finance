import { Component, OnInit, AfterContentChecked } from '@angular/core';
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
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  categoryForm!: FormGroup;
  category: Category = new Category();
  categoryId?: number;
  pageTitle: string = '';

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

  ngAfterContentChecked(): void {
    this.setPageTitle();
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
        this.category = response;
        this.categoryForm.patchValue(this.category);
      },
      (error) => console.log('error => ', error)
    );
  }

  private setPageTitle(): void {
    if (this.categoryId === undefined) {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      const name = this.category.name || '';
      this.pageTitle = `Editando categoria: ${name}`;
    }
  }
}

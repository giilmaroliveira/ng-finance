import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  urlApi = 'api/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get(this.urlApi)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategories)
    );
  }

  getById(id: number): Observable<Category> {
    const url = `${this.urlApi}/${id}`; // api/categorias/1
    return this.http
      .get(url)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategory)
      );
  }

  create(category: Category): Observable<Category> {
    return this.http
      .post(this.urlApi, category)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategory)
    );
  }

  update(category: Category): Observable<Category> {
    const url = `${this.urlApi}/${category.id}`;
    return this.http
      .put(url, category)
      .pipe(
        catchError(this.handleError),
        map(() => category)
      );
  }

  delete(id: number): Observable<any> {
    const url = `${this.urlApi}/${id}`;
    return this.http
      .delete(url)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategory)
      );
  }

  // private methods
  private handleError(error: any): Observable<any> {
    console.log('Http Request Error => ', error);
    return throwError(() => new Error(error));
  }

  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach((element) => {
      categories.push(element as Category);
    });
    return categories;
  }

  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }
}

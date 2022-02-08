import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  urlApi = 'api/categories';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.urlApi);
  }

  getById(id: number) {
    const url = `${this.urlApi}/${id}`; // api/categorias/1
    return this.http.get(url);
  }

  create(category: Category) {
    return this.http.post(this.urlApi, category);
  }

  update(category: Category) {
    const url = `${this.urlApi}/${category.id}`;
    return this.http.put(url, category);
  }

  delete(id: number) {
    const url = `${this.urlApi}/${id}`;
    return this.http.delete(url);
  }
}

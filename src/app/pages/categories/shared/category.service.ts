import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  urlApi = 'api/categories';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.urlApi);
  }
}

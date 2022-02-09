import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  urlApi = 'api/entries';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Entry[]> {
    return this.http
      .get(this.urlApi)
      .pipe(catchError(this.handleError), map(this.jsonDataToEntries));
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.urlApi}/${id}`; // api/categorias/1
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToEntry));
  }

  create(entry: Entry): Observable<Entry> {
    return this.http
      .post(this.urlApi, entry)
      .pipe(catchError(this.handleError), map(this.jsonDataToEntry));
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.urlApi}/${entry.id}`;
    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.urlApi}/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToEntry));
  }

  // private methods
  private handleError(error: any): Observable<any> {
    console.log('Http Request Error => ', error);
    return throwError(() => new Error(error));
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const categories: Entry[] = [];
    jsonData.forEach((element) => {
      categories.push(element as Entry);
    });
    return categories;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }
}

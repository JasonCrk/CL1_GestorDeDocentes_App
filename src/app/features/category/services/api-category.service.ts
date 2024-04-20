import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { Category } from '../models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {

  httpClient: HttpClient = inject(HttpClient)

  BASE_API_URL = 'http://localhost:4000/api/v1/categories'

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.BASE_API_URL)
  }
}

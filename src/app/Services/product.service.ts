import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../environments/environment';
import { EMPTY, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = enviroment.apiUrl;
  private UrlEndPoind: string = this.apiUrl + 'Product/';

  constructor(private http: HttpClient) {}

  addProducts(request: Partial<any[]>): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.post<any>(`${this.UrlEndPoind}Agregar`, request, {
        headers,
      });
    } else {
      return EMPTY;
    }
  }
  

  getListDisponible(filter: number): Observable<Product[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<Product[]>(`${this.UrlEndPoind}Filtro/${filter}`, {
        headers,
      });
    } else {
      return EMPTY;
    }
  }

  getListAll(): Observable<Product[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<Product[]>(this.UrlEndPoind, {
        headers,
      });
    } else {
      return EMPTY;
    }
  }

  putStateProduct(productId: number, newState: number): Observable<Product> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      // Corrige la forma de pasar las cabeceras (usa options en lugar de un objeto)
      const requestOptions = { headers };
      return this.http.put<Product>(
        `${this.UrlEndPoind}UpdateState/${productId}/${newState}`,
        null,
        requestOptions
      );
    } else {
      return EMPTY;
    }
  }
}

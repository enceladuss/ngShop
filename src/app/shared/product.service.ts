import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {FbResponse, Product} from './interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) {
  }

  create(product): Observable<any> {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product).pipe(map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.name)
        };
      })
    );
  }

  getAll(): any {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(map(res => {
          return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }));
        })
      );
  }

  // TODO: ASK ABOUT PROCESSING ERRORS

  getById(id): Observable<any> {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: Product) => {
          if (!res) {
            return null;
          }
          return {
            ...res,
            id,
            date: new Date(res.date)
          };
        }),
        catchError((err, caught) => {
          console.error(err, caught);
          return null;
        })
      );
  }

  remove(id): Observable<any> {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }

  update(product: Product): Observable<any> {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product);
  }
}

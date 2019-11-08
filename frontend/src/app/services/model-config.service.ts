import { ModelConfig } from '../models/model-config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelConfigService {
  private apiURL = 'http://localhost:8080/modelconfig/';
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getAll(): Observable<ModelConfig[]> {
    return this.http
      .get(this.apiURL)
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new ModelConfig(
                item.id,
                item.reviewPeriod,
                item.deliveryTime,
                item.lastDelivery,
                item.supplier
              )
          )
        )
      );
  }

  patch(id: number, values): Observable<any> {
    return this.http.patch(this.apiURL + id, values, this.httpOptions);
  }
}

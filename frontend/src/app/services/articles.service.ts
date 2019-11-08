import { ArticlesMean } from './../models/articles-mean';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiURL = 'http://localhost:8080/article/mean';
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getAll(): Observable<any[]> {
    return this.http
      .get(this.apiURL)
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new ArticlesMean(
                item.id,
                item.code,
                item.name,
                item.price,
                item.mean
              )
          )
        )
      );
  }
}

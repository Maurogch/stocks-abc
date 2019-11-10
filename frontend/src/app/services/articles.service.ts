import { ArticlePq } from './../models/article-pq';
import { ArticlesConsumption } from './../models/articles-consumption';
import { ArticlesZones } from './../models/articles-zones';
import { ArticlesMean } from './../models/articles-mean';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiURL = 'http://localhost:8080/article/';
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getAll(): Observable<ArticlesMean[]> {
    return this.http
      .get(this.apiURL + 'mean')
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new ArticlesMean(
                item.id,
                item.code,
                item.name,
                item.price,
                item.stock,
                item.supplier,
                item.mean,
                item.zone
              )
          )
        )
      );
  }

  getAllModelP(): Observable<ArticlePq[]> {
    return this.http
      .get(this.apiURL + 'modelp')
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new ArticlePq(
                item.code,
                item.name,
                item.price,
                item.stock,
                item.securityReserve,
                item.supplier,
                item.optimalLot,
                item.nextRevition,
                item.zone,
                item.annualManteinanceCost,
                item.reorderPoint
              )
          )
        )
      );
  }

  getAllModelQ(): Observable<ArticlePq[]> {
    return this.http
      .get(this.apiURL + 'modelq')
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new ArticlePq(
                item.code,
                item.name,
                item.price,
                item.stock,
                item.securityReserve,
                item.supplier,
                item.optimalLot,
                item.nextRevition,
                item.zone,
                item.annualManteinanceCost,
                item.reorderPoint
              )
          )
        )
      );
  }

  getAllConsumption(): Observable<ArticlesConsumption[]> {
    return this.http
      .get(this.apiURL + 'consumption')
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) => new ArticlesConsumption(item.code, item.consumption)
          )
        )
      );
  }

  getZones(): Observable<ArticlesZones> {
    return this.http
      .get(this.apiURL + 'zones')
      .pipe(
        map(
          (item: any) => new ArticlesZones(item.zoneA, item.zoneB, item.zoneC)
        )
      );
  }
}

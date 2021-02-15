import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getpromotions(): Observable<Promotion[]> {
    return  this.http.get<Promotion[]>(BaseURL + 'promotions');
  }

  getPromotion(id: string): Observable<Promotion> {
    return  this.http.get<Promotion>(BaseURL + 'promotions/' + id);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return  this.http.get<Promotion[]>(BaseURL + 'promotions?featured=true').pipe(map(Promotiones => Promotiones[0]));
  }
}

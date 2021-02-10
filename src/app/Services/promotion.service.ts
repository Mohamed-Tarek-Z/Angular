import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getpromotions(): Observable<Promotion[]> {
    return  of(PROMOTIONS).pipe(delay(500));
  }

  getPromotion(id: string): Observable<Promotion> {
    return  of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]).pipe(delay(500));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return  of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(500));
  }
}

import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorporateService {

  constructor(private http: HttpClient) { }

  getLeaders(): Observable<Leader[]> {
    return  this.http.get<Leader[]>(BaseURL + 'leadership');
  }

  getLeader(id: string): Observable<Leader> {
    return  this.http.get<Leader>(BaseURL + 'leadership/' + id);
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(BaseURL + 'leadership?featured=true').pipe(map(Leaderes => Leaderes[0]));
  }

}

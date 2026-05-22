import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { MOCK_DEALS } from '../mocks/mock-deals';
import { Deal } from '../models/deals';

@Injectable({
  providedIn: 'root',
})
export class DealService {
  private dealsSubject = new BehaviorSubject<Deal[]>(MOCK_DEALS);

  deals$ = this.dealsSubject.asObservable();

  addDeal(deal: Deal): void {
    const currentDeals = this.dealsSubject.value;

    this.dealsSubject.next([...currentDeals, deal]);
  }
}

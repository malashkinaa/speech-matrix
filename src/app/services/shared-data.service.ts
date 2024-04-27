import { Injectable } from '@angular/core';
import { StatsSummary } from '../interfaces/stats';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private statsSummarySubject = new BehaviorSubject<StatsSummary>({
    url: '',
    stats: [],
  });
  statsSummary$ = this.statsSummarySubject.asObservable();


  setStatsSummary(statsSummary: StatsSummary) {
    this.statsSummarySubject.next(statsSummary);
  }
}






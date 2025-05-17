import { Injectable } from '@angular/core';
import { Link, StatsSummary } from '../interfaces/stats';
import { BehaviorSubject, Subject } from 'rxjs';

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

  private curLinkSubject = new Subject<Link>();
  curLink$ = this.curLinkSubject.asObservable();
  setCurLink(link: Link) {
    this.curLinkSubject.next(link);
  }

  private curId = new Subject<string>();
  curId$ = this.curId.asObservable();
  setCurId(id: string) {
    this.curId.next(id);
  }
}

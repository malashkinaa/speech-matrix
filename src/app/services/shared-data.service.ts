import { Injectable } from '@angular/core';
import { Link, StatsSummary } from '../interfaces/stats';
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

  private curLinkSubject = new BehaviorSubject<Link>({
    start: 0,
    text: '',
  });
  curLink$ = this.curLinkSubject.asObservable();
  setCurLink(link: Link) {
    console.log("SharedDataService.setCurLink", link)
    this.curLinkSubject.next(link);
  }
 
}




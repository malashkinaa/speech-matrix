import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public loading$: Observable<boolean>;
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  public constructor() {
    this.loading$ = this._loading$.asObservable();
  }


  set(loading: boolean) {
    console.log('SpinnerService', loading);
    this._loading$.next(loading);
  }
}






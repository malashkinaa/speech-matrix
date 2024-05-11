import { inject } from '@angular/core';
import { SpinnerService } from './spinner.service';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/internal/operators/finalize';


export const ApiInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const spinnerService = inject(SpinnerService);
  spinnerService.set(true);
  return next(request).pipe(
    finalize(() => {
      spinnerService.set(false);
    })
  );
};






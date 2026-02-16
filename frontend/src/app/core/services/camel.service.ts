import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camel } from '@models/camel';
import { catchError, Observable, of, shareReplay, throwError } from 'rxjs';
import { env } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class CamelService {
  constructor(private readonly http: HttpClient) {}

  private readonly camelUrl = env.apiUrl + 'camels/';

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  getCamels(): Observable<Camel[]> {
    return this.http.get<Camel[]>(this.camelUrl).pipe(catchError(this.handleError), shareReplay(1));
  }

  addCamel(camel: Camel): Observable<Camel> {
    return this.http.post<Camel>(this.camelUrl, camel).pipe(catchError(this.handleError));
  }

  updateCamel(camel: Camel): Observable<Camel> {
    return this.http.put<Camel>(this.camelUrl + camel.id, camel).pipe(catchError(this.handleError));
  }

  deleteCamel(id: number): Observable<Camel> {
    return this.http.delete<Camel>(this.camelUrl + id).pipe(catchError(this.handleError));
  }
}

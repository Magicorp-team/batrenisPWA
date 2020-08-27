import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Action } from '../class/action';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private http: HttpClient
  ) { }

  getActions(): Observable<Action[]> {
    const url = environment.apiUrl + '/actions';
    return this.http.get<Action[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  createAction(action: Action) {
    const url = environment.apiUrl + '/actions';
    return this.http.post<Action>(url, {
      title: action.title,
      name: action.name,
      description: action.description
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateAction(action: Action) {
    const url = environment.apiUrl + '/actions/' + action.id;
    return this.http.put<Action>(url, {
      title: action.title,
      name: action.name,
      description: action.description
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteAction(action: Action) {
    const url = environment.apiUrl + '/actions/' + action.id;
    return this.http.delete<Action>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError('Unknown error' + error.error.message);
    }
    if (!error.status) return throwError(`Server connexion error : ${error.statusText}`);
    if (error.status == 400)
      return throwError(
        `${error.error.msg} because : ` +
        error.error.errors.reduce((acc: string, i: any) => (acc = acc + `, ${i.message}`, acc), "")
          .replace(/^\,\s/, '')
      );
    return throwError(`${error.error.msg}`);
  }

}

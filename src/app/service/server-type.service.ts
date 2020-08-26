import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { ServerType } from '../class/server-type';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerTypeService {

  constructor(
    public globals: Globals,
    private http: HttpClient
  ) { }

  getServerTypes(): Observable<ServerType[]> {
    const url = this.globals.apiUrl + '/types';
    return this.http.get<ServerType[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  createServerType(type: ServerType) {
    const url = this.globals.apiUrl + '/types';
    return this.http.post<ServerType>(url, {
      title: type.title
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteServerType(type: ServerType) {
    const url = this.globals.apiUrl + '/types/' + type.id;
    return this.http.delete<ServerType>(url).pipe(
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

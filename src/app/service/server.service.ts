import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Server } from '../class/server';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    public globals: Globals,
    private http: HttpClient
  ) { }

  getServers(): Observable<Server[]> {
    const url = this.globals.apiUrl + '/servers';
    return this.http.get<Server[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  createServer(server: Server) {
    const url = this.globals.apiUrl + '/servers';
    return this.http.post<Server>(url, server).pipe(
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
      return throwError(`${error.error.msg} because ${error.error.errors}`);
    return throwError(`${error.error.msg}`);
  }

}

import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Server } from '../class/server';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient
  ) { }

  getServers(): Observable<Server[]> {
    const url = environment.apiUrl + '/servers';
    return this.http.get<Server[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  createServer(server: Server) {
    const url = environment.apiUrl + '/servers';
    return this.http.post<Server>(url, server).pipe(
      catchError(this.handleError)
      );
    }

  getServer(id: number): Observable<Server> {
    const url = environment.apiUrl + '/servers/' + id;
    return this.http.get<Server>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateServer(server: Server): Observable<Server> {
    const url = environment.apiUrl + '/servers/' + server.id;
    return this.http.put<Server>(url, server).pipe(
      catchError(this.handleError)
    );
  }

  deleteServer(server: Server) {
    const url = environment.apiUrl + '/servers/' + server.id;
    return this.http.delete<Server>(url).pipe(
      catchError(this.handleError)
    );
  }

  runAction(id: number, action: string): Observable<any> {
    const url = environment.apiUrl + '/servers/' + id + "/actions/" + action;
    return this.http.get<any>(url).pipe(
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

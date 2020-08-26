import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Globals } from '../globals';
import { Role } from '../class/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public globals: Globals,
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    const url = this.globals.apiUrl + '/users';
    return this.http.get<User[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateUserRole(user: User) {
    const url = this.globals.apiUrl + '/users/' + user.id + "/roles";
    return this.http.put<User>(url, {
      roles: user.roles.reduce((acc: Array<Number>, i: Role) => (acc.push(i.id), acc), [])
    }).pipe(
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

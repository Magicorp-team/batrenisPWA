import { Injectable } from '@angular/core';
import { Role } from '../class/role';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Permission } from '../class/permission';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient
  ) { }

  getRoles(): Observable<Role[]> {
    const url = environment.apiUrl + '/roles';
    return this.http.get<Role[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getRole(id: number): Observable<Role> {
    const url = environment.apiUrl + '/roles/' + id;
    return this.http.get<Role>(url).pipe(
      catchError(this.handleError)
    );
  }

  createRole(title: string, name: string, description: string, permissions: Permission[]): Observable<Role> {
    const url = environment.apiUrl + '/roles';
    return this.http.post<Role>(url, {
      title: title,
      name: name,
      description: description,
      permissions: permissions.reduce((acc, i) => (acc[i.name] = i["selected"], acc), {})
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateRole(id: number, title: string, name: string, description: string, permissions: Permission[]): Observable<Role> {
    const url = environment.apiUrl + '/roles/' + id;
    return this.http.put<Role>(url, {
      title: title,
      name: name,
      description: description,
      permissions: permissions.reduce((acc, i) => (acc[i.name] = i["selected"], acc), {})
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteRole(role: Role) {
    const url = environment.apiUrl + '/roles/' + role.id;
    return this.http.delete<Role>(url).pipe(
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

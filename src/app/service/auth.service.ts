import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken() {
    // Use cookie for store token because localStorage can't be subdomain shared
    // return localStorage.token;
    return this.getCookie("token");
  }

  private getCookie(name) {
    name += "=";
    let ca = decodeURIComponent(document.cookie).split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);

      if (c.indexOf(name) == 0)
        return c.substring(name.length, c.length);
    }
    return "";
  }
}

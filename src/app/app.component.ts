import { Component, AfterContentChecked } from '@angular/core';
import { AuthService } from './service/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  title = 'batrenis Beta';
  isDarkTheme: boolean = false;
  isDarkThemDefault: boolean;
  lastUrl = '';

  constructor(
    public authService: AuthService,
    public breakpointObserver: BreakpointObserver
  ) {
    if (!localStorage.darkMode) this.isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    else this.isDarkTheme = localStorage.darkMode == "true";
    this.isDarkThemDefault = this.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    localStorage.darkMode = checked;
    this.isDarkTheme = checked;
  }

  ngAfterContentChecked() {
    this.lastUrl = location.href;
  }

}

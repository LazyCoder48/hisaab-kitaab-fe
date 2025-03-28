import {Injectable} from '@angular/core';

@Injectable({
              providedIn: 'root'
            })
export class ThemePickerService {

  themeLinkElement: HTMLLinkElement;

  constructor() {
    this.themeLinkElement     = document.createElement('link');
    this.themeLinkElement.rel = 'stylesheet';
    document.head.appendChild(this.themeLinkElement);
  }

  switchTheme(themeName: string = 'arya-blue'): void {
    this.themeLinkElement.href = `assets/themes/${themeName}/theme.css`;
  }

}

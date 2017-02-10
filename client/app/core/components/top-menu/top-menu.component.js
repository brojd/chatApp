import { Component } from '@angular/core';
import { Router } from '@angular/router';
import template from './top-menu.template.html';
import styles from './top-menu.stylesheet.scss';
import { UserService } from '../../../auth';

@Component({
  selector: 'top-menu',
  template: template,
  styles: [styles]
})
export class TopMenuComponent {
  
  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this._router = router;
  }

  getLoggedIn() {
    return this.userService.getLoggedIn();
  }

  logout() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.userService.logout();
    this._router.navigate(['/login']);
    return false;
  }
  
}

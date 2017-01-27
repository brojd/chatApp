import { Component } from '@angular/core';
import { Router } from '@angular/router';
import template from './menu.template.html';
import { UserService } from '../../../auth';

@Component({
  selector: 'top-menu',
  template: template
})
export class MenuComponent {
  
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

import { Component, Inject } from '@angular/core';
import template from './app.template.html';
import styles from './app.stylesheet.scss';
import './back-photo.jpeg';

@Component({
  selector: 'my-app',
  template: template,
  styles: [styles]
})
export class AppComponent {

  constructor(@Inject('ENVIRONMENT') environment) {
    this.environment = environment;
  }
}

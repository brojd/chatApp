import { Component } from '@angular/core';
import template from './spinner.template.html';
import styles from './spinner.stylesheet.scss';
import './box.gif';

@Component({
  selector: 'spinner',
  template: template,
  styles: [styles]
})
export class SpinnerComponent {
  
  constructor() {}
  
}

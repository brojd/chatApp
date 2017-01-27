import { Component } from '@angular/core';
import template from './spinner.template.html';
import styles from './spinner.stylesheet.scss';
import './box.gif';

@Component({
  selector: 'ch-spinner',
  template: template,
  styles: [styles]
})
export class ChSpinnerComponent {
  
  constructor() {}
  
}

import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import template from './ch-room.template.html';
import styles from './ch-room.stylesheet.scss';

@Component({
  selector: 'ch-room',
  template: template,
  styles: [styles]
})
export class ChRoomComponent {
  
  constructor(route: ActivatedRoute) {
    this.route = route;
  }
  
  ngOnInit() {
    this.subscription = this.route
      .params
      .subscribe(params => {
        console.log(params.id);
      });
  }
  
}

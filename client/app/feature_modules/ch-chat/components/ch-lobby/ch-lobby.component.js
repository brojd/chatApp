import { Component } from '@angular/core';
import template from './ch-lobby.template.html';
import styles from './ch-lobby.stylesheet.scss';
import { ChRoomService } from '../../services/ch-room.service';

@Component({
  selector: 'ch-lobby',
  template: template,
  styles: [styles]
})
export class ChLobbyComponent {
  
  constructor(roomService: ChRoomService) {
    this.roomService = roomService;
    this.room = {};
  }
  
  createRoom() {
    debugger;
    this.roomService.createRoom(this.room).subscribe(
      res => {debugger;},
      err => {debugger;}
    )
  }
  
}

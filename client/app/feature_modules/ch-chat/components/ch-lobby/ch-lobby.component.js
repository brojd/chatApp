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
    this.rooms = [];
  }
  
  createRoom() {
    this.roomService.createRoom(this.room).subscribe(
      res => {
        if (res.success) {
          this.rooms.unshift(res.room);
          this.room.name = '';
        }
      },
      err => console.log(err)
    )
  }
  
  deleteRoom(id) {
    this.roomService.deleteRoom(id).subscribe(
      res => {
        if (res.success) {
          this.rooms = this.rooms.filter(room => room._id !== id);
        }
      },
      err => console.log(err)
    );
  }
  
  ngOnInit() {
    this.roomService.getRooms().subscribe(
      rooms => this.rooms = rooms,
      err => console.log(err)
    );
  }
  
}

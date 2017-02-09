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
    this.componentReady = false;
  }
  
  createRoom() {
    this.roomService.createRoom(this.room).subscribe(
      res => {
        if (res.success) {
          this.rooms.push(res.room);
          this.room.name = '';
          this.room.icon = '';
        }
      },
      err => console.log(err)
    )
  }
  
  deleteRoom(event, id) {
    event.preventDefault();
    event.stopPropagation();
    let toDelete = confirm('Do you want to delete room?');
    if (toDelete) {
      this.roomService.deleteRoom(id).subscribe(
        res => {
          if (res.success) {
            this.rooms = this.rooms.filter(room => room._id !== id);
          }
        },
        err => console.log(err)
      );
    }
  }
  
  handleIconClick(icon) {
    this.room.icon = icon;
  }
  
  ngOnInit() {
    this.roomService.getRooms().subscribe(
      rooms => {
        this.rooms = rooms;
        this.componentReady = true;
      },
      err => console.log(err)
    );
  }
  
}

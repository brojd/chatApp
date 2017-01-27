import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChCommonModule } from '../../common';
import { ChChatComponent } from './components/ch-chat/ch-chat.component';
import { ChLobbyComponent } from './components/ch-lobby/ch-lobby.component';
import { ChRoomComponent } from './components/ch-room/ch-room.component';

@NgModule({
  imports: [ CommonModule, RouterModule, ChCommonModule ],
  declarations: [ ChChatComponent, ChLobbyComponent, ChRoomComponent ],
  exports:      [ ChChatComponent, ChLobbyComponent, ChRoomComponent ]
})
export class ChChatModule { }

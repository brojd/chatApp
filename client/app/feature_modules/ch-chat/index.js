import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChCommonModule } from '../../common';
import { ChChatComponent } from './components/ch-chat/ch-chat.component';
import { ChLobbyComponent } from './components/ch-lobby/ch-lobby.component';
import { ChRoomComponent } from './components/ch-room/ch-room.component';
import { ChRoomService } from './services/ch-room.service';
import { ChMessageService } from './services/ch-message.service';

@NgModule({
  imports: [ CommonModule, RouterModule, FormsModule, ChCommonModule ],
  declarations: [ ChChatComponent, ChLobbyComponent, ChRoomComponent ],
  exports:      [ ChChatComponent, ChLobbyComponent, ChRoomComponent ],
  providers: [ ChRoomService, ChMessageService ]
})
export class ChChatModule { }

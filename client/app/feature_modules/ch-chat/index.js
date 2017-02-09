import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChCommonModule } from '../../common';
import { ChChatComponent } from './components/ch-chat/ch-chat.component';
import { ChLobbyComponent } from './components/ch-lobby/ch-lobby.component';
import { ChRoomComponent } from './components/ch-room/ch-room.component';
import { ChMessagesWindowComponent } from './components/ch-messages-window/ch-messages-window.component';
import { ChFeedComponent } from './components/ch-feed/ch-feed.component';
import { ChRoomService } from './services/ch-room.service';
import { ChChatService } from './services/ch-chat.service';
import { EmojifyModule } from 'angular2-emojify';
import { ChEmojiPickerComponent } from './components/ch-emoji-picker/ch-emoji-picker.component';
import { ChRoomUsersComponent } from './components/ch-room-users/ch-room-users.component';

@NgModule({
  imports: [ CommonModule, RouterModule, FormsModule, ChCommonModule, EmojifyModule ],
  declarations: [ ChChatComponent, ChLobbyComponent, ChRoomComponent, ChMessagesWindowComponent, ChFeedComponent,
    ChEmojiPickerComponent, ChRoomUsersComponent ],
  exports:      [ ChChatComponent, ChLobbyComponent, ChRoomComponent ],
  providers: [ ChRoomService, ChChatService ]
})
export class ChChatModule { }

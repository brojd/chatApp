import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChCommonModule } from '../../common';
import { ChChatComponent } from './components/ch-chat/ch-chat.component';

@NgModule({
  imports: [ CommonModule, ChCommonModule ],
  declarations: [ ChChatComponent ],
  exports:      [ ChChatComponent ]
})
export class ChChatModule { }

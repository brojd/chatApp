import { ChLogInComponent } from '../auth/components/ch-log-in/ch-log-in.component';
import { ChSignUpComponent } from '../auth/components/ch-sign-up/ch-sign-up.component';
import { ChAboutComponent } from '../feature_modules/ch-about/components/ch-about/ch-about.component';
import { ChChatComponent } from '../feature_modules/ch-chat/components/ch-chat/ch-chat.component';
import { ChLobbyComponent } from '../feature_modules/ch-chat/components/ch-lobby/ch-lobby.component';
import { ChRoomComponent } from '../feature_modules/ch-chat/components/ch-room/ch-room.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

export const routes = [
  
  // All
  { path: 'about', component: ChAboutComponent },
  { path: '', pathMatch: 'full', redirectTo: '/chat' },
  
  // Logged out users
  { path: 'login', component: ChLogInComponent, canActivate: [LoggedOutGuard] },
  { path: 'signup', component: ChSignUpComponent, canActivate: [LoggedOutGuard] },
  
  // Logged in users
  {
    path: 'chat',
    component: ChChatComponent,
    canActivate: [LoggedInGuard],
    children:[
      {
        path: '',
        component: ChLobbyComponent
      },
      {
        path: 'room/:id',
        component: ChRoomComponent
      },
    ]
  }
  
];

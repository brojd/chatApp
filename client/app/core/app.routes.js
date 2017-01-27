import { LoginComponent } from '../auth/components/login/login.component';
import { ChAboutComponent } from '../feature_modules/ch-about/components/ch-about/ch-about.component';
import { ChChatComponent } from '../feature_modules/ch-chat/components/ch-chat/ch-chat.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

export const routes = [
  
  // All
  { path: 'about', component: ChAboutComponent },
  
  // Logged out users
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  
  // Logged in users
  { path: '', component: ChChatComponent, pathMatch: 'full', canActivate: [LoggedInGuard] }
  
];

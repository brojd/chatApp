import { LoginComponent } from '../auth/components/login/login.component';
import { AboutComponent } from '../feature_modules/about/components/about/about.component';
import { MyProfileComponent } from '../feature_modules/my-profile/components/my-profile/my-profile.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

export const routes = [
  
  // All
  { path: 'about', component: AboutComponent },
  
  // Logged out users
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  
  // Logged in users
  { path: 'my-profile', component: MyProfileComponent, pathMatch: 'full', canActivate: [LoggedInGuard] }
  
];

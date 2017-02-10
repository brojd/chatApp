import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';

import { ChLogInComponent } from './components/ch-log-in/ch-log-in.component';
import { ChSignUpComponent } from './components/ch-sign-up/ch-sign-up.component';

export {
  StorageService,
  UserService
};

export const AUTH_PROVIDERS = [StorageService, UserService];
export const AUTH_DECLARATIONS = [ChLogInComponent, ChSignUpComponent];

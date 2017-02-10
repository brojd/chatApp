import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { AppComponent } from './components/app/app.component';

export { AppComponent };

export const CORE_PROVIDERS = [LoggedInGuard, LoggedOutGuard ];
export const CORE_DECLARATIONS = [TopMenuComponent, AppComponent];

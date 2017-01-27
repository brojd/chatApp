import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../common';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

@NgModule({
  imports: [ CommonModule, AppCommonModule ],
  declarations: [ MyProfileComponent ],
  exports:      [ MyProfileComponent ]
})
export class MyProfileModule { }

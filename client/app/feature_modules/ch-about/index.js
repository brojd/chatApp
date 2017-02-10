import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChCommonModule } from '../../common';
import { ChAboutComponent } from './components/ch-about/ch-about.component';

@NgModule({
  imports: [ CommonModule, ChCommonModule ],
  declarations: [ ChAboutComponent ],
  exports:      [ ChAboutComponent ]
})
export class ChAboutModule { }

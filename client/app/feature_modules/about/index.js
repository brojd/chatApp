import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../common';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  imports: [ CommonModule, AppCommonModule ],
  declarations: [ AboutComponent ],
  exports:      [ AboutComponent ]
})
export class AboutModule { }

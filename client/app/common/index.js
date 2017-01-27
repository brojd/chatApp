import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ SpinnerComponent ],
  exports:      [ SpinnerComponent ]
})
export class AppCommonModule { }

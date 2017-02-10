import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { ChSpinnerComponent } from './components/ch-spinner/spinner.component';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ ChSpinnerComponent ],
  exports:      [ ChSpinnerComponent ]
})
export class ChCommonModule { }

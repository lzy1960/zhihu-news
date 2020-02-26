import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SlideComponent } from './slide.component';



@NgModule({
  declarations: [ SlideComponent ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ SlideComponent ]
})
export class SlideModule { }

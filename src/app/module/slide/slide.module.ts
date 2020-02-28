import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { SlideComponent } from './slide.component';



@NgModule({
  declarations: [SlideComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [SlideComponent]
})
export class SlideModule { }

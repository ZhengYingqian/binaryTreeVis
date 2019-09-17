import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import { MainComponent } from './main/main.component';
import { NodeLinkComponent } from './node-link/node-link.component';
import { RadarComponent } from './radar/radar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule, MatCheckboxModule
  ],
  declarations: [
    MainComponent,
    NodeLinkComponent,
    RadarComponent
  ],
  exports: [MainComponent]
})
export class TianqiModule { }

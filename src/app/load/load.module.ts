import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadRoutingModule } from './load-routing.module';
import { LoadComponent } from './load/load.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [
    LoadComponent
  ],
  imports: [
    CommonModule,
    LoadRoutingModule,
    LeafletModule
  ]
})
export class LoadModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsertRoutingModule } from './insert-routing.module';
import { InsertComponent } from './insert/insert.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [
    InsertComponent
  ],
  imports: [
    CommonModule,
    InsertRoutingModule,
    LeafletModule
  ]
})
export class InsertModule { }

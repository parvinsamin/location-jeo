import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { UploaderComponent } from './uploader/uploader.component';


@NgModule({
  declarations: [
    MapComponent,
    UploaderComponent
  ],
  imports: [
    CommonModule,
    LeafletModule
  ],
  exports: [
    CommonModule,
    LeafletModule,
    MapComponent,
    UploaderComponent
  ],
  providers: [],
})
export class PartialsModule { }

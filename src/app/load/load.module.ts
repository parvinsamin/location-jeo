import { NgModule } from '@angular/core';
import { PartialsModule } from '../partials/partials.module';

import { LoadRoutingModule } from './load-routing.module';
import { LoadComponent } from './load/load.component';


@NgModule({
  declarations: [
    LoadComponent
  ],
  imports: [
    LoadRoutingModule,
    PartialsModule
  ]
})
export class LoadModule { }

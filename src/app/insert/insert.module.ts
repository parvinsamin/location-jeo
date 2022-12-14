import { NgModule } from '@angular/core';
import { InsertRoutingModule } from './insert-routing.module';
import { InsertComponent } from './insert/insert.component';
import { PartialsModule } from '../partials/partials.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InsertComponent
  ],
  imports: [
    InsertRoutingModule,
    FormsModule,
    PartialsModule
  ]
})
export class InsertModule { }

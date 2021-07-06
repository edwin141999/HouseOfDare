import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeleccionRetoRoutingModule } from './seleccion-reto-routing.module';
import { SeleccionRetoComponent } from './seleccion-reto.component';


@NgModule({
  declarations: [
    SeleccionRetoComponent
  ],
  imports: [
    CommonModule,
    SeleccionRetoRoutingModule
  ]
})
export class SeleccionRetoModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionRetoComponent } from './seleccion-reto.component';

const routes: Routes = [{ path: '', component: SeleccionRetoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeleccionRetoRoutingModule { }

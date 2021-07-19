import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetoComunidadComponent } from './reto-comunidad.component';

const routes: Routes = [{ path: '', component: RetoComunidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetoComunidadRoutingModule { }

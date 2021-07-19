import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SeleccionRetoComponent } from './pages/seleccion-reto/seleccion-reto.component';
import { RetoComunidadComponent } from './pages/reto-comunidad/reto-comunidad.component';

// no se ponen slash
const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  {
    path: 'seleccionReto',
    component: SeleccionRetoComponent,
  },
  { path: 'comunidad', component: RetoComunidadComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

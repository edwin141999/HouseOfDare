import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SeleccionRetoComponent } from './pages/seleccion-reto/seleccion-reto.component';
import { HelperService } from './shared/services/helper.service';
import { RetoComunidadComponent } from './pages/reto-comunidad/reto-comunidad.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SeleccionRetoComponent,
    RetoComunidadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AngularFirestore, HelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}

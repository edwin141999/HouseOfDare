import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Comunidad } from 'src/app/shared/models/comunidad.interface';
import { Retos } from 'src/app/shared/models/retos.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-seleccion-reto',
  templateUrl: './seleccion-reto.component.html',
  styleUrls: ['./seleccion-reto.component.css'],
})
export class SeleccionRetoComponent implements OnInit {
  llenadoLista = new FormArray([]);
  listaNombre = new FormArray([]);
  public bandera: boolean = false;
  public tipo: boolean = false;
  public allRetos$!: Observable<Retos[]>;
  public extraerFiltro$!: Observable<Retos[]>;
  public selectReto$!: Observable<Retos[]>;
  public aux: Retos[] = [];
  dificultad: string = '';
  public nombreRandom = '';
  public pos = 0;
  //COMUNIDAD
  public allRetosComunidad$!: Observable<Comunidad[]>;
  public extraerFiltroComunidad$!: Observable<Comunidad[]>;
  public selectRetoComunidad$!: Observable<Comunidad[]>;
  public aux2: Comunidad[] = [];

  constructor(private helper: HelperService, private db: DatabaseService) {}

  ngOnInit(): void {
    const lista = this.helper.getNombres();
    this.llenadoLista.push(lista);
    //agrega los nombres en una lista
    for (let i = 0; i < this.llenadoLista.value[0].length; i++) {
      // console.log(this.llenadoLista.value[0][i]);
      this.listaNombre.push(new FormControl(this.llenadoLista.value[0][i]));
    }
    //retornar todas las cartas
    this.allRetos$ = this.db.getAllRetos();
    this.allRetosComunidad$ = this.db.getAllRetosComunidad();
  }

  obtenerDificultad(dato: string) {
    this.dificultad = dato;
    this.extraerFiltro$ = this.db.getRetoDificultad(this.dificultad);
    this.extraerFiltroComunidad$ = this.db.getRetoComunidadDificultad(
      this.dificultad
    );
    this.actualizarReto();
    this.actualizarListaParticipantes();
  }

  retoCumplido(cumplio: boolean) {
    if (cumplio) {
      this.listaNombre.removeAt(this.pos);
      this.actualizarReto();
      this.actualizarListaParticipantes();
    } else {
      this.actualizarReto();
      this.actualizarListaParticipantes();
    }
  }

  actualizarReto() {
    this.aux = [];
    this.extraerFiltro$.subscribe((reto) => {
      var random = Math.round(Math.random() * (reto.length - 1));
      this.aux.push(reto[random]);
      this.selectReto$ = of(this.aux);
    });
    //COMUNIDAD
    this.aux2 = [];
    this.extraerFiltroComunidad$.subscribe((reto) => {
      var random = Math.round(Math.random() * (reto.length - 1));
      this.aux2.push(reto[random]);
      this.selectRetoComunidad$ = of(this.aux2)
    });
  }

  actualizarListaParticipantes() {
    var random = Math.round(Math.random() * (this.listaNombre.length - 1));
    this.pos = random;
    this.nombreRandom = this.listaNombre.value[random];
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
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

  constructor(private helper: HelperService, private db: DatabaseService) {}

  ngOnInit(): void {
    const lista = this.helper.getNombres();
    this.llenadoLista.push(lista);
    //agrega los nombres en una lista
    for (let i = 0; i < this.llenadoLista.value[0].length; i++) {
      // console.log(this.llenadoLista.value[0][i]);
      this.listaNombre.push(new FormControl(this.llenadoLista.value[0][i]));
    }
    //jugador aleatorio
    var random = Math.round(Math.random() * (this.listaNombre.length - 1));
    this.pos = random;
    this.nombreRandom = this.listaNombre.value[random];
    //retornar todas las cartas
    // this.db.getAllRetos().subscribe((res) => console.log('RETOS', res));
    this.allRetos$ = this.db.getAllRetos();
  }

  obtenerDificultad(dato: string) {
    this.dificultad = dato;
    // console.log(this.dificultad);
    // this.filtrarDificultad();
    this.extraerFiltro$ = this.db.getRetoDificultad(this.dificultad);
    this.aux = [];
    this.extraerFiltro$.subscribe((ver2) => {
      var random = Math.round(Math.random() * (ver2.length - 1));
      // console.log(ver2[random]);
      this.aux.push(ver2[random]);
      // console.log('2', ver2);
      // console.log('3', this.arr);
      this.selectReto$ = of(this.aux);
    });
  }

  retoCumplido(cumplio: boolean) {
    if (cumplio) {
      this.listaNombre.removeAt(this.pos);
    }
  }
}

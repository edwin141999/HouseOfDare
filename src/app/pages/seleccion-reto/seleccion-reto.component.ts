import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  nombreIngresado = new FormArray([]);
  listaNombre = new FormArray([]);
  public bandera: boolean = false;
  public tipo: boolean = false;
  public allRetos$!: Observable<Retos[]>;
  public extraerFiltro$!: Observable<Retos[]>;
  public selectReto$!: Observable<Retos[]>;
  public aux: Retos[] = [];
  categoria: string = '';
  public nombreRandom = '';
  public pos = 0;
  //COMUNIDAD
  public allRetosComunidad$!: Observable<Comunidad[]>;
  public extraerFiltroComunidad$!: Observable<Comunidad[]>;
  public selectRetoComunidad$!: Observable<Comunidad[]>;
  public aux2: Comunidad[] = [];
  //LISTA
  public auxParticipantes = new FormArray([]);
  public pasar: boolean = false;
  registerNameForm!: FormGroup;
  nombres = new FormArray([]);
  public confirmarCategoria: boolean = false;

  constructor(
    private helper: HelperService,
    private db: DatabaseService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateParticipantes();
    //retornar todas las cartas
    this.allRetos$ = this.db.getAllRetos();
    this.allRetosComunidad$ = this.db.getAllRetosComunidad();

    this.registerNameForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  updateParticipantes() {
    //Limpias la lista para extraer datos
    this.nombreIngresado.clear();
    //relleno la lista con los datos
    const nombre = this.helper.getNombres();
    this.nombreIngresado.push(nombre);
    //agrega los nombres a mi lista principal
    for (let i = 0; i < this.nombreIngresado.value[0].length; i++) {
      // console.log(this.llenadoLista.value[0][i]);
      this.listaNombre.push(new FormControl(this.nombreIngresado.value[0][i]));
      // this.auxParticipantes.push(new FormControl(this.nombreIngresado.value[0][i]));
    }
  }

  obtenerCategoria(dato: string) {
    this.confirmarCategoria = true;
    this.tipo = false;
    this.categoria = dato;
    this.extraerFiltro$ = this.db.getRetoCategoria(this.categoria);
    this.extraerFiltroComunidad$ = this.db.getRetoComunidadCategoria(
      this.categoria
    );
    this.actualizarReto();
    this.actualizarListaParticipantes();
  }

  cambiarVista() {
    this.confirmarCategoria = false;
    this.bandera = false;
  }

  retoCumplido(cumplio: boolean) {
    if (cumplio) {
      const sacarNombre = this.listaNombre.at(this.pos);
      this.auxParticipantes.push(sacarNombre);
      this.listaNombre.removeAt(this.pos);
      if (this.listaNombre.length == 0) {
        this.pasar = true;
      }
    }
    this.actualizarReto()
    this.actualizarListaParticipantes()
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
      this.selectRetoComunidad$ = of(this.aux2);
    });
  }

  actualizarListaParticipantes() {
    var random = Math.round(Math.random() * (this.listaNombre.length - 1));
    this.pos = random;
    this.nombreRandom = this.listaNombre.value[random];
  }

  chargeGame() {
    // console.log(this.auxParticipantes.value);
    for (let i = 0; i <  this.auxParticipantes.value.length; i++) {
      // console.log(this.auxParticipantes.value[i]);
      this.listaNombre.push(new FormControl(this.auxParticipantes.value[i]))
    }
    this.auxParticipantes.clear()
    // this.listaNombre = this.auxParticipantes;
    // this.auxParticipantes = this.listaNombre
    this.actualizarListaParticipantes();
    this.actualizarReto();
    this.pasar = false;
  }

  addNombre() {
    if (this.registerNameForm.valid) {
      this.nombres.clear();
      let nombre = this.registerNameForm.value.name;
      this.registerNameForm.reset();
      this.nombres.push(new FormControl(nombre));
      this.helper.setNombresList(this.nombres);
      this.updateParticipantes();
    } else {
      console.log('Not Valid');
    }
  }

  removeNombre(index: number) {
    this.listaNombre.removeAt(index);
  }

  esValido(field: string): string {
    const validateField = this.registerNameForm.get(field);
    return !validateField?.valid && validateField?.touched
      ? 'is-invalid'
      : validateField?.touched
      ? 'is-valid'
      : '';
  }
}

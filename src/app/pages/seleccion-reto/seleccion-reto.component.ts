import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-seleccion-reto',
  templateUrl: './seleccion-reto.component.html',
  styleUrls: ['./seleccion-reto.component.css'],
})
export class SeleccionRetoComponent implements OnInit {
  llenadoLista = new FormArray([]);
  listaNombre = new FormArray([]);
  constructor(private helper: HelperService) {}

  ngOnInit(): void {
    const lista = this.helper.getNombres();
    this.llenadoLista.push(lista);
    //agrega los nombres en una lista
    for (let i = 0; i < this.llenadoLista.value[0].length; i++) {
      console.log(this.llenadoLista.value[0][i]);
      this.listaNombre.push(new FormControl(this.llenadoLista.value[0][i]));
    }
    console.log(this.listaNombre);
  }
}

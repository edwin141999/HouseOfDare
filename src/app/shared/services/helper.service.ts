import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable()
export class HelperService {
  constructor(private router: Router) {}

  private nombres = new FormArray([]);

  setNombresList(nombre: FormArray) {
    this.nombres = nombre;
  }

  getNombres() {
    let temp = this.nombres;
    this.clearNombres();
    return temp;
  }

  clearNombres() {
    this.nombres = new FormArray([]);
  }
}

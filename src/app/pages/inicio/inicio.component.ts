import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  registerNameForm!: FormGroup;
  nombres = new FormArray([]);
  public contador = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private helper: HelperService
  ) {}

  ngOnInit(): void {
    this.registerNameForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  goSeleccionReto(): boolean {
    if (this.nombres.length < 2) {
      return false;
    } else {
      this.router.navigate(['seleccionReto']);
      return true;
    }
  }

  addNombre() {
    if (this.registerNameForm.valid) {
      this.contador+=1
      // console.log(this.registerNameForm.value);
      let nombre = this.registerNameForm.value.name;
      this.registerNameForm.reset();
      this.nombres.push(new FormControl(nombre));
      console.log(this.nombres.controls);
      this.helper.setNombresList(this.nombres);
      // this.helper.setNombresList(nombre);
    } else {
      console.log('Not Valid');
    }
  }

  removeNombre(index: number) {
    this.nombres.removeAt(index);
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

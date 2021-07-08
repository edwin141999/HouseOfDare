import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  registerNameForm!: FormGroup;
  nombres = new FormArray([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerNameForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  goSeleccionReto() {
    this.router.navigate(['seleccionReto']);
  }

  addNombre() {
    // console.log(this.registerNameForm.value);
    let nombre = this.registerNameForm.value.name;
    this.nombres.push(new FormControl(nombre));
    console.log(this.nombres.controls);
    // console.log(this.nombres);
  }

  removeNombre(index: number) {
    this.nombres.removeAt(index);
  }
}

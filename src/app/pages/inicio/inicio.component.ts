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

  goSeleccionReto() {
    this.router.navigate(['seleccionReto']);
  }

  addNombre() {
    // console.log(this.registerNameForm.value);
    let nombre = this.registerNameForm.value.name;
    this.registerNameForm.reset()
    this.nombres.push(new FormControl(nombre));
    console.log(this.nombres.controls);
    this.helper.setNombresList(this.nombres);
    // for (let i = 0; i < this.nombres.length; i++) {
    //   localStorage.setItem('nombres '+[i],this.nombres.value[i])  
    // }    
    // this.helper.setNombresList(nombre);
  }

  removeNombre(index: number) {
    this.nombres.removeAt(index);
  }
}

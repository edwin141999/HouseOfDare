import { Component, OnInit } from '@angular/core';
import {
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
  idName = 0;
  registerNameForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  // myid!: any;
  // myForm!: any;

  ngOnInit(): void {
    this.registerNameForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: [this.idName],
    });
    // this.myForm = new FormGroup({
    //   nombre: new FormControl(''),
    //   id: new FormControl(''),
    // });
    // this.display();
  }

  goSeleccionReto() {
    this.router.navigate(['seleccionReto']);
  }

  addNombre() {
    console.log(this.registerNameForm.value);
    this.idName++;    
  }

  // display() {
  //   this.myid = localStorage.getItem('formdata');
  // }

  // onSubmit() {
  //   localStorage.setItem('formdata', JSON.stringify(this.myForm.value));
  // }
}

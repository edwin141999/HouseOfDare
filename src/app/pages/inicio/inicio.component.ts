import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  nombres = [];
  constructor(private router: Router, private route: ActivatedRoute) {}

  // myid!: any;
  // myForm!: any;

  ngOnInit(): void {
    // this.myForm = new FormGroup({
    //   nombre: new FormControl(''),
    //   id: new FormControl(''),
    // });
    // this.display();
  }

  goSeleccionReto() {
    this.router.navigate(['seleccionReto']);
  }

  addNombre() {this.nombres.push()}

  // display() {
  //   this.myid = localStorage.getItem('formdata');
  // }

  // onSubmit() {
  //   localStorage.setItem('formdata', JSON.stringify(this.myForm.value));
  // }
}

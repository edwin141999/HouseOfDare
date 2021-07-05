import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor() {}

  myid!: any;
  myForm: any;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      nombre: new FormControl(''),
      id: new FormControl(''),
    });
    this.display();
  }

  display() {
    this.myid = localStorage.getItem('formdata');
  }

  onSubmit() {
    localStorage.setItem('formdata', JSON.stringify(this.myForm.value));
  }
}

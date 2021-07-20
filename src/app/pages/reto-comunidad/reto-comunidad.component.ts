import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-reto-comunidad',
  templateUrl: './reto-comunidad.component.html',
  styleUrls: ['./reto-comunidad.component.css'],
  providers: [DataService],
})
export class RetoComunidadComponent implements OnInit {
  comunidadForm!: FormGroup;
  public save: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private DataSvc: DataService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.comunidadForm = this.fb.group({
      categoria: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      retador: [''],
      megusta: 0,
      nomegusta: 0,
    });
  }

  async onSave(): Promise<void> {
    if (
      this.comunidadForm.value.retador === null ||
      this.comunidadForm.value.retador === ''
    ) {
      this.comunidadForm.value.retador = 'Anonimo';
    }
    if (this.comunidadForm.valid) {
      // console.log(this.comunidadForm.value);
      const formValue = this.comunidadForm.value;
      this.save = true;
      await this.DataSvc.onSaveRetoComunidad(formValue);
      this.comunidadForm.reset();
    } else {
      console.log('Not Valid');
      this.save = false;
    }
  }

  esValido(field: string): string {
    const validateField = this.comunidadForm.get(field);
    return !validateField?.valid && validateField?.touched
      ? 'is-invalid'
      : validateField?.touched
      ? 'is-valid'
      : '';
  }

  goComunidad() {
    this.router.navigate(['comunidad']);
  }
}

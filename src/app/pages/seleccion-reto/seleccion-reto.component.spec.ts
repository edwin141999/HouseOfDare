import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionRetoComponent } from './seleccion-reto.component';

describe('SeleccionRetoComponent', () => {
  let component: SeleccionRetoComponent;
  let fixture: ComponentFixture<SeleccionRetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionRetoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionRetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

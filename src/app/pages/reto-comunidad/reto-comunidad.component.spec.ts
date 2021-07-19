import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoComunidadComponent } from './reto-comunidad.component';

describe('RetoComunidadComponent', () => {
  let component: RetoComunidadComponent;
  let fixture: ComponentFixture<RetoComunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetoComunidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetoComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

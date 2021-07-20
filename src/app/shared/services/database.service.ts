import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map, single, take } from 'rxjs/operators';
import { Comunidad } from '../models/comunidad.interface';
import { Retos } from '../models/retos.interface';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  //RETOS ALEATORIOS
  public retosCategoria$!: Observable<Retos[]>;
  //RETOS DE LA COMUNIDAD
  public retosComunidad$!: Observable<Comunidad[]>;

  constructor(private afs: AngularFirestore) {}

  //RETOS ALEATORIOS
  public getAllRetos(): Observable<Retos[]> {
    return this.afs
      .collection('retos')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Retos;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getRetoCategoria(categoria: string): Observable<Retos[]> {
    this.retosCategoria$ = this.getAllRetos();

    return this.retosCategoria$.pipe(
      map((cartas) =>
        cartas.filter((reto) => reto.categoria.toString() == categoria)
      )
    );
  }

  //RETOS DE LA COMUNIDAD
  public getAllRetosComunidad(): Observable<Comunidad[]> {
    return this.afs
      .collection('comunidad')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Comunidad;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getRetoComunidadCategoria(categoria: string): Observable<Comunidad[]> {
    this.retosComunidad$ = this.getAllRetosComunidad();

    return this.retosComunidad$.pipe(
      map((cartas) =>
        cartas.filter((reto) => reto.categoria.toString() == categoria)
      )
    );
  }
}

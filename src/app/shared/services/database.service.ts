import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map, single, take } from 'rxjs/operators';
import { Retos } from '../models/retos.interface';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  public prueba$!: Observable<Retos[]>;
  constructor(private afs: AngularFirestore) {}

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

  public getRetoDificultad(dificultad: string): Observable<Retos[]> {
    this.prueba$ = this.getAllRetos();

    return this.prueba$.pipe(
      map((cartas) =>
        cartas.filter(
          (reto) => reto.dificultad.toString() == dificultad,
        )
      )
    );
  }
}

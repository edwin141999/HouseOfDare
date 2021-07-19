import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Comunidad {
  // id: string;
  dificultad: string;
  description: string;
  retador: string;
}

@Injectable()
export class DataService {
  comunidad!: Observable<Comunidad>;
  private comunidadCollection: AngularFirestoreCollection<Comunidad>;

  constructor(private readonly afs: AngularFirestore) {
    this.comunidadCollection = afs.collection<Comunidad>('comunidad');
  }

  async onSaveRetoComunidad(comunidadForm: Comunidad): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.afs.createId();
        const data = {...comunidadForm };
        const result = this.comunidadCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }
}

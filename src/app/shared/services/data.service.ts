import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Card {
  title: string;
  id: string;
  dificultad: string;
  description: string;
}

@Injectable()
export class DataService {
  contacts!: Observable<any>;
  private cardsCollection: AngularFirestoreCollection<any>;

  constructor(private readonly afs: AngularFirestore) {
    this.cardsCollection = afs.collection<any>('retos');
  }

  async onSaveCard(contactForm: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.afs.createId();
        const data = { id, ...contactForm };
        const result = this.cardsCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }
}

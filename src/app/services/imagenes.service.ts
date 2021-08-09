import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Imagen } from '../domain/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  constructor(public afs: AngularFirestore) { }
  
  getImagenes(uid:any):Observable<any[]>{
    return this.afs.collection("imagenes",
            ref=> ref.where("activo","==",true).where("uidCentro","==",uid)).valueChanges();
  }
}

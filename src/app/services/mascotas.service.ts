import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contacto } from '../domain/contacto';
import { Mascota } from '../domain/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  constructor(public afs: AngularFirestore) { }
  
  save(mascota:Mascota){
      const refContactos = this.afs.collection("mascotas");
      
      if (mascota.uid == null){
        mascota.uid = this.afs.createId();
        mascota.activo = true;
      }

      refContactos.doc(mascota.uid).set(Object.assign({}, mascota));
  }

  getMascotas(uid:any):Observable<any[]>{
    return this.afs.collection("mascotas",
            ref=> ref.where("activo","==",true).where("uidUser","==",uid)).valueChanges();
  }

}

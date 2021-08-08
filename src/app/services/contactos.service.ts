import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contacto } from '../domain/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor(public afs: AngularFirestore) { }

  save(contacto:Contacto){
      const refContactos = this.afs.collection("contactos");
      
      if (contacto.uid == null){
        contacto.uid = this.afs.createId();
        contacto.activo = true;
      }
  
      refContactos.doc(contacto.uid).set(Object.assign({}, contacto));
  }
  
  getMascotas(uid:any):Observable<any[]>{
    return this.afs.collection("contactos",
            ref=> ref.where("activo","==",true).where("uidMascota","==",uid)).valueChanges();
  }
  
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vacunacion } from '../domain/vacunacion';

@Injectable({
  providedIn: 'root'
})
export class VacunasService {

  constructor(public afs: AngularFirestore) { }

  save(vacunacion:Vacunacion){
      const refContactos = this.afs.collection("vacunas");
      
      if (vacunacion.uid == null){
        vacunacion.uid = this.afs.createId();
        vacunacion.activo = true;
      }
  
      refContactos.doc(vacunacion.uid).set(Object.assign({}, vacunacion));
  }
  
  getVacunas(uid:any):Observable<any[]>{
    return this.afs.collection("vacunas",
            ref=> ref.where("activo","==",true).where("uidMascota","==",uid)).valueChanges();
  }
}

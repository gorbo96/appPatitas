import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Medicamento } from '../domain/medicamento';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  constructor(public afs: AngularFirestore) { }

  save(medicamento:Medicamento){
      const refContactos = this.afs.collection("medicamentos");
      
      if (medicamento.uid == null){
        medicamento.uid = this.afs.createId();
        medicamento.activo = true;
      }
  
      refContactos.doc(medicamento.uid).set(Object.assign({}, medicamento));
  }
  
  getVacunas(uid:any):Observable<any[]>{
    return this.afs.collection("medicamentos",
            ref=> ref.where("activo","==",true).where("uidMascota","==",uid)).valueChanges();
  }
}

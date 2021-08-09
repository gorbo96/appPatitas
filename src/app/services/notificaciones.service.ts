import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vacunacion } from '../domain/vacunacion';
import { Medicamento } from '../domain/medicamento';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(public afs: AngularFirestore) { }

  getMedicamentos(uid:any):Observable<any[]>{
    return this.afs.collection("medicamentos",
            ref=> ref.where("activo","==",true).where("uidUsuario","==", uid)).valueChanges();
  }

  getVacunas(uid:any):Observable<any[]>{
    return this.afs.collection("vacunas",
            ref=> ref.where("activo","==",true).where("uidUsuario","==", uid)).valueChanges();
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Comentario } from '../domain/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  constructor(public afs: AngularFirestore) { }

  save(comentario:Comentario){
      const refContactos = this.afs.collection("comentarios");
      
      if (comentario.uid == null){
        comentario.uid = this.afs.createId();
        comentario.activo = true;
      }
  
      refContactos.doc(comentario.uid).set(Object.assign({}, comentario));
  }
  
  getComentarios(uid:any):Observable<any[]>{
    return this.afs.collection("comentarios",
            ref=> ref.where("activo","==",true).where("uidCentro","==",uid)).valueChanges();
  }
}

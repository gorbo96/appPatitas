import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../domain/usuario';
import { AngularFireAuth } from '@angular/fire/auth';


import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})


export class InicioSesionPage implements OnInit {

  usuario: Usuario = new Usuario();

  
  cclave: string = ""

  showLoginOps = false
  showRegOps = false
  showRegGulOps = false


  constructor(public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alertController: AlertController,
		public router: Router) { }

  ngOnInit() {
  }


  async presentAlert(title: string, content: string) {
	const alert = await this.alertController.create({
		header: title,
		message: content,
		buttons: ['OK']
	})

	await alert.present()
}


  async verificar() {
		const { usuario } = this
		try {
			
			const res = await this.afAuth.signInWithEmailAndPassword(usuario.correo , usuario.clave)
			
			if(res.user) {
				this.user.setUser({
					nombre: usuario.nombre ,
					correo: usuario.correo,
					clave: usuario.clave,
					activo: usuario.activo,
					tipo: usuario.tipo,
					uid: res.user.uid
				})
				this.router.navigate(['/mascotas'])
			}
		
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				this.presentAlert('Error', 'Usuario no encontrado')
			}
			if(err.code === "auth/wrong-password") {
				this.presentAlert('Error', 'Contraseña Incorrecta')
			}
		}
	}






  async register() {
		const {  usuario, cclave } = this
		if(this.usuario.clave !== cclave) {
			this.presentAlert('Error', 'Las contraseñas no coinciden')
		}

		try {
			const res = await this.afAuth.createUserWithEmailAndPassword(usuario.correo , usuario.clave)

			this.afstore.doc(`usuarios/${res.user.uid}`).set({
				nombre: usuario.nombre ,
				correo: usuario.correo,
				clave: usuario.clave,
				activo: true,
				tipo: true,
				uid: res.user.uid
			})

			this.user.setUser({
				nombre: usuario.nombre ,
				correo: usuario.correo,
				clave: usuario.clave,
				activo: true,
				tipo: true,
				uid: res.user.uid
			})

			this.presentAlert('Exito', 'Usuario creado. Inicie sesion con su cuenta')
			

		} catch(error) {
			console.dir(error)
			if(error.code === "auth/invalid-email") {
				this.presentAlert('Error', 'Email no valido')
			}
		}
	}



  login(){
    if (this.showLoginOps == false){
      this.showLoginOps = true
      this.showRegOps = false
      this.showRegGulOps = false
    }
  }

  reg(){
    if (this.showRegOps == false){
      this.showLoginOps = false
      this.showRegOps = true
      this.showRegGulOps = false
    }
  }

  regGogul(){
    if (this.showRegGulOps == false){
      this.showLoginOps = false
      this.showRegOps = false
      this.showRegGulOps = true
    }
  }

}

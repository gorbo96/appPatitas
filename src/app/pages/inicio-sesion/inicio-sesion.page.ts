import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../domain/usuario';
import { AngularFireAuth } from '@angular/fire/auth';


import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import firebase from 'firebase/app';



@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})


export class InicioSesionPage implements OnInit {
  checked: boolean;

  usuario: Usuario = new Usuario();

  usuariolog : any;
  elementUsu : any;
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


				this.usuariolog = this.user.getData(res.user.uid);
				
				

				this.usuariolog.forEach((element) => {
					
					
					console.log(element[0]);

					if(element[0].activo == false){
						this.presentAlert('Error', 'Usuario eliminado')
					}
					else{
						this.user.setUser({
	
							nombre: element[0].nombre ,
							correo: element[0].email,
							clave: element[0].clave,
							activo:  element[0].activo,
							tipo: element[0].tipo,
							uid: element[0].uid
						})
						this.router.navigate(['/menu-p'])
						this.showLoginOps = false
					}

				});

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

			this.presentAlert('Exito', 'Usuario creado. Iniciando sesion con su cuenta')
			this.router.navigate(['/menu-p'])
			this.showRegOps = false

		} catch(error) {
			console.dir(error)
			if(error.code === "auth/invalid-email") {
				this.presentAlert('Error', 'Email no valido')
			}
			if(error.code === "auth/email-already-in-use") {
				this.presentAlert('Error', 'Email ya usado')
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


  async onLoginGoogle() {
    try {

	const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
		this.router.navigate(['/menu-p'])
        
		this.afstore.doc(`usuarios/${res.user.uid}`).set({
			
			nombre: res.user.displayName ,
			correo: res.user.email,
			clave: null,
			activo: true,
			tipo: true,
			uid: res.user.uid
		})
		console.log(res);

		
		this.user.setUser({
			nombre: res.user.displayName ,
			correo: res.user.email,
			clave: null,
			activo: true,
			tipo: true,
			uid: res.user.uid
		})
	
		
	
	
    } catch (error) {
      console.log('Error->', error);
    }
  }

  



}

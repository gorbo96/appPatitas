import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Contacto } from 'src/app/domain/contacto';
import { Mascota } from 'src/app/domain/mascota';
import { ContactosService } from 'src/app/services/contactos.service';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-crear-contacto',
  templateUrl: './crear-contacto.page.html',
  styleUrls: ['./crear-contacto.page.scss'],
})
export class CrearContactoPage implements OnInit {

  contacto: Contacto = new Contacto();

  mascota:Mascota = new Mascota();

  constructor(private route: ActivatedRoute,
              private router: Router, 
              private contactoService: ContactosService,
              public user: UserService) {
    route.queryParams.subscribe(params=>{
      console.log(params)
      this.mascota = params.mascota;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.mascota = this.router.getCurrentNavigation().extras.queryParams.mascota
      }
    }) 
   }

  ngOnInit() {
  }

  regresar(){
    
    let params: NavigationExtras={
      queryParams:{
        mascota:this.mascota
      }
    }

    this.router.navigate(["/datos-mascota"], params);
  }

  guardar(){
    this.contacto.uidMascota=this.mascota.uid;
    this.contacto.uidUsuario=this.user.getUser().uid;
    this.contactoService.save(this.contacto);
    let params: NavigationExtras={
      queryParams:{
        mascota:this.mascota
      }
    }
    this.router.navigate(["/datos-mascota"], params);

  }

  setIcon(){
    if(this.contacto.ocupacion=="Veterinario"){
        this.contacto.perfil={url:"../../assets/imagenes/doctor.png"};
    }
    if(this.contacto.ocupacion=="Peluquero"){
      this.contacto.perfil={url:"../../assets/imagenes/peluquero.png"};
    }
    if(this.contacto.ocupacion=="Alimentos"){
      this.contacto.perfil={url:"../../assets/imagenes/store.png"};
    }
  }

}

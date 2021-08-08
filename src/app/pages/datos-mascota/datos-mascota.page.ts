import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Contacto } from 'src/app/domain/contacto';
import { Mascota } from 'src/app/domain/mascota';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-datos-mascota',
  templateUrl: './datos-mascota.page.html',
  styleUrls: ['./datos-mascota.page.scss'],
})
export class DatosMascotaPage implements OnInit {
  
  mascota : Mascota = new Mascota();

  contactos : any;

  centDetalles=true;
  centProfecionales=false;
  centVacunacion=false;
  centMedicamentos=false;

  constructor(private route: ActivatedRoute, private router: Router, private contactosService: ContactosService) { 
    route.queryParams.subscribe(params=>{
      console.log(params)
      this.mascota = params.mascota;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.mascota = this.router.getCurrentNavigation().extras.queryParams.mascota
      }
    })
  }

  ngOnInit() {
    this.contactos=this.contactosService.getMascotas(this.mascota.uid);
  }

  regresar(){
    this.router.navigate(["/mascotas"]);
  }

  mostrarDetalles(){
    this.centDetalles=true;
    this.centProfecionales=false;
    this.centVacunacion=false;
    this.centMedicamentos=false;
  }

  mostrarProfecionales(){
    this.centDetalles=false;
    this.centProfecionales=true;
    this.centVacunacion=false;
    this.centMedicamentos=false;
  }

  mostrarVacunacion(){
    this.centDetalles=false;
    this.centProfecionales=false;
    this.centVacunacion=true;
    this.centMedicamentos=false;
  }


  mostrarMedicamentos(){
    this.centDetalles=false;
    this.centProfecionales=false;
    this.centVacunacion=false;
    this.centMedicamentos=true;
  }

  agregarProfecinales(){
    let params: NavigationExtras={
      queryParams:{
        mascota:this.mascota
      }
    }
    this.router.navigate(["/crear-contacto"], params);
  }

}

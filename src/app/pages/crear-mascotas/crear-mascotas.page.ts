import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/domain/mascota';

@Component({
  selector: 'app-crear-mascotas',
  templateUrl: './crear-mascotas.page.html',
  styleUrls: ['./crear-mascotas.page.scss'],
})
export class CrearMascotasPage implements OnInit {

  constructor() { }

  imgData: any;
  mascota: Mascota = new Mascota();
  razas: any = [];

  ngOnInit() {
    this.mascota.perfil={url : '../../assets/imagenes/pet.png'};
  }

  
  imageSelectedEvt(data: any) {
    // console.log(data);
    this.imgData = data;
  }
  uploadFinishedEvt(data: any) {
    this.mascota.perfil = data;
  }

  setearRazaPerro(){
    if(this.mascota.tipo=="Perro"){
      this.razas= [
        {
          id: 1,
          nombre: 'Chihuahua',
        },
        {
          id: 2,
          nombre: 'Pequines',
        },
        {
          id: 3,
          nombre: 'Bulldog',
        },
        {
          id: 4,
          nombre: 'Pastor Aleman',
        }
      ];
    }

    if(this.mascota.tipo=="Gato"){
      this.razas= [
        {
          id: 1,
          nombre: 'Persa',
        },
        {
          id: 2,
          nombre: 'Bengala',
        },
        {
          id: 3,
          nombre: 'Siames',
        },
        {
          id: 4,
          nombre: 'Ragdoll',
        }
      ];
    }
    
    if(this.mascota.tipo=="Rata"){
      this.razas= [
        {
          id: 1,
          nombre: 'Calva',
        },
        {
          id: 2,
          nombre: 'Común',
        },
        {
          id: 3,
          nombre: 'Dumbo',
        },
        {
          id: 4,
          nombre: 'Rex',
        }
      ];
    }

  }

}

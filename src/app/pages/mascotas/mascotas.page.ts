import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MascotasService } from 'src/app/services/mascotas.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})
export class MascotasPage implements OnInit {

  constructor(private router: Router,
              private mascotasService: MascotasService,
              public user: UserService) { }

  mascotas:any;
  mascota:any;

  ngOnInit() {
    this.mascotas = this.mascotasService.getMascotas(this.user.getUID());
  }

  crear(){
    this.router.navigate(["/crear-mascotas"]);
  }

  regresar(){
    this.router.navigate(["/menu-p"]);
  }

  informacion(mascota:any){
    let params: NavigationExtras={
      queryParams:{
        mascota:mascota
      }
    }
    this.router.navigate(["/datos-mascota"], params);
  }

  

}

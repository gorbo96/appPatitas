import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Mascota } from 'src/app/domain/mascota';
import { Vacunacion } from 'src/app/domain/vacunacion';
import { VacunasService } from 'src/app/services/vacunas.service';

@Component({
  selector: 'app-vacuna',
  templateUrl: './vacuna.page.html',
  styleUrls: ['./vacuna.page.scss'],
})
export class VacunaPage implements OnInit {

  vacunacion : Vacunacion = new Vacunacion();

  mascota:Mascota = new Mascota();

  constructor(private route: ActivatedRoute,private router: Router, private vacunaService: VacunasService) { 
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

  guardar(){
    this.vacunacion.uidMascota=this.mascota.uid;

    this.vacunaService.save(this.vacunacion);

    let params: NavigationExtras={
      queryParams:{
        mascota:this.mascota
      }
    }
    this.router.navigate(["/datos-mascota"], params);
  }

}

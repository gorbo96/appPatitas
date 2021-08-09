import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Mascota } from 'src/app/domain/mascota';
import { Medicamento } from 'src/app/domain/medicamento';
import { MedicamentosService } from 'src/app/services/medicamentos.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
})
export class MedicamentosPage implements OnInit {

  medicamento : Medicamento = new Medicamento();
  mascota:Mascota = new Mascota();

  constructor(private route: ActivatedRoute,
              private router: Router, 
              private medicamentoService: MedicamentosService,
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

  guardar(){
    this.medicamento.uidMascota=this.mascota.uid;
    this.medicamento.uidUsuario=this.user.getUser().uid;
    this.medicamentoService.save(this.medicamento);

    let params: NavigationExtras={
      queryParams:{
        mascota:this.mascota
      }
    }
    this.router.navigate(["/datos-mascota"], params);
  }
}

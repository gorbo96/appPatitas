import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../services/api-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subministros',
  templateUrl: './subministros.page.html',
  styleUrls: ['./subministros.page.scss'],
})
export class SubministrosPage implements OnInit {

  constructor(private apirest: ApiRestService,public router: Router) { }

  info : any;


  ngOnInit() {
    this.info =  this.apirest.getContactos();
  }

  volver(){
    this.router.navigate(['/menu-p']);
  }

}

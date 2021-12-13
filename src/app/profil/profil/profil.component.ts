import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profils!: any;
  MenuByProfil!: any

  constructor(private service: StoreService, private router:Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getProfil()

  }

  getProfil():void{
    this.service.getItems('profils').subscribe(
      data => {
        this.profils = data
      }
    )
  }

  goToMenu(id:number){
    this.router.navigate(['menu', id])
  }

  //utiliser activated route
  //Atob crypte
  //betoa decrypte
  

}

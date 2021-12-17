import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';
import { Menu } from '../../../model';

export interface IProfile {
  name: string,
  id: number
}
@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {
  menuForm!: FormGroup;
  profils!: any;
  menus!: any;
  priorite =[1,2,3,4,5];
  message: boolean = false;
  
  

  constructor(private formBuilder: FormBuilder, private menuService: StoreService, private route: Router) { }
  

  ngOnInit(): void {
    this.makeMenuForm()
    this.getProfil()
    this.getMenu()
  }

  makeMenuForm(): void{
    this.menuForm = this.formBuilder.group({
      libelle : ['', Validators.required],
      code : ['', Validators.required],
      icon : ['', Validators.required],
      parentId : ['', Validators.required],
      priorite : ['', Validators.required],
      profilId : ['', Validators.required],
      route : ['', Validators.required]
    })
  }

  get libelle(){
    return this.menuForm.get('libelle');
  }

  get code(){
    return this.menuForm.get('code');
  }

  get icon(){
    return this.menuForm.get('icon');
  }

  get parentId(){
    return this.menuForm.get('parentId');
  }

  get pr(){
    return this.menuForm.get('priorite');
  }

  get r(){
    return this.menuForm.get('route');
  }

  get profil(){
    return this.menuForm.get('profilId');
  }


  get f(){
    return  this.menuForm.controls;
  }

  private makeMenu(): Menu{
    const newMenu = new Menu();
    newMenu.code = this.f['code'].value;
    newMenu.icon = this.f['icon'].value;
    newMenu.libelle = this.f['libelle'].value;
    newMenu.parentId = this.f['parentId'].value;
    newMenu.priorite = this.f['priorite'].value;
    newMenu.profilId = this.f['profilId'].value;
    newMenu.route = this.f['route'].value;
    console.log('Menu Form ', newMenu)

    this.menuService.createItem('menus', newMenu).subscribe(
      res => {
        console.log(res);
        this.message=true;
      },
      error =>{
        alert("error")
      }
      
    )

    return newMenu;
  }

  onSubmit(){
    if(this.menuForm.invalid){
      return;
    }
    this.makeMenu();
    
  }

removeMessage(){
  this.message = false;
}

  getProfil(){
    this.menuService.getItems('profils').subscribe(
      data => {
        this.profils = data
        console.log(data)
      }
    )
  }

  getMenu(){
    this.menuService.getItems('menus').subscribe(
      data => {
        this.menus = data
        console.log(data)
      }
    )
  }
  




}

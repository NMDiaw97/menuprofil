import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/model';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {
  menuForm!: FormGroup;
  id!: number;
  menus?: Menu[];
  menu!: Menu
  priorites = [1, 2, 3, 4, 5]
  profils: any;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private menuService: StoreService) { }

  ngOnInit(): void {
    this.makeMenuForm()
    this.getProfil()
    this.getMenu()
    this.id = this.route.snapshot.params['id']
    this.menuService.getItemsById<Menu>('menus', this.id).subscribe(
      data => {
        this.menu = data
        console.log("Menu from database", data)
        this.onEditMenu(this.menu);
      },
      error => {
        console.log(error);

      });
  }

  makeMenuForm(): void {
    this.menuForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      code: ['', Validators.required],
      icon: ['', Validators.required],
      parentId: ['', Validators.required],
      priorite: ['', Validators.required],
      profilId: ['', Validators.required],
      route: ['', Validators.required]
    })
  }

  get f() {
    return this.menuForm.controls;
  }


  private onEditMenu(menu: Menu): void {
    this.menuForm.get('libelle')?.setValue(menu.libelle);
    this.menuForm.get('code')?.setValue(menu.code);
    this.menuForm.get('icon')?.setValue(menu.icon);
    this.menuForm.get('parentId')?.setValue(menu.parentId)
    this.menuForm.get('priorite')?.setValue(menu.priorite);
    this.menuForm.get('profilId')?.setValue(menu.profilId);
    this.menuForm.get('route')?.setValue(menu.route);
    console.log("new Menu", menu)
  }


  onSubmit() {
    this.updateMenu();
  }

  updateMenu() {
    const updatedMenu = new Menu()
    updatedMenu.libelle = this.f['libelle'].value;
    updatedMenu.code = this.f['code'].value;
    updatedMenu.icon = this.f['icon'].value;
    updatedMenu.parentId = this.f['parentId'].value;
    updatedMenu.priorite = this.f['priorite'].value;
    updatedMenu.profilId = this.f['profilId'].value;
    updatedMenu.route = this.f['route'].value;
    console.log('menu ', updatedMenu )
    this.menuService.updateItem<Menu>("menus", updatedMenu, this.id).subscribe(
      data => {
        console.log("saved menu",data)
      }
    );
  }

  getProfil() {
    this.menuService.getItems('profils').subscribe(
      data => {
        this.profils = data
        console.log(data)
      }
    )
  }

  getMenu() {
    this.menuService.getItems<Menu>('menus').subscribe(
      data => {
        this.menus = data
        console.log("Tout les menus", data)
      }
    )
  }


}

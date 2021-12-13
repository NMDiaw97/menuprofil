import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/model';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  profilData!: any
  MenuByProfil!: any
  id!: number
  dataSource = new MatTableDataSource<Menu>();
  displayColumns = ['libelle', 'Code', 'Icon', 'Route', 'Parent', 'Priorite', 'Profil', 'action']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private route: ActivatedRoute, private service: StoreService) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getMenuByProfil(this.id)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMenuByProfil(id: number) {
    this.service.getMenuByProfil<Menu>('getInfo', id).subscribe(
      data => {
        this.MenuByProfil = data
        this.dataSource.data = data
        console.log("Menu", data);

      }
    )
  }

  update(id: any) {
    this.router.navigate(['update', id])
  }

  deleteMenu(id: any) {
    this.service.deleteItem<Menu>('menus', id).subscribe(
      data => {
        console.log(data);
      }
    )
  }

}

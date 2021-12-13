import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }
  createItem<Type>(url:string, data: Type): Observable<Type>{
    return this.http.post<Type>(`${environment.apiUrl}/${url}`,data);
  }

  updateItem<Type>(url:string, data: Type, id: number): Observable<Type>{
    return this.http.put<Type>(`${environment.apiUrl}/${url}/${id}`,data);

  }
  deleteItem<Type>(url: string, dataId: number):Observable<Type> {
    return this.http.delete<Type>(`${environment.apiUrl}/${url}/${dataId}`);
  } 

  getItems<Type>(url: string): Observable<Type[]>{
    return this.http.get<Type[]>(`${environment.apiUrl}/${url}`);
    
  }

  getMenuByProfil<Type>(url: string, id:number): Observable<Type[]> {
    return this.http.get<Type[]>(`${environment.apiUrl}/${url}/${id}`);
  }

  getItemsById<Type>(url: string, id:number): Observable<Type>{
    return this.http.get<Type>(`${environment.apiUrl}/${url}/${id}`);
    
  }

}

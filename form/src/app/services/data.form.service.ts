import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { dataForm } from '../biz/data/admin/dataForm'
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

/*/
* @title
* @Author juanmahecha9
*/

@Injectable({
  providedIn: 'root'
})
export class DataFormService {
  private url = "http://localhost:4000";

  public dataFormSelect!: dataForm;
  public dataForm!: dataForm[];
  constructor(private http: HttpClient, private router: Router) { }

  indexGet() {
    return this.http.get<any>(this.url);
  }

  indexGetId(id: any) {
    return this.http.get<dataForm>(this.url+"/byId/"+id);
  }

   indexPost(data: dataForm) {
    return this.http.post(this.url, data)
  } 

  indexDelete(id: string) {
    return this.http.delete(`${this.url}/borrar/${id}`)
  }

  indexPut(id: string, data: any): Observable<dataForm>{
    return this.http.put(`${this.url}/${id}`, data)
  }

}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisabledDataService {
   private readonly _httpclient = inject(HttpClient);
   getDisabledDate(id:number):Observable<any>{
  //  const token = localStorage.getItem('token');
  // //  const headers = { Authorization: `Bearer ${token}` };
  //  return this._httpclient.get(`https://localhost:7037/api/Disabled/${id}`, {headers: headers});
   return this._httpclient.get(`https://localhost:7037/api/Disabled/${id}`);

   }
    getHelperData(id:number):Observable<any>{
   const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
return this._httpclient.get(`https://localhost:7037/api/Helper/${id}`, {headers});
 
  }

  getDisabledDataByUserId(userId:string):Observable<any>{
 const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this._httpclient.get(`https://localhost:7037/api/UserProfile/patient?userId=${userId}`, {headers})
  }
  
}

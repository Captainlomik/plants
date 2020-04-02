import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, FbCreateResponse } from './interfaces';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class orderServices 
{ search = '';
    constructor (private http:HttpClient) {  }

    add(order:Order):Observable<Order>{
        return this.http.post(`${environment.fbDbUrl}order.json`, order)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...order,
                    id: response.name
                }
            }))
    }

   getAll():Observable<Order[]>
   {
       return this.http.get(`${environment.fbDbUrl}order.json`)
       .pipe(map((response: { [key: string]: any }) => {
        return Object.keys(response)
            .map(key => ({
                ...response[key],
                id: key
            }))
    }))
   }
}
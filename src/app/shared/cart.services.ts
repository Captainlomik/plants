import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, FbCreateResponse } from './interfaces';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class cartServices{

    constructor (private http:HttpClient){}
    add(product){
        return this.http.post(`${environment.fbDbUrl}cart.json`, product)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...product,
                    id: response.name
                }
            }))
    }

    getAll()
    {
        return this.http.get(`${environment.fbDbUrl}cart.json`)
        .pipe(map((response: { [key: string]: any }) => {
            return Object.keys(response)
                .map(key => ({
                    ...response[key],
                    id: key
                }))
        }))
    }

}
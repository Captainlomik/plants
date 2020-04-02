import { HttpClient } from '@angular/common/http';
import { Email, FbCreateResponse } from './interfaces';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class emailServices
{
    constructor (private http:HttpClient){}
    add(email:Email):Observable<Email>{
        return this.http.post(`${environment.fbDbUrl}email.json`, email)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...email,
                    id: response.name
                }
            }))
    }

}
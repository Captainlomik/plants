import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class UploadService {
    SERVER_URL: string = "gs://plant-867f5.appspot.com";  
    constructor(private httpClient: HttpClient) { }
    
upload(formData){
return this.httpClient.post<any>(this.SERVER_URL, formData,
    {
        reportProgress:true,
        observe:'events'
    })
}

}

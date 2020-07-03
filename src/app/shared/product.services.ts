import { environment } from './../../environments/environment.prod';
import { Product, FbCreateResponse } from 'src/app/shared/interfaces';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class ProductServices {
    constructor(private http: HttpClient) { }

    create(product: Product): Observable<Product> { //добавление
        return this.http.post(`${environment.fbDbUrl}product.json`, product)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...product,
                    id: response.name
                }

            }))

    }

    getAll(): Observable<Product[]> {//вывод всех постов
        return this.http.get(`${environment.fbDbUrl}product.json`)
            .pipe(map((response: { [key: string]: any }) => {
                return Object.keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key
                    }))
            }))
    }

    remove(id: string): Observable<void> //удаление
    {
        return this.http.delete<void>(`${environment.fbDbUrl}/product/${id}.json`)
    }


    getById(id: string) {//получение по ID для редактирования
        return this.http.get(`${environment.fbDbUrl}/product/${id}.json`)
            .pipe(map((product: Product) => { //Парсинг данных
                return {
                    ...product,
                    id
                }
            }))
    }

    update(product: Product): Observable<Product> {//редатирование
        return this.http.patch<Product>(`${environment.fbDbUrl}/product/${product.id}.json`, product)
    }

    getProduct() {
        return this.http.get(`${environment.fbDbUrl}product.json`)
    }
}


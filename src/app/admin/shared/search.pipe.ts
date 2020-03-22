import { Product } from 'src/app/shared/interfaces';
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name:'searchProduct'
})
export class SearchPipe implements PipeTransform{
    transform(products: Product[], search='', ):Product[] {
       if(search==' '){
return products;
       }
       return products.filter(prod => {
           return prod.title.toLowerCase().includes(search.toLowerCase().trim())
       })
    }
    
}
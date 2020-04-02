import { Order } from './../../shared/interfaces';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'orderSearch'
})
export class OrderPipe implements PipeTransform
{
    transform(order: Order[], search='') {
      return order.filter(order=>
        {
            return order.surname.toLowerCase().includes(search.toLowerCase().trim()) ||
            order.id.toLowerCase().includes(search.toLowerCase().trim())||
            order.phone.toLowerCase().includes(search.toLowerCase().trim())
        })
    }
    
}
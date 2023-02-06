import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
subject =new Subject();
constructor() { }
sendMsg(product:any)
{
  //console.log(product)
  this.subject.next(product);
}
getMsg()
{
  return this.subject.asObservable()
}

}

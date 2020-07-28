import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor() { }

  showTodayDate() {
    let ndate = new Date();
    return ndate;
 }
}

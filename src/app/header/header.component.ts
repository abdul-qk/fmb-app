import { Component, OnInit } from '@angular/core';
// import { DashboardComponent } from '../dashboard/dashboard.component'
import { Scanned } from '../scanned';

import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiService } from '../api.service';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    // private data: DashboardComponent,
    private apiService: ApiService,
    private myservice: MyserviceService
  ) { }

  //Get date from service
  todaydate = this.myservice.showTodayDate();
  dateTod = this.todaydate.toISOString();
  today = Math.floor(this.todaydate.getTime() / 1000.0);

  scannedList: Scanned[];
  serializedDate = new FormControl(this.dateTod);

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    // console.log(event.value);

    this.today = Math.floor(new Date(event.value).getTime() / 1000.0)

    // API
    this.apiService.readScanned(this.todaydate).subscribe((scannedList: Scanned[]) => {
      this.scannedList = scannedList;
      console.log(this.scannedList);
    })

    // this.apiService.readRegistrants(this.today).subscribe((userList: User[]) => {
    //   this.userList = userList;
    //   // console.log(this.userList);
    // })

    // this.apiService.readPaused(this.today).subscribe((pausedList: Paused[]) => {
    //   this.pausedList = pausedList;
    //   // console.log(this.pausedList);
    // })

    // this.apiService.readNotRegistered(this.today).subscribe((notUserList: User[]) => {
    //   this.notUserList = notUserList;
    //   // console.log(this.notUserList);
    // })
  }


  ngOnInit(): void {
    // this.data.currentSList.subscribe(message => this.scannedList = message)
    // console.log(this.scannedList);
  }

}

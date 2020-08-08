import { Component, OnInit } from '@angular/core';

import { Report } from '../report';
import { ApiService } from '../api.service';


import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  today = Math.floor(new Date().getTime() / 1000.0)
  dateTod = new Date().toISOString()
  serializedDate = new FormControl(this.dateTod);

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    // console.log(event.value);

    this.today = Math.floor(new Date(event.value).getTime() / 1000.0)

    

    // API
    this.apiService.readFriday(this.today).subscribe((friCount: Report[]) => {
      this.friCount = friCount;
      // console.log(this.friCount);
    })

    this.apiService.readPaxRegistered(this.today).subscribe((paxReg: Report[]) => {
      this.paxReg = paxReg;
      // console.log(this.paxReg);
    })

    this.apiService.readPaxUnRegistered(this.today).subscribe((paxUnreg: Report[]) => {
      this.paxUnreg = paxUnreg;
      // console.log(this.paxUnreg);
    })

    this.apiService.readTukRegistered(this.today).subscribe((tukReg: Report[]) => {
      this.tukReg = tukReg;
      // console.log(this.tukReg);
    })

    this.apiService.readTukUnregistered(this.today).subscribe((tukUnreg: Report[]) => {
      this.tukUnreg = tukUnreg;
      // console.log(this.tukUnreg);
    })

    this.apiService.readTukRegisteredNT(this.today).subscribe((tukRegNT: Report[]) => {
      this.tukRegNT = tukRegNT;
      // console.log(this.tukRegNT);
    })

    this.apiService.readRegistered(this.today).subscribe((reg: Report[]) => {
      this.reg = reg;
      console.log(this.reg);
    })

    this.apiService.readUnregistered(this.today).subscribe((unreg: Report[]) => {
      this.unreg = unreg;
      console.log(this.unreg);
    })

  }

  // --- ArrayList to store API CALLS --- //
  friCount: Report[];
  paxReg: Report[];
  paxUnreg: Report[];
  tukReg: Report[];
  tukUnreg: Report[];
  tukRegNT: Report[];
  reg: Report[];
  unreg: Report[];

  ngOnInit(): void {

    this.apiService.readFriday(this.today).subscribe((friCount: Report[]) => {
      this.friCount = friCount;
      // console.log(this.friCount);
    })

    this.apiService.readPaxRegistered(this.today).subscribe((paxReg: Report[]) => {
      this.paxReg = paxReg;
      // console.log(this.paxReg);
    })

    this.apiService.readPaxUnRegistered(this.today).subscribe((paxUnreg: Report[]) => {
      this.paxUnreg = paxUnreg;
      // console.log(this.paxUnreg);
    })

    this.apiService.readTukRegistered(this.today).subscribe((tukReg: Report[]) => {
      this.tukReg = tukReg;
      // console.log(this.tukReg);
    })

    this.apiService.readTukUnregistered(this.today).subscribe((tukUnreg: Report[]) => {
      this.tukUnreg = tukUnreg;
      // console.log(this.tukUnreg);
    })

    this.apiService.readTukRegisteredNT(this.today).subscribe((tukRegNT: Report[]) => {
      this.tukRegNT = tukRegNT;
      // console.log(this.tukRegNT);
    })

    this.apiService.readRegistered(this.today).subscribe((reg: Report[]) => {
      this.reg = reg;
      // console.log(this.reg);
    })

    this.apiService.readUnregistered(this.today).subscribe((unreg: Report[]) => {
      this.unreg = unreg;
      console.log(this.unreg);
    })

  }

}

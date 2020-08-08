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

      // COUNT TOTALS //
      for (var i = 0; i < this.friCount.length; i++) {
        var add = this.friCount[i].packqtyCount;
        this.friCountTotal = this.friCountTotal + Number(add)
      }
    })

    this.apiService.readPaxRegistered(this.today).subscribe((paxReg: Report[]) => {
      this.paxReg = paxReg;
      // console.log(this.paxReg);

      // COUNT TOTALS //
      for (var i = 0; i < this.paxReg.length; i++) {
        var add = this.paxReg[i].packqtyCount;
        this.paxRegTotal = this.paxRegTotal + Number(add)
      }
    })

    this.apiService.readPaxUnRegistered(this.today).subscribe((paxUnreg: Report[]) => {
      this.paxUnreg = paxUnreg;
      // console.log(this.paxUnreg);

      // COUNT TOTALS //
      for (var i = 0; i < this.paxUnreg.length; i++) {
        var add = this.paxUnreg[i].packqtyCount;
        this.paxUnregTotal = this.paxUnregTotal + Number(add)
      }
    })

    this.apiService.readTukRegistered(this.today).subscribe((tukReg: Report[]) => {
      this.tukReg = tukReg;
      console.log(this.tukReg);

      // COUNT TOTALS //
      for (var i = 0; i < this.tukReg.length; i++) {
        var add = this.tukReg[i].count;
        this.tukRegTotal = this.tukRegTotal + Number(add)
      }

    })

    this.apiService.readTukUnregistered(this.today).subscribe((tukUnreg: Report[]) => {
      this.tukUnreg = tukUnreg;
      // console.log(this.tukUnreg);

      // COUNT TOTALS //
      for (var i = 0; i < this.tukUnreg.length; i++) {
        var add = this.tukUnreg[i].count;
        this.tukUnregTotal = this.tukUnregTotal + Number(add)
      }
    })

    this.apiService.readTukRegisteredNT(this.today).subscribe((tukRegNT: Report[]) => {
      this.tukRegNT = tukRegNT;
      // console.log(this.tukRegNT);

      // COUNT TOTALS //
      for (var i = 0; i < this.tukRegNT.length; i++) {
        var add = this.tukRegNT[i].count;
        this.tukRegNTTotal = this.tukRegNTTotal + Number(add)
      }
    })

    this.apiService.readRegistered(this.today).subscribe((reg: Report[]) => {
      this.reg = reg;
      console.log(this.reg);
    })

    this.apiService.readUnregistered(this.today).subscribe((unreg: Report[]) => {
      this.unreg = unreg;
      console.log(this.unreg);
      this.total = this.tukRegTotal + this.tukUnregTotal + this.tukRegNTTotal
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

  // Totals
  tukRegTotal = 0
  tukUnregTotal = 0
  tukRegNTTotal = 0
  paxRegTotal = 0
  paxUnregTotal = 0
  friCountTotal = 0
  total = 0

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
      console.log(this.tukReg);
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

    // COUNT TOTALS //
    var tukRegTotal

    for (let i = 0; i < this.tukReg.length; i++) {
      var add = this.tukReg[i].count
      tukRegTotal += add
    }

  }

}

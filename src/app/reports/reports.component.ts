import { Component, OnInit } from '@angular/core';
import { Tuk } from '../tuk';
import { Scanned } from '../scanned';
import { User } from '../user';
import { Paused } from '../paused';
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
    this.apiService.readScanned(this.today).subscribe((scannedList: Scanned[]) => {
      this.scannedList = scannedList;
      this.scannedListLength = scannedList.length;
      this.updateCount(this.scannedList);
      // console.log(this.scannedList);
    })

    this.apiService.readRegistrants(this.today).subscribe((userList: User[]) => {
      this.userList = userList;
      this.userListLength = userList.length;
      // console.log(this.userList);
    })

    this.apiService.readPaused(this.today).subscribe((pausedList: Paused[]) => {
      this.pausedList = pausedList;
      // console.log(this.pausedList);
    })

    this.apiService.readNotRegistered(this.today).subscribe((notUserList: User[]) => {
      this.notUserList = notUserList;
      // console.log(this.notUserList);
    })
  }

  //Tuk ID count
  tukOne;
  tukTwo;
  tukThree;
  tukFour;
  tukFive;
  tukSix;
  tukSeven;
  tukEight;
  tukNine;
  tukTen;
  tukEleven;

  //Total Count
  scannedListLength;
  userListLength;

  //All API called arraylists
  tukList: Tuk[];

  scannedList: Scanned[];

  userList: User[];
  pausedList: Paused[];
  notUserList: User[];
  updateScanItem: Scanned[];

  ngOnInit(): void {

    this.apiService.readTuks().subscribe((tukList: Tuk[]) => {
      this.tukList = tukList;
      // console.log(this.tukList);
    })

    this.apiService.readRegistrants(this.today).subscribe((userList: User[]) => {
      this.userList = userList;
      this.userListLength = userList.length;
      // console.log(this.userList);
    })

    this.apiService.readScanned(this.today).subscribe((scannedList: Scanned[]) => {
      this.scannedList = scannedList;
      this.scannedListLength = scannedList.length;
      this.updateCount(this.scannedList);
      // console.log(this.scannedList);

    })

    this.apiService.readPaused(this.today).subscribe((pausedList: Paused[]) => {
      this.pausedList = pausedList;
      // console.log(this.pausedList);
    })

    this.apiService.readNotRegistered(this.today).subscribe((notUserList: User[]) => {
      this.notUserList = notUserList;
      // console.log(this.notUserList);
    })

  }

  updateCount(arr) {

    // for (var i = 1; i <= 11; i++) {
    //   var filtered_i = arr.filter(function (d) {
    //     return d.tuk_id === "'" + i + "'";
    //   });
    //   this.tuk_i
    //   this.tukOne = filteredOne.length;
    // }

    //Tuk One Count
    var filteredOne = arr.filter(function (d) {
      return d.tuk_id === "1";
    });
    this.tukOne = filteredOne.length;

    //Tuk One Count
    var filteredTwo = arr.filter(function (d) {
      return d.tuk_id === "2";
    });
    this.tukTwo = filteredTwo.length;

    //Tuk One Count
    var filteredThree = arr.filter(function (d) {
      return d.tuk_id === "3";
    });
    this.tukThree = filteredThree.length;

    //Tuk One Count
    var filteredFour = arr.filter(function (d) {
      return d.tuk_id === "4";
    });
    this.tukFour = filteredFour.length;

    //Tuk One Count
    var filteredFive = arr.filter(function (d) {
      return d.tuk_id === "5";
    });
    this.tukFive = filteredFive.length;

    //Tuk One Count
    var filteredSix = arr.filter(function (d) {
      return d.tuk_id === "6";
    });
    this.tukSix = filteredSix.length;

    //Tuk One Count
    var filteredSeven = arr.filter(function (d) {
      return d.tuk_id === "7";
    });
    this.tukSeven = filteredSeven.length;

    //Tuk One Count
    var filteredEight = arr.filter(function (d) {
      return d.tuk_id === "8";
    });
    this.tukEight = filteredEight.length;

    //Tuk One Count
    var filteredNine = arr.filter(function (d) {
      return d.tuk_id === "9";
    });
    this.tukNine = filteredNine.length;

    //Tuk One Count
    var filteredTen = arr.filter(function (d) {
      return d.tuk_id === "10";
    });
    this.tukTen = filteredTen.length;

    //Tuk One Count
    var filteredEleven = arr.filter(function (d) {
      return d.tuk_id === "11";
    });
    this.tukEleven = filteredEleven.length;

  }

}

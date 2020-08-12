import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';

import { ApiService } from '../api.service';

import { User } from '../user';
import { Tuk } from '../tuk';
import { Scanned } from '../scanned';
import { Paused } from '../paused';

import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { ScannedDialogComponent } from '../scanned-dialog/scanned-dialog.component';
import { NotTakingDialogComponent } from '../not-taking-dialog/not-taking-dialog.component';
import { NotListedDialogComponent } from '../not-listed-dialog/not-listed-dialog.component';
import { InvalidSabeelDialogComponent } from '../invalid-sabeel-dialog/invalid-sabeel-dialog.component';
import { NotScannedListComponent } from '../not-scanned-list/not-scanned-list.component';
import { NotTakingListComponent } from '../not-taking-list/not-taking-list.component';
import { NotRegisteredDialogComponent } from '../not-registered-dialog/not-registered-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dtOptions: any = {};
  checkoutForm;
  today = Math.floor(new Date().getTime() / 1000.0)
  dateTod = new Date().toISOString()
  serializedDate = new FormControl(this.dateTod);

  events: string[] = [];

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.checkoutForm = this.formBuilder.group({
      tuk_id: '',
      debcode: ''
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    // console.log(event.value);

    this.today = Math.floor(new Date(event.value).getTime() / 1000.0)

    // API
    this.apiService.readScanned(this.today).subscribe((scannedList: Scanned[]) => {
      this.scannedList = scannedList;
      // console.log(this.scannedList);
    })

    this.apiService.readRegistrants(this.today).subscribe((userList: User[]) => {
      this.userList = userList;
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

  openDialogScanned(form) {
    this.dialog.open(ScannedDialogComponent, {
      data: {
        ulist: this.userList,
        slist: this.scannedList,
        sabeelno: form.debcode,
        tukno: form.tuk_id,
        form: form,
        today: this.today
      }
    });
    // console.log(this.today);
    // console.log(form.debcode);
  }

  openDialogNotTaking(form) {
    this.dialog.open(NotTakingDialogComponent, {
      data: {
        ulist: this.userList,
        slist: this.scannedList,
        sabeelno: form.debcode,
        tukno: form.tuk_id,
        form: form,
        today: this.today
      }
    });
    // console.log(form.debcode);
  }

  openDialogNotListed(form) {
    this.dialog.open(NotListedDialogComponent, {
      data: {
        ulist: this.userList,
        slist: this.scannedList,
        sabeelno: form.debcode,
        tukno: form.tuk_id,
        form: form,
        today: this.today
      }
    });
  }

  openDialogInvalidSabeel(form) {
    this.dialog.open(InvalidSabeelDialogComponent, {
      data: {
        sabeelno: form.debcode,
        today: this.today
      }
    });
  }

  openDialogNotScannedList(tuk_id) {
    this.dialog.open(NotScannedListComponent, {
      data: {
        tukid: tuk_id,
        today: this.today
      }
    });
  }

  openDialogNotTakingList(tuk_id) {
    this.dialog.open(NotTakingListComponent, {
      data: {
        tukid: tuk_id,
        today: this.today
      }
    });
  }

  openDialogNotRegistered(form) {
    this.dialog.open(NotRegisteredDialogComponent, {
      data: {
        ulist: this.userList,
        slist: this.scannedList,
        sabeelno: form.debcode,
        tukno: form.tuk_id,
        form: form,
        today: this.today
      }
    });
  }

  playAudio() {
    console.log("Check");
    let audio = new Audio();
    audio.src = "../../assets/alert.mp3";
    // audio.load();
    audio.play();
  }

  sabeel: sabeel;

  //All API called arraylists
  tukList: Tuk[];

  scannedList: Scanned[];

  userList: User[];
  pausedList: Paused[];
  notUserList: User[];
  updateScanItem: Scanned[];

  //Count Variables
  tukScanned;
  tukNotScanned;


  ngOnInit(): void {
    var cookie = this.cookieService.get('login_user');
    console.log('Cookie Value', cookie);

    if (cookie != "") {
      const that = this;

      this.sabeel = {
        debcode: "",
      };

      this.apiService.readTuks().subscribe((tukList: Tuk[]) => {
        this.tukList = tukList;
        // console.log(this.tukList);
      })

      this.apiService.readRegistrants(this.today).subscribe((userList: User[]) => {
        this.userList = userList;
        // console.log(this.userList);
      })

      this.apiService.readScanned(this.today).subscribe((scannedList: Scanned[]) => {
        this.scannedList = scannedList;
        console.log(this.scannedList);
      })

      this.apiService.readPaused(this.today).subscribe((pausedList: Paused[]) => {
        this.pausedList = pausedList;
        // console.log(this.pausedList);
      })

      this.apiService.readNotRegistered(this.today).subscribe((notUserList: User[]) => {
        this.notUserList = notUserList;
        // console.log(this.notUserList);
      })

      this.dtOptions = {
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
        buttons: [
          'print',
          'excel',
        ]
      };
    } else {
      this.router.navigate(['']);
    }

  }

  logout(){
    this.cookieService.deleteAll();
    this.router.navigate(['']);
  }

  updateCount(tuk_id) {
    var arr = this.userList;
    var arr2 = this.scannedList;
    var count;
    //Update the count locally
    var filtered = arr.filter(function (d) {
      count++;
      return d.tuk_id === tuk_id;
    });

    var filtered2 = arr2.filter(function (d) {
      count++;
      return d.tuk_id === tuk_id;
    });

    this.tukNotScanned = filtered.length;
    this.tukScanned = filtered2.length;
  }

  onSubmit(f: NgForm) {
    var formValue = f.value;
    var debcodeUp = formValue.debcode.toUpperCase();
    console.log(debcodeUp);

    var check = this.search(debcodeUp, this.scannedList); //Check for debcode present in the scanned list
    var pause = this.search(debcodeUp, this.pausedList); //Check for debcode present in the paused list
    var index = this.search(debcodeUp, this.userList); //Check for debcode present in the registration/not-scanned list
    var notreg = this.search(debcodeUp, this.notUserList); //Check for debcode present in the registration/not-scanned list

    //Checks for scanned list
    if (
      (this.userList.some(e => e.debcode === debcodeUp))
      || (this.scannedList.some(e => e.debcode === debcodeUp))
      || (this.pausedList.some(e => e.debcode === debcodeUp))
    ) {
      if (notreg == null) {
        if (check == null) {
          if (pause == null) {
            //checks for user list
            if (this.userList[index].tuk_id == formValue.tuk_id) {
              //Call API
              var newList = {
                reg_status: this.userList[index].reg_status,
                debcode: debcodeUp,
                tuk_id: formValue.tuk_id
              }
              // this.updateScanItem.push(newList);
              this.apiService.updateScan(newList).subscribe((scanned: Scanned) => {
                console.log("Scanned Data Updated", scanned);
                console.log(this.scannedList);
                //Update user list and scanned list
                this.update(index, this.userList);
              });

              this.apiService.readScanned(this.today).subscribe((scannedList: Scanned[]) => {
                this.scannedList = scannedList;
                console.log(this.scannedList);
              })

              this.updateCount(formValue.tuk_id);

            } else {
              this.playAudio();
              this.openDialogNotListed(formValue);
            }
          } else {
            this.playAudio();
            this.openDialogNotTaking(formValue);
          }
        } else {
          this.playAudio();
          this.openDialogScanned(formValue);
        }
      } else {
        this.playAudio();
        this.openDialogNotRegistered(formValue);
      }
    } else {
      this.playAudio();
      this.openDialogInvalidSabeel(formValue);
    }

    // Set the default debcode to blank after submit
    this.setDefaults();

  }

  deletePolicy(id) {
    this.apiService.deletePolicy(id.scan_id).subscribe((scanned: Scanned) => {
      console.log("Scanned row deleted, ", scanned);
      var index = this.searchScanId(id, this.scannedList);
      this.userList.push(this.scannedList[index]);
      this.scannedList.splice(index, 1);

      this.apiService.readRegistrants(this.today).subscribe((userList: User[]) => {
        this.userList = userList;
        // console.log(this.userList);
      })

      // var tuk_id = id.tuk_id;
      // console.log(id.tuk_id);
      // this.updateCount(tuk_id);
      // location.reload();

    });
  }

  setDefaults() {
    this.sabeel = {
      debcode: ""
    };
  }

  searchScanId(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].scan_id === nameKey) {
        return i;
      }
    }
  }

  search(nameKey, myArray) {
    // console.log(myArray[i].debcode);
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].debcode === nameKey) {
        return i;
      }
    }
  }

  update(i, myArray) {
    this.scannedList.unshift(myArray[i]);
    myArray.splice(i, 1);
    // console.log(myArray[i]);
  }
}

export class sabeel {
  debcode: string;
}

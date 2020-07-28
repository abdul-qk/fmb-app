import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Scanned } from '../scanned';
import { ApiService } from '../api.service';

import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-not-listed-dialog',
  templateUrl: './not-listed-dialog.component.html',
  styleUrls: ['./not-listed-dialog.component.scss']
})
export class NotListedDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService, ) { }

  ngOnInit(): void {
  }

  changeTemp(debcode) {
    var userlist = this.data.ulist;
    var scanlist = this.data.slist;
    var tukid = this.data.tukno;

    console.log(scanlist);

    for (var i = 0; i < userlist.length; i++) {
      if (userlist[i].debcode === debcode) {
        userlist[i].tuk_id = tukid;
        console.log(userlist[i]);
        var index = i;

        // Call API
        this.apiService.updateScan(this.data.form).subscribe((scanned: Scanned) => {
          console.log("Scanned Data Updated", scanned);
          //Update user list and scanned list
          this.data.slist.push(this.data.ulist[index]);
          this.data.ulist.splice(index, 1);
          console.log(this.data.ulist[index]);
          console.log(this.data.slist);
        });
      }
    }

    // console.log("Scan List: " + scanlist);
  }

  changePerm(debcode) {
    var userlist = this.data.ulist;
    var scanlist = this.data.slist;
    var tukid = this.data.tukno;

    console.log(scanlist);

    for (var i = 0; i < userlist.length; i++) {
      if (userlist[i].debcode === debcode) {
        userlist[i].tuk_id = tukid;
        console.log(userlist[i]);
        var index = i;

        // Call API to update Scan table
        this.apiService.updateScan(this.data.form).subscribe((scanned: Scanned) => {
          console.log("Scanned Data Updated Temporarily", scanned);
          //Update user list and scanned list
          this.data.slist.push(this.data.ulist[index]);
          this.data.ulist.splice(index, 1);
          console.log(this.data.ulist[index]);
          console.log(this.data.slist);
        });

        // Call API to update Registrations table
        this.apiService.updateTuk(this.data.form).subscribe((scanned: Scanned) => {
          console.log("Scanned Data Updated Permanently", scanned);
          //Update user list and scanned list
        });
      }
    }
  }

}

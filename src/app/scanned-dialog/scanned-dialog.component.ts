import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Scanned } from '../scanned';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-scanned-dialog',
  templateUrl: './scanned-dialog.component.html',
  styleUrls: ['./scanned-dialog.component.scss']
})
export class ScannedDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  addAnyway(debcode) {
    var userlist = this.data.ulist;
    var scanlist = this.data.slist;
    var tukid = this.data.tukno;

    console.log(userlist);

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

    console.log("Scan List: " + scanlist);
    
  }

}

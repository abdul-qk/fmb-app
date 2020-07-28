import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../user';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-not-scanned-list',
  templateUrl: './not-scanned-list.component.html',
  styleUrls: ['./not-scanned-list.component.scss']
})
export class NotScannedListComponent implements OnInit {

  table1Options: any = {};
  // today = Math.floor(new Date().getTime() / 1000.0)

  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  userList: User[];

  ngOnInit(): void {

    this.apiService.readRegistrants(this.data.today).subscribe((userList: User[]) => {
      this.userList = userList;
      console.log(this.userList);
    })

    this.table1Options = {
      pagingType: 'full_numbers',
      processing: true,
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
      ]
    };

  }

}

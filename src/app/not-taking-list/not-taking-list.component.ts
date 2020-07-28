import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Paused } from '../paused';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-not-taking-list',
  templateUrl: './not-taking-list.component.html',
  styleUrls: ['./not-taking-list.component.scss']
})
export class NotTakingListComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  pausedList: Paused[];

  ngOnInit(): void {

    this.apiService.readPaused(this.data.today).subscribe((pausedList: Paused[]) => {
      this.pausedList = pausedList;
      console.log(this.pausedList);
    })

  }

}

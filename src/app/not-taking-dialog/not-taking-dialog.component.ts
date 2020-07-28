import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-not-taking-dialog',
  templateUrl: './not-taking-dialog.component.html',
  styleUrls: ['./not-taking-dialog.component.scss']
})
export class NotTakingDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public sabeel: DashboardComponent) { }

  ngOnInit(): void {
  }

}

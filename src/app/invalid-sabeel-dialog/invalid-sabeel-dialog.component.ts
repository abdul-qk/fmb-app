import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invalid-sabeel-dialog',
  templateUrl: './invalid-sabeel-dialog.component.html',
  styleUrls: ['./invalid-sabeel-dialog.component.scss']
})
export class InvalidSabeelDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}

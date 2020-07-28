import { Component, OnInit } from '@angular/core';
import { Tuk } from '../tuk';
import { Scanned } from '../scanned';
import { User } from '../user';
import { Paused } from '../paused';
import { ApiService } from '../api.service';
import { FormControl, NgForm, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-tuks',
  templateUrl: './tuks.component.html',
  styleUrls: ['./tuks.component.scss']
})
export class TuksComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  today = Math.floor(new Date().getTime() / 1000.0)
  dateTod = new Date().toISOString()
  serializedDate = new FormControl(this.dateTod);

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    // console.log(event.value);

    this.today = Math.floor(new Date(event.value).getTime() / 1000.0)
  }

  //All API called arraylists
  tukList: Tuk[];

  ngOnInit(): void {

    this.apiService.readTuks().subscribe((tukList: Tuk[]) => {
      this.tukList = tukList;
      console.log(this.tukList);
    })

  }

  onSubmit(f: NgForm){
    var formVal = f.value;
    console.log(formVal.tuk_name);
  }

}

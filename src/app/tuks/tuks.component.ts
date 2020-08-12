import { Component, OnInit } from '@angular/core';
import { Tuk } from '../tuk';
import { ApiService } from '../api.service';
import { FormControl, NgForm, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tuks',
  templateUrl: './tuks.component.html',
  styleUrls: ['./tuks.component.scss']
})
export class TuksComponent implements OnInit {

  tukForm;

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.tukForm = this.formBuilder.group({
      tuk_name: '',
      address: '',
      email: '',
      mobile: ''
    });
  }

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

    var cookie = this.cookieService.get('login_user');
    console.log('Cookie Value', cookie);

    if (cookie != "") {

      this.apiService.readTuks().subscribe((tukList: Tuk[]) => {
        this.tukList = tukList;
        console.log(this.tukList);
      })
    } else {
      this.router.navigate(['']);
    }

  }

  onSubmit(formData) {
    this.apiService.addTuk(formData).subscribe((tukList: Tuk[]) => {
      this.tukList = tukList;
      console.log(this.tukList);
    })

    this.apiService.readTuks().subscribe((tukList: Tuk[]) => {
      this.tukList = tukList;
      console.log(this.tukList);
    })

    this.tukForm.reset();

    console.log(formData);
  }

  deleteTuk(tukid) {

    this.apiService.deleteTuk(tukid).subscribe((tukList: Tuk[]) => {
      this.tukList = tukList;
      console.log(this.tukList);
    })

  }

  logout(){
    this.cookieService.deleteAll();
    this.router.navigate(['']);
  }

}

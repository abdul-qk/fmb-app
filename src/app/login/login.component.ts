import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../api.service';
import { Login } from '../login';
import { FormControl, NgForm, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private apiService: ApiService, 
              private formBuilder: FormBuilder, 
              private route: ActivatedRoute, 
              private router: Router,
              private cookieService: CookieService) {
    this.loginForm = this.formBuilder.group({
      username: '',
      pass: '',
    });
  }

  error = "";
  userList: Login[];
  userListOne: Login = { user_name: null, user_id: null, user_fullname: null, user_power: null, error: null };

  ngOnInit(): void {
  }

  onSubmit(formValue) {

    this.apiService.login(formValue).subscribe((userList: Login[]) => {
      this.userList = userList;
      console.log(this.userList['user_power']);

      var loginCookie = this.userList['user_id'];

      if (this.userList['user_power'] == 4 && this.userList['user_id'] != null) {

        this.router.navigate(['/dashboard']);
        this.cookieService.set('login_user', loginCookie, 0.25);

      } else if (this.userList['user_id'] == null) {

        this.error = "User not found. Try again!"

      } else if (this.userList['user_power'] != 4) {

        this.error = "You don't have access to this module! Please contact admin."

      } else {

        this.error = "Error! Try Again"
        
      }

    })
  }

}

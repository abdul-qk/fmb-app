import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from './user';
import { Tuk } from './tuk';
import { Scanned } from './scanned';
import { Paused } from './paused';
import { Report } from './report';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://faizulmawaid.lk/dispatch/backend";
  // PHP_API_SERVER = "http://127.0.0.1:8080";
  constructor(private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  USER_ID = this.cookieService.get('login_user')

  /*/--------------------------------------------------
                ONLINE DASHBOARD API CALLS
  --------------------------------------------------/*/
  readTuks(): Observable<Tuk[]> {
    return this.httpClient.get<Tuk[]>(`${this.PHP_API_SERVER}/api/read_tuks.php`);
  }

  readRegistrants(date): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/read_notscanned.php`, {
      params: { curDate: date }
    });
  }

  readScanned(date): Observable<Scanned[]> {
    console.log(date);
    return this.httpClient.get<Scanned[]>(`${this.PHP_API_SERVER}/api/read_scanned.php`, {
      params: { curDate: date }
    });
  }

  readPaused(date): Observable<Paused[]> {
    return this.httpClient.get<Paused[]>(`${this.PHP_API_SERVER}/api/read_paused.php`, {
      params: { curDate: date }
    });
  }

  readNotRegistered(date): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/read_notregistered.php`, {
      params: { curDate: date }
    });
  }

  /*/--------------------------------------------------
              REPORTS DASHBOARD API CALLS
  --------------------------------------------------/*/

  readFriday(date): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.PHP_API_SERVER}/reports/count_friday.php`, {
      params: { curDate: date }
    });
  }

  readPaxRegistered(date): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.PHP_API_SERVER}/reports/count_pax_reg.php`, {
      params: { curDate: date }
    });
  }

  readPaxUnRegistered(date): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.PHP_API_SERVER}/reports/count_pax_unreg.php`, {
      params: { curDate: date }
    });
  }

  readTukRegistered(date): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.PHP_API_SERVER}/reports/count_reg_tuk.php`, {
      params: { curDate: date }
    });
  }

  readTukRegisteredNT(date): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.PHP_API_SERVER}/reports/count_regnt_tuk.php`, {
      params: { curDate: date }
    });
  }

  readTukUnregistered(date): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.PHP_API_SERVER}/reports/count_unreg_tuk.php`, {
      params: { curDate: date }
    });
  }

  readRegistered(date): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.PHP_API_SERVER}/reports/read_reg.php`, {
      params: { curDate: date }
    });
  }

  readUnregistered(date): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.PHP_API_SERVER}/reports/read_unreg.php`, {
      params: { curDate: date }
    });
  }

  /*/--------------------------------------------------
          ONLINE DASHBOARD UPDATE API CALLS 
  --------------------------------------------------/*/

  updateScan(scanned) {
    console.log(this.USER_ID);
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/update_scanned.php?tuk_id=` + scanned.tuk_id + `&debcode=` + scanned.debcode + `&reg_status=` + scanned.reg_status + `&user_id=` + this.USER_ID);
  }

  updateTuk(scanned) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/update_tuk.php?tuk_id=` + scanned.tuk_id + `&debcode=` + scanned.debcode);
  }

  addTuk(tuk) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/new_tuk.php?tuk_name=` + tuk.tuk_name + `&address=` + tuk.address + `&mobile=` + tuk.mobile + `&email=` + tuk.email);
  }

  deletePolicy(id: string) {
    return this.httpClient.delete<Scanned>(`${this.PHP_API_SERVER}/api/delete_scanned.php?scan_id=` + id);
  }

  deleteTuk(id: number) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/delete_tuk.php?tuk_id=` + id);
  }

  /*/--------------------------------------------------
         LOGIN API CALL 
 --------------------------------------------------/*/
  login(user) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/login.php?username=` + user.username + `&pass=` + user.pass);
  }

}

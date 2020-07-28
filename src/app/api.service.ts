import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from './user';
import { Tuk } from './tuk';
import { Scanned } from './scanned';
import { Paused } from './paused';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://faizulmawaid.lk/dispatch/backend";
  // PHP_API_SERVER = "http://127.0.0.1:8080";
  constructor(private httpClient: HttpClient) { }

  readTuks(): Observable<Tuk[]> {
    return this.httpClient.get<Tuk[]>(`${this.PHP_API_SERVER}/api/read_tuks.php`);
  }

  readRegistrants(date): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/read_notscanned.php`, {
      params: {curDate: date}
    });
  }

  readScanned(date): Observable<Scanned[]> {
    console.log(date);
    return this.httpClient.get<Scanned[]>(`${this.PHP_API_SERVER}/api/read_scanned.php`, {
      params: {curDate: date}
    });
  }

  readPaused(date): Observable<Paused[]> {
    return this.httpClient.get<Paused[]>(`${this.PHP_API_SERVER}/api/read_paused.php`, {
      params: {curDate: date}
    });
  }

  readNotRegistered(date): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/read_notregistered.php`, {
      params: {curDate: date}
    });
  }

  updateScan(scanned) {
    // console.log(scanned);
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/update_scanned.php?tuk_id=` + scanned.tuk_id + `&debcode=` + scanned.debcode + `&reg_status=` + scanned.reg_status);
  }

  updateTuk(scanned) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/api/update_tuk.php?tuk_id=` + scanned.tuk_id + `&debcode=` + scanned.debcode);
  }
  
  deletePolicy(id: string){
    return this.httpClient.delete<User>(`${this.PHP_API_SERVER}/api/delete_scanned.php?scan_id=` + id);
  }

}

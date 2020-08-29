import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/rx';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
 

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VehicleCalculatorService {

  constructor(private http: HttpClient) { }

  calculateVehicleFinance(data) {
    return this.http.post<any>(`${environment.serverUrl}/calculateVehicleFinance`, data).pipe(
      map(response => response));
  }
}

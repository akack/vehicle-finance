import { Component, OnInit } from '@angular/core';
import { VehicleCalculatorService } from "./vehicle-calculator.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'VehicleFinaceCalculator';

  constructor(private vehicleService: VehicleCalculatorService){}

  ngOnInit() {
    

  }
}

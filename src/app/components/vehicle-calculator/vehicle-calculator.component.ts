import { Component, OnInit } from '@angular/core';
import { VehicleCalculatorService } from 'src/app/vehicle-calculator.service';
import { Loan } from "../../models/loan.model";

@Component({
  selector: 'app-vehicle-calculator',
  templateUrl: './vehicle-calculator.component.html',
  styleUrls: ['./vehicle-calculator.component.scss']
})
export class VehicleCalculatorComponent implements OnInit {
  //Decal
  public vehicleData: Loan;
  isRateOrPeriodZero = false;
  public result: Loan;
  public exceed = false;

  constructor(private vehicleService: VehicleCalculatorService) { }

  ngOnInit(): void {
    this.vehicleData = {
      Amount: 0,
      Period: 0,
      InterestRate: 0,
      Deposit: 0,
      BalloonPaymentPercentage: 0,
      BalloonPaymentAmount: 0,
      MonthlyPayment: 0,
      TotalAmountToPay: 0
    }
    this.result = {
      Amount: 0,
      Period: 0,
      InterestRate: 0,
      Deposit: 0,
      BalloonPaymentPercentage: 0,
      BalloonPaymentAmount: 0,
      MonthlyPayment: 0,
      TotalAmountToPay: 0
    }
  }

  submitData() {
    //Converting string values to numbers
    let data = {
      Amount: Number(this.vehicleData.Amount),
      Period: Number(this.vehicleData.Period),
      InterestRate: Number(this.vehicleData.InterestRate),
      Deposit: Number(this.vehicleData.Deposit),
      BalloonPaymentPercentage: Number(this.vehicleData.BalloonPaymentPercentage)
    }
    //Checking if the deposit is not greater than the price of vehicle
    if(data.InterestRate == 0 || data.Period == 0) {
      this.isRateOrPeriodZero = true;
      setTimeout(() => {
        this.isRateOrPeriodZero = false;
        }, 3000);
    }
    else if(data.Amount > data.Deposit) {
      this.exceed = false;
      this.vehicleService.calculateVehicleFinance(data)
      .subscribe(
        res => {
          console.log(res)
          this.result = res;
        },
        err=> {
          console.log("err", err)
        }
      );
    }
    else {
      this.exceed = true;
      setTimeout(() => {
        this.exceed = false;
        }, 3000);
    }
  }
}

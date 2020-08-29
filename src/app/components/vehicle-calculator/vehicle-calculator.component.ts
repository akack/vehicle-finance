import { Component, OnInit } from '@angular/core';
import { VehicleCalculatorService } from 'src/app/vehicle-calculator.service';

@Component({
  selector: 'app-vehicle-calculator',
  templateUrl: './vehicle-calculator.component.html',
  styleUrls: ['./vehicle-calculator.component.scss']
})
export class VehicleCalculatorComponent implements OnInit {
  //Decalring variables
  public vehicleData = {
    Amount: 0,
    Period: 0,
    InterestRate: 0,
    Deposit: 0,
    BalloonPaymentPercentage: 0
  }

  //Result object
  public result = {
    Amount: 0,
    Period: 0,
    InterestRate: 0,
    Deposit: 0,
    BalloonPaymentPercentage: 0,
    BalloonPaymentAmount: 0,
    TotalAmountToPay: 0,
    MonthlyPayment: 0
  };

  //Helper variables
  public exceed = false;
  public isRateOrPeriodZero = false;

  constructor(private vehicleService: VehicleCalculatorService) { }

  ngOnInit(): void {
    this.vehicleData = {
      Amount: 0,
      Period: 0,
      InterestRate: 0,
      Deposit: 0,
      BalloonPaymentPercentage: 0,
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
    if (data.Amount > data.Deposit && data.Amount != data.Deposit) {
      this.exceed = false;
      if (data.InterestRate == 0 || data.Period == 0) {
        this.isRateOrPeriodZero = true;
      } else {
        this.vehicleService.calculateVehicleFinance(data)
          .subscribe(
            res => {
              console.log(res)
              this.result = {
                Amount: res.Amount,
                Period: res.Period,
                InterestRate: res.InterestRate,
                Deposit: res.Deposit,
                BalloonPaymentPercentage: res.BalloonPaymentPercentage,
                BalloonPaymentAmount: res.BalloonPaymentAmount,
                TotalAmountToPay: res.TotalAmountToPay,
                MonthlyPayment: res.MonthlyPayment
              };
            },
            err => {
              console.log("err", err)
            }
          );
      }
    }
    else {
      this.exceed = true;
    }

  }
}

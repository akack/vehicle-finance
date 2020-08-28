import { Component, OnInit } from '@angular/core';
import { VehicleCalculatorService } from 'src/app/vehicle-calculator.service';

@Component({
  selector: 'app-vehicle-calculator',
  templateUrl: './vehicle-calculator.component.html',
  styleUrls: ['./vehicle-calculator.component.scss']
})
export class VehicleCalculatorComponent implements OnInit {

  public vehicleData = {
    Amount: 0,
    Period: 0,
    InterestRate : 0,
    Deposit: 0,
    BalloonPaymentPercentage: 0
  }

  public result  = {
    Amount: 0,
    Period: 0,
    InterestRate : 0,
    Deposit: 0,
    BalloonPaymentPercentage: 0,
    BalloonPaymentAmount: 0,
    TotalAmountToPay: 0,
    MonthlyPayment: 0
  };
  public exceed = false;
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

   
    let data = {
      Amount: Number(this.vehicleData.Amount),
      Period: Number(this.vehicleData.Period),
      InterestRate: Number(this.vehicleData.InterestRate),
      Deposit: Number(this.vehicleData.Deposit),
      BalloonPaymentPercentage: Number(this.vehicleData.BalloonPaymentPercentage)
    }

    if(data.Amount > data.Deposit) {
      this.exceed = false;
      this.vehicleService.calculateVehicleFinance(data)
      .subscribe(
        res => {
          this.result = {
            Amount: res.Amount,
            Period:res.Period,
            InterestRate : res.InterestRate,
            Deposit: res.Deposit,
            BalloonPaymentPercentage: res.BalloonPaymentPercentage,
            BalloonPaymentAmount: res.BalloonPaymentAmount,
            TotalAmountToPay: res.TotalAmountToPay,
            MonthlyPayment: res.MonthlyPayment
          };
        },
        err=> {
          console.log("err", err)
        }
      );
    }else {
      this.exceed = true;
    }
   
  }

}

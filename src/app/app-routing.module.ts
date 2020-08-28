import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleCalculatorComponent } from './components/vehicle-calculator/vehicle-calculator.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/Vehicle-Calculator',
    pathMatch:'full'
  },
  {
    path:'Vehicle-Calculator',
    component: VehicleCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

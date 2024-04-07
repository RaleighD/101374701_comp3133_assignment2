import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'employee-detail/:id', component: EmployeeDetailComponent },
  { path: 'employee-update/:id', component: EmployeeUpdateComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create-employee', component: CreateEmployeeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

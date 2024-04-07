import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService, private router: Router ) { }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response.data.getAllEmployees;
      },
      error: (error) => console.error('Error fetching employees:', error)
    });
  }

  viewEmployee(id: string) {
    this.router.navigate(['/employee-detail', id]);
  }

  navigateToAddEmployee() {
    this.router.navigate(['/create-employee']);
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        console.log('Employee deleted', response);
      },
      error: (error) => console.error('Error deleting employee:', error)
    });
  }

  showUpdateForm(employee: any) {
    this.router.navigate(['/employee-update', employee.id]);
  }



}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: [null, [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employeeService.addNewEmployee(this.employeeForm.value).subscribe({
        next: (response) => console.log('Employee created:', response),
        error: (error) => console.error('Error creating employee:', error)
      });
    }
  }
}

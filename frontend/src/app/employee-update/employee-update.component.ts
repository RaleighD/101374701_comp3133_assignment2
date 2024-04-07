import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: string;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: [null, [Validators.required, Validators.pattern(/^\d+$/)]]
    });

    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id')!;
      if (this.employeeId) {
        this.employeeService.getEmployeeById(this.employeeId).subscribe({
          next: (response) => this.employeeForm.patchValue(response.data.searchEmployeeById),
          error: (error) => console.error(error)
        });
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe({
        next: (response) => console.log('Employee updated:', response),
        error: (error) => console.error('Error updating employee:', error)
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;

      this.authService.signup(username, email, password).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup failed', error);

        }
      });
    } else {
      console.log('Signup form is not valid');
    }
  }
}

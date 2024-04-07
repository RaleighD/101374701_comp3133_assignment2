import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/graphql';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    const body = {
      query: `
        query {
          getAllEmployees {
            id
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
    };

    return this.http.post(this.baseUrl, JSON.stringify(body), { headers: this.headers });
  }

  getEmployeeById(id: string): Observable<any> {
    const body = {
      query: `
        query GetEmployeeById($id: ID!) {
          searchEmployeeById(id: $id) {
            id
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
      variables: { id },
    };

    return this.http.post(this.baseUrl, JSON.stringify(body), { headers: this.headers });
  }

  updateEmployee(id: string, input: any): Observable<any> {
    const body = {
      query: `
        mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
          updateEmployeeInfo(id: $id, input: $input) {
            id
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
      variables: { id, input },
    };

    return this.http.post(this.baseUrl, JSON.stringify(body), { headers: this.headers });
  }

  deleteEmployee(id: string): Observable<any> {
    const body = {
      query: `
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id)
        }
      `,
      variables: { id },
    };

    return this.http.post(this.baseUrl, JSON.stringify(body), { headers: this.headers });
  }

  addNewEmployee(employeeData: any): Observable<any> {
    const body = {
      query: `
        mutation AddNewEmployee($input: EmployeeInput!) {
          addNewEmployee(input: $input) {
            id
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
      variables: {
        input: employeeData,
      },
    };

    return this.http.post(this.baseUrl, JSON.stringify(body), { headers: this.headers });
  }
}

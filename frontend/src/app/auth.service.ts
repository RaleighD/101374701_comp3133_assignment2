import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/graphql';

  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  login(credentials: any): Observable<any> {
      // Define the GraphQL mutation
      const query = `
        query login($username: String!, $password: String!) {
          login(usernaml: $username, password: $password) {
            user {
              id
              name
              email
            }
          }
        }
      `;

      // Prepare the request body with your query and variables
      const body = {
        query,
        variables: {
          username: credentials.username,
          password: credentials.password,
        },
      };

      // Set HTTP headers
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      // Perform the HTTP post request
      return this.http.post(this.baseUrl, body, { headers });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/graphql'; // Adjust if your endpoint differs

  constructor(private http: HttpClient) { }

  login(username: string, password: string, email?: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = {
      query: `
        query Login($credentials: LoginInput) {
          login(credentials: $credentials) {
            id
            username
            email
          }
        }
      `,
      variables: {
        credentials: {
          username,
          email,
          password,
        },
      },
    };

    return this.http.post(this.baseUrl, JSON.stringify(body), { headers });
  }

  signup(username: string, email: string, password: string): Observable<any> {
      const body = {
        query: `
          mutation {
            signup(input: { username: "${username}", email: "${email}", password: "${password}" }) {
              username
              email
            }
          }
        `
      };

      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post(this.baseUrl, JSON.stringify(body), { headers });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }
}

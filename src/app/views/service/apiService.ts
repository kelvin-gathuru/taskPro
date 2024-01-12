import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  private token = sessionStorage.getItem('token');

  constructor(private http: HttpClient) {}

  signup(formData: any): Observable<any> {
    const endpoint = `${this.baseUrl}save_rent_owner`;
    return this.http.post(endpoint, formData);
  }

  login(credentials: any): Observable<any> {
    const url = `${this.baseUrl}auth/login`;
    return this.http.post(url, credentials);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClients(): Observable<any[]> {
    const endpoint = `${this.baseUrl}listClients.php`;
   
    return this.http.get<any[]>(endpoint);
  }

  getRegions(): Observable<any[]> {
    const endpoint = `${this.baseUrl}listStations.php`;
   
    return this.http.get<any[]>(endpoint);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  private token = sessionStorage.getItem('token');

  private userId = sessionStorage.getItem('userID');

  constructor(private http: HttpClient) {}

  signup(formData: any): Observable<any> {
    const endpoint = `${this.baseUrl}auth/register`;
    return this.http.post(endpoint, formData);
  }

  login(credentials: any): Observable<any> {
    const url = `${this.baseUrl}auth/login`;
    return this.http.post(url, credentials);
  }
  getReports(projectId: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}report/projectId=${projectId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<any[]>(endpoint, { headers });
  }
  listTasks(projectId: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}getUserTasks/userId=${this.userId}/projectId=${projectId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<any[]>(endpoint, { headers});
  }
  listProjects(): Observable<any[]> {
    const endpoint = `${this.baseUrl}getProjects/userId=${this.userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<any[]>(endpoint, { headers});
  }
  createProject(project: any): Observable<any> {
    const url = `${this.baseUrl}createProject/userId=${this.userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(url, project, {headers} );
  }
  deleteProject(projectId: any): Observable<any> {
    const url = `${this.baseUrl}deleteProject/projectId=${projectId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(url, {headers} );
  }
}

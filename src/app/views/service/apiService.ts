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
  updateProject(project: any, projectId:any): Observable<any> {
    const url = `${this.baseUrl}updateProject/projectId=${projectId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(url, project, {headers} );
  }
  deleteProject(projectId: any): Observable<any> {
    const url = `${this.baseUrl}deleteProject/projectId=${projectId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(url, {headers} );
  }
  deleteMember(payload: any): Observable<any> {
    const url = `${this.baseUrl}deleteMember`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(url, payload, {headers} );
  }
  listStagesandTasks(projectId: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}allStagesAndTheirTasks/projectId=${projectId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(endpoint, { headers});
  }
  createStage(stage: any, projectId: any): Observable<any> {
    const url = `${this.baseUrl}createStage/projectId=${projectId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(url, stage, {headers} );
  }
  updateStage(stage: any): Observable<any> {
    const url = `${this.baseUrl}updateStageName`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(url, stage, {headers} );
  }
  deleteStage(stageId: any): Observable<any> {
    const url = `${this.baseUrl}deleteStage/stageId=${stageId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(url, {headers} );
  }
  createTask(task: any, projectId: any): Observable<any> {
    const url = `${this.baseUrl}createTask/userId=${this.userId}/projectId=${projectId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(url, task, {headers} );
  }
  updateTask(stage: any, taskId: any): Observable<any> {
    const url = `${this.baseUrl}updateTask/taskId=${taskId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(url, stage, {headers} );
  }

  deleteTask(taskId: any): Observable<any> {
    const url = `${this.baseUrl}deleteTask/taskId=${taskId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(url, {headers} );
  }
  listProjectMembers(projectId: any): Observable<any[]> {
    const endpoint = `${this.baseUrl}projectMembers/projectId=${projectId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(endpoint, { headers});
  }
  listUsers(): Observable<any[]> {
    const endpoint = `${this.baseUrl}users`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any[]>(endpoint, { headers});
  }
  addMemberToProject(user: any): Observable<any> {
    const url = `${this.baseUrl}addMember`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(url, user, {headers} );
  }
  assignTask(task: any): Observable<any> {
    const url = `${this.baseUrl}assignTask`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(url, task, {headers} );
  }
  deleteAssignment(task: any): Observable<any> {
    const url = `${this.baseUrl}undoAssignment`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(url, task, {headers} );
  }

  updateTaskStage(payload: any): Observable<any> {
    const url = `${this.baseUrl}updateTaskStage`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(url, payload, {headers} );
  }
}

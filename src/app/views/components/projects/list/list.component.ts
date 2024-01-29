import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/service/apiService';

@Component({
    templateUrl: './list.component.html',
    providers: [MessageService]
})
export class ListComponent implements OnInit {

    projectsDialog: boolean = false;

    project: any = {};

    selectedtasks: any[]

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    projects: any;

    deleteProjectDialog: boolean =false;

    constructor(private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {

        this.loadProjectsForListing();

        this.cols = [
            { field: 'title', header: 'Task' },
            { field: 'description', header: 'Description' },
        ];
    }

    openNew() {
        this.project = {};
        this.submitted = false;
        this.projectsDialog = true;
    }

    hideDialog() {
        this.projectsDialog = false;
    }

    editProject(project: any) {
        this.project = { ...project };
        this.projectsDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    loadProjectsForListing() {
        // Call the ApiService to fetch property data for listing
        this.apiService.listProjects().subscribe(
          (data: any) => {
            this.projects = data.data.projects;
          },
          (error) => {
            console.error('Error fetching property data:', error);
          }
        );
      }

      deleteProject(project: any) {
        this.deleteProjectDialog = true;
        this.project = { ...project };
    }

    confirmDelete() {
        
        this.apiService.deleteProject(this.project.id).subscribe(
            (result: any) => {
                if (result.status === 'OK') {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.loadProjectsForListing()
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: result.message,
                    });
                }
            },
            (error) => {
                console.error(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Something went wrong',
                });
            }
        );
        this.project = {};
        this.deleteProjectDialog = false;
    }

    saveProject(){
        this.submitted=true;

        if (this.project.title?.trim()&& this.project.description?.trim()) {
            if (this.project.id) {
                const payload = {
                    title: this.project.title,
                    description: this.project.description,
                };
                this.apiService.updateProject(payload,this.project.id).subscribe(
                    (result: any) => {
                        if (result.status === 'OK') {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadProjectsForListing()
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: result.message,
                            });
                        }
                    },
                    (error) => {
                        console.error(error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Something went wrong',
                        });
                    }
                );
            } else {
                const payload = {
                    title: this.project.title,
                    description: this.project.description,
                };
                this.apiService.createProject(payload).subscribe(
                    (result: any) => {
                        if (result.status === 'CREATED') {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadProjectsForListing()
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: result.message,
                            });
                        }
                    },
                    (error) => {
                        console.error(error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Something went wrong',
                        });
                    }
                );
            }

            this.projectsDialog = false;
            this.project = {};
        }
    }
    
    
}

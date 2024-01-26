import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/service/apiService';

@Component({
    templateUrl: './list.component.html',
    providers: [MessageService]
})
export class ListComponent implements OnInit {

    taskDialog: boolean = false;

    minDate : Date = new Date();

    task: any = {};

    selectedtasks: any[]

    submitted: boolean = false;

    cols: any[] = [];

    priority: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    tasks: any[];

    regType: { label: string; value: string; }[];
    salesType: { label: string; value: string; }[];
    projects: any;
  selectedProject: any;

    constructor(private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {
      this.loadProjectsForListing();
      

        this.cols = [
            { field: 'title', header: 'Task' },
            { field: 'description', header: 'Description' },
            { field: 'priority', header: 'Priority' },
            { field: 'dueDate', header: 'Due Date' },
            { field: 'assignedUser', header: 'Assigned User' },
        ];

        this.priority = [
            { label: 'HIGH', value: 'high' },
            { label: 'LOW', value: 'low' }
        ];

        this.regType = [
            { label: 'task', value: 'task' },
            { label: 'SALES AGENT', value: 'salesAgent' },
            { label: 'OTHERS', value: 'others' }
        ];

        this.salesType = [
            { label: 'BULK', value: 'bulk' },
            { label: 'RETAIL', value: 'retail' },
            { label: 'OTHERS', value: 'others' }
        ];
    }

    openNew() {
        this.task = {};
        this.submitted = false;
        this.taskDialog = true;
    }


    editTask(task: any) {
        this.task = { ...task };
        this.taskDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
        this.taskDialog = false;
        this.submitted = false;
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
      onProjectChange(result:any){
        this.apiService.listTasks(result.id).subscribe(
            (data: any) => {
              this.tasks = data.data.tasks;
              this.loadProjectsForListing();
            },
            (error) => {
              console.error('Error fetching property data:', error);
            }
          );
      }

    
}

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

    stageDialog: boolean =false;

    minDate : Date = new Date();

    task: any = {};

    stage: any ={};

    selectedtasks: any[]

    submitted: boolean = false;

    cols: any[] = [];

    priority: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    tasks: any[];

    regType: { label: string; value: string; }[];
    salesType: { label: string; value: string; }[];
    projects: any;
  selectedProject: any = null;
  stages: any;

    constructor(private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {
      this.loadProjectsForListing();
      console.log(this.selectedProject)

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

    addStage() {
      this.stage = {};
      this.submitted = false;
      this.stageDialog = true;
  }

    editStage(stage: any) {
      this.stage = { ...stage };
      this.stageDialog = true;
  }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    hideDialog() {
        this.taskDialog = false;
        this.stageDialog = false;
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
      loadStagesandTasks(){
        this.apiService.listStagesandTasks(this.selectedProject.id).subscribe(
          (data: any) => {
            this.stages = data.data.stages;
            this.ngOnInit();
            this.loadProjectsForListing();
          },
          (error) => {
            console.error('Error fetching  data:', error);
          }
        );
      }
      onProjectChange(result:any){
        this.apiService.listTasks(result.id).subscribe(
            (data: any) => {
              this.tasks = data.data.tasks;
              this.ngOnInit();
              this.loadProjectsForListing();
            },
            (error) => {
              console.error('Error fetching  data:', error);
            }
          );

          this.loadStagesandTasks();
      }

      saveStage(){
        this.submitted=true;

        if (this.stage.name?.trim()) {
            if (this.stage.id) {
                // @ts-ignore
                // this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                // this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                const payload = {
                    name: this.stage.name,
                    createdBy: sessionStorage.getItem("userID"),
                };
                this.apiService.createStage(payload,this.selectedProject.id).subscribe(
                    (result: any) => {
                        if (result.status === 'CREATED') {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadProjectsForListing()
                            this.loadStagesandTasks();
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

            this.stageDialog = false;
            this.stage = {};
        }
    }

    
}

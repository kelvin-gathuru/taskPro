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

    deleteStageDialog: boolean =false;

    deleteTaskDialog: boolean =false;

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

    projects: any;
  
    selectedProject: any = null;
  
    stages: any;

    selectedStage: any;

    selectedPriority: any;

    selectedDate: any;

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
      loadTasks(){
        this.apiService.listTasks(this.selectedProject.id).subscribe(
          (data: any) => {
            this.tasks = data.data.tasks;
            this.ngOnInit();
            this.loadProjectsForListing();
          },
          (error) => {
            console.error('Error fetching  data:', error);
          }
        );

      }
      onProjectChange(result:any){
        this.loadTasks();

          this.loadStagesandTasks();
      }

      saveStage(){
        this.submitted=true;

        if (this.stage.name?.trim()) {
            if (this.stage.id) {
              const payload = {
                stageId: this.stage.id,
                name: this.stage.name,
            };
            this.apiService.updateStage(payload).subscribe(
                (result: any) => {
                    if (result.status === 'OK') {
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

    deleteStage(stage: any) {
      this.deleteStageDialog = true;
      this.stage = { ...stage };
  }

  confirmDeleteStage() {
    console.log(this.stage)
      
      this.apiService.deleteStage(this.stage.id).subscribe(
          (result: any) => {
              if (result.status === 'OK') {
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
      this.stage = {};
      this.deleteStageDialog = false;
  }

  saveTask(){
    this.submitted=true;

    if (this.task.title?.trim() && this.task.description?.trim() ) {
        if (this.task.id) {
          const payload = {
            title: this.task.title,
            description: this.task.description,
            dueDate: this.selectedDate,
            priority: this.selectedPriority.value,
            stageId: this.selectedStage.id,
        };
        this.apiService.updateTask(payload, this.task.id).subscribe(
            (result: any) => {
                if (result.status === 'OK') {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.loadProjectsForListing()
                    this.loadStagesandTasks();
                    this.loadTasks();
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
                title: this.task.title,
                description: this.task.description,
                dueDate: this.selectedDate,
                priority: this.selectedPriority.value,
                stageId: this.selectedStage.id,
            };
            this.apiService.createTask(payload,this.selectedProject.id).subscribe(
                (result: any) => {
                    if (result.status === 'CREATED') {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: result.message,
                        });
                        this.loadProjectsForListing()
                        this.loadStagesandTasks();
                        this.loadTasks();
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

        this.taskDialog = false;
        this.task = {};
    }
}

  deleteTask(task: any) {
    this.deleteTaskDialog = true;
    this.task = { ...task };
}
  confirmDeleteTask() {
    console.log(this.task)
      
      this.apiService.deleteTask(this.task.id).subscribe(
          (result: any) => {
              if (result.status === 'OK') {
                  this.messageService.add({
                      severity: 'success',
                      summary: 'Success',
                      detail: result.message,
                  });
                  this.loadProjectsForListing()
                  this.loadStagesandTasks();
                  this.loadTasks();
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
      this.task = {};
      this.deleteTaskDialog = false;
  }
    
}

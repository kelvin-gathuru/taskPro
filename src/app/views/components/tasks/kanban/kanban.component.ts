import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/views/service/apiService';

@Component({
    templateUrl: './kanban.component.html',
    providers: [MessageService]
})
export class KanbanComponent implements OnInit {
    stages: any;
    stage: any;
    projects: any;
    selectedProject: any;
  draggingTask: any;


    constructor(private messageService: MessageService,private apiService: ApiService, private renderer: Renderer2, private el: ElementRef) { }

    ngOnInit() {
        this.loadProjectsForListing();
    }

    loadStagesandTasks(){
        this.apiService.listStagesandTasks(this.selectedProject.id).subscribe(
          (data: any) => {
            this.stages = data.data.stages;
            this.ngOnInit();
          },
          (error) => {
            console.error('Error fetching  data:', error);
          }
        );
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


        this.loadStagesandTasks();

        
    }
    
    onDragStart(item: any){
      this.draggingTask =item;
      console.log("startDragging");
    }
    onDrop(event: any , stage: any){
      const payload = {
        stageId: stage.id,
        taskId: this.draggingTask.id,
    };
    this.apiService.updateTaskStage(payload).subscribe(
        (result: any) => {
            if (result.status === 'OK') {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: result.message,
                });
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
    onDragOver(event: any){
      console.log("dragOver");
      event.preventDefault();
    }
}

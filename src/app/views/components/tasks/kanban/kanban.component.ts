import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
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
    onDragStart(task: any): void {
        task.isDragging = true;
      }
    
      onDragEnd(task: any): void {
        task.isDragging = false;
        const payload = {
            stageId: this.stage,
            taskId: task.id,
        };
        this.apiService.updateTaskStage(payload).subscribe(
            (data: any) => {
              console.log("success");
            },
            (error) => {
              console.error('Error fetching property data:', error);
            }
          );
      }
    
      onDragOver(event: DragEvent, zone: any): void {
        event.preventDefault();
        const bottomTask = this.insertAboveTask(zone, event.clientY);
        const curTask = this.el.nativeElement.querySelector('.is-dragging');
    
        if (!bottomTask) {
          this.renderer.appendChild(zone, curTask);
        } else {
          this.renderer.insertBefore(zone, curTask, bottomTask);
        }
      }
    
      onDrop(event: DragEvent, zone: any): void {

        this.stage= zone.id;
        
      }
    
      private insertAboveTask(zone: any, mouseY: number): any {
        const els = zone.querySelectorAll('.task:not(.is-dragging)');
    
        let closestTask = null;
        let closestOffset = Number.NEGATIVE_INFINITY;
    
        els.forEach((task: any) => {
          const { top } = task.getBoundingClientRect();
          const offset = mouseY - top;
    
          if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
          }
        });
    
        return closestTask;
      }
}

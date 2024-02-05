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
    allowDrop(ev: any) {
      ev.preventDefault();
    }
    drag(ev: any) {
      ev.dataTransfer.setData("text", ev.target.id);
    }
    drop(ev: any) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    }
}

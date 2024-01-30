import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/service/apiService';

@Component({
    templateUrl: './kanban.component.html',
    providers: [MessageService]
})
export class KanbanComponent implements OnInit {
    stages: any;
    projects: any;
    selectedProject: any;


    constructor(private messageService: MessageService,private apiService: ApiService) { }

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
   
}

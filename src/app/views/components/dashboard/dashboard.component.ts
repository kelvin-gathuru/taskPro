import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApiService } from '../../service/apiService';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    recentTasks: any;

    projects:any;

    allTasks: any;

    assignees: any;

    assigneesSinceLastWeek: any;

    tasksAddedSinceLastWeek: any;

    subscription!: Subscription;

    pending: any;
    newlyCreatedButPending: any;
    completed: any;
    newlyCompletedLastSevenDays: any;
    todayTasksWithPriority: any;

    constructor(public layoutService: LayoutService, private apiService: ApiService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            
        });
    }

    ngOnInit() {
        
        this.loadProjectsForListing();
        
    }
        

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
        console.log("hello")
        this.apiService.getReports(result.id).subscribe(
          (data: any) => {
            this.allTasks = data.allTasks;
            this.recentTasks = data.recentTasks;
            this.tasksAddedSinceLastWeek = data.tasksAddedSinceLastWeek;
            this.assignees = data.assignees;
            this.assigneesSinceLastWeek = data.assigneesSinceLastWeek;
            this.pending = data.pending;
            this.newlyCreatedButPending = data.newlyCreatedButPending;
            this.completed = data.completed;
            this.newlyCompletedLastSevenDays = data.newlyCompletedLastSevenDays;
            this.todayTasksWithPriority = data.todayTasksWithPriority;

            this.loadProjectsForListing();
          },
          (error) => {
            console.error('Error fetching property data:', error);
          }
        );
      }

      // Inside your component class
getProgressBarWidth(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'high':
      return '100%';
    case 'mid':
      return '50%';
    case 'low':
      return '0%';
    default:
      return '0%';
  }
}

getTextColor(priority: string): string {
  // You can customize the text color based on priority if needed
  return 'black';
}

getPercentage(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'high':
      return '100%';
    case 'mid':
      return '50%';
    case 'low':
      return '0%';
    default:
      return '0%';
  }
}

}

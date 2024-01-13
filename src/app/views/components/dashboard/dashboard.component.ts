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

    allTasks: any;

    assignees: any;

    assigneesSinceLastWeek: any;

    tasksAddedSinceLastWeek: any;

    subscription!: Subscription;

    pending: any;
    newlyCreatedButPending: any;
    completed: any;
    newlyCompletedLastSevenDays: any;

    constructor(public layoutService: LayoutService, private apiService: ApiService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            
        });
    }

    ngOnInit() {
        this.loadReportsForListing();
        
    }

    

        

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loadReportsForListing() {
        // Call the ApiService to fetch property data for listing
        this.apiService.getReports().subscribe(
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
          },
          (error) => {
            console.error('Error fetching property data:', error);
          }
        );
      }
}

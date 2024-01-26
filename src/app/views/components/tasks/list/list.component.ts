import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/service/apiService';

@Component({
    templateUrl: './list.component.html',
    providers: [MessageService]
})
export class ListComponent implements OnInit {

    tasksDialog: boolean = false;

    task: any = {};

    selectedtasks: any[]

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    tasks: any[];

    regType: { label: string; value: string; }[];
    salesType: { label: string; value: string; }[];
    projects: any;

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

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
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
        this.tasksDialog = true;
    }

    hideDialog() {
        this.tasksDialog = false;
    }

    edittask(task: any) {
        this.task = { ...task };
        this.tasksDialog = true;
    }

    // saveProduct() {
    //     this.submitted = true;

    //     if (this.product.name?.trim()) {
    //         if (this.product.id) {
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
    //             this.products[this.findIndexById(this.product.id)] = this.product;
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //         } else {
    //             this.product.id = this.createId();
    //             this.product.code = this.createId();
    //             this.product.image = 'product-placeholder.svg';
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
    //             this.products.push(this.product);
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //         }

    //         this.products = [...this.products];
    //         this.tasksDialog = false;
    //         this.product = {};
    //     }
    // }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.products.length; i++) {
    //         if (this.products[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
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
      onProjectChange(result:any){
        this.apiService.listTasks(result.id).subscribe(
            (data: any) => {
              this.tasks = data.data.tasks;
            },
            (error) => {
              console.error('Error fetching property data:', error);
            }
          );
      }

    
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/service/apiService';

@Component({
    templateUrl: './list.component.html',
    providers: [MessageService]
})
export class ListComponent implements OnInit {

    projectsDialog: boolean = false;

    project: any = {};

    selectedtasks: any[]

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    projects: any;

    deleteProjectDialog: boolean =false;

    constructor(private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {

        this.loadProjectsForListing();

        this.cols = [
            { field: 'title', header: 'Task' },
            { field: 'description', header: 'Description' },
        ];
    }

    openNew() {
        this.project = {};
        this.submitted = false;
        this.projectsDialog = true;
    }

    hideDialog() {
        this.projectsDialog = false;
    }

    editProject(project: any) {
        this.project = { ...project };
        this.projectsDialog = true;
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

      deleteProject(project: any) {
        this.deleteProjectDialog = true;
        this.project = { ...project };
    }

    confirmDelete() {
        
        this.apiService.deleteProject(this.project.id).subscribe(
            (result: any) => {
                if (result.status === 'OK') {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.loadProjectsForListing()
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
        this.project = {};
        this.deleteProjectDialog = false;
    }

    saveProject(){
        this.submitted=true;

        if (this.project.title?.trim()&& this.project.description?.trim()) {
            if (this.project.id) {
                // @ts-ignore
                // this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                // this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                const payload = {
                    title: this.project.title,
                    description: this.project.description,
                };
                this.apiService.createProject(payload).subscribe(
                    (result: any) => {
                        if (result.status === 'CREATED') {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadProjectsForListing()
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

            this.projectsDialog = false;
            this.project = {};
        }
    }
    
    
}

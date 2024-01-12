import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-desktop', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Tasks',
                icon: 'pi pi-fw pi-cog',
                items: [
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/tasks/list'] },
                    { label: 'Kanban', icon: 'pi pi-fw pi-window-minimize', routerLink: ['/dashboard/tasks/kanban'] },
                ]
            }
        ];
    }
}

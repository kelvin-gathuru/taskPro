import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
        { path: 'kanban', loadChildren: () => import('./kanban/kanban.module').then(m => m.KanbanModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class TasksRoutingModule { }

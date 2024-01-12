import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KanbanComponent } from './kanban.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: KanbanComponent }
	])],
	exports: [RouterModule]
})
export class KanbanRoutingModule { }

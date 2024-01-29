import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './views/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './views/components/login/login.component';
import { SignupComponent } from './views/components/signup/signup.component';
import { authGuard } from './views/components/guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                
                path: 'dashboard', component: AppLayoutComponent, canActivate:[authGuard],
                children: [
                    { path: '', loadChildren: () => import('./views/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'tasks', loadChildren: () => import('./views/components/tasks/tasks.module').then(m => m.TasksModule) },
                    { path: 'projects', loadChildren: () => import('./views/components/projects/projects.module').then(m => m.ProjectsModule) },
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

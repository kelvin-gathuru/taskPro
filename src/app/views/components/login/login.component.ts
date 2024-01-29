import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/apiService';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService],
})
export class LoginComponent {
    constructor(
        private apiService: ApiService,
        private router: Router,
        private messageService: MessageService
    ) {}

    valCheck: string[] = ['remember'];

    password: string;

    email: string;

    submitted: boolean = false;

    showSpinner: boolean = false;

    disableButton: boolean = false;

   
    onLoginSubmit() {
        this.submitted = true;
        if (this.email?.trim() && this.password?.trim()) {
            this.disableButton = true;
            this.showSpinner = true;

            const payload = {
                email: this.email,
                password: this.password,
            };

            this.apiService.login(payload).subscribe(
                (result: any) => {
                    if (result.status === 'OK') {
                        sessionStorage.setItem('token', result.data.token);
                        sessionStorage.setItem('userID',result.data.user.id);
                        sessionStorage.setItem('fname',result.data.user.fname);
                        setTimeout(() => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.router.navigate(['/dashboard']);
                            
                        this.showSpinner = false;
                        this.disableButton = false;
                          }, 5000); 
                          
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: result.message,
                        });
                        this.showSpinner = false;
                        this.disableButton = false;
                    }
                },
                (error) => {
                    console.error(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Something went wrong',
                    });
                    this.showSpinner = false;
                    this.disableButton = false;
                }
            );
        }
    }
}

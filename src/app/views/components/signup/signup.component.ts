import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/apiService';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [MessageService],
})
export class SignupComponent {
    constructor(
        private apiService: ApiService,
        private router: Router,
        private messageService: MessageService
    ) {}

    fname: string;

    mname: string;

    lname: string;

    password: string;

    email: string;

    submitted: boolean = false;

    showSpinner: boolean = false;

    disableButton: boolean = false;

    onSignupSubmit() {
        this.submitted = true;
        if (
            this.email?.trim() &&
            this.password?.trim() &&
            this.lname?.trim() &&
            this.fname?.trim() &&
            this.mname?.trim()
        ) {
            this.disableButton = true;
            this.showSpinner = true;

            const payload = {
                fname: this.fname,
                mname: this.mname,
                lname: this.lname,
                email: this.email,
                password: this.password,
            };

            this.apiService.signup(payload).subscribe(
                (result: any) => {
                    if (result.status === 'CREATED') {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: result.message,
                        });
                        this.showSpinner = false;
                        this.disableButton = false;
                        sessionStorage.setItem('token', result.token);
                        this.router.navigate(['']);
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

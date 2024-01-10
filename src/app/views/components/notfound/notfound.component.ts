import { Component } from '@angular/core';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent {
    goBack(){
        window.history.back();
    }
 }
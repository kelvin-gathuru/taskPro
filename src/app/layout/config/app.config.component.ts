import { Component, Input } from '@angular/core';
import { LayoutService } from "../service/app.layout.service";
import { MenuService } from "../app.menu.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent {

    visible: boolean = false;

    // Function triggered when the config button is clicked
    onConfigButtonClick() {
        this.visible = true;
    }

    constructor(public layoutService: LayoutService, public menuService: MenuService, private router: Router) { }

    
    logout(){
        
        this.router.navigate(['']);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('fname');
        sessionStorage.removeItem('userID');
        this.visible = false;
    }
}

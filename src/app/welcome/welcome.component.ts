import { Component } from "@angular/core";
import { Router } from "@angular/router"; //1
import { RouterModule } from "@angular/router";

@Component({
    standalone:true,
    selector:'welcome-root',
    templateUrl:'./welcome.component.html',
    styleUrls:["./welcome.component.css"],
    imports:[RouterModule]
})

export class welcomecomponent{
    title = 'project'
    constructor(private router: Router) { } //2
}


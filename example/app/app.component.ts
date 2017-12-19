import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    public content: string;

    constructor() {
        this.content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores at atque beatae";
    }

    addContent() {
        this.content += "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores at atque beatae";
    }

}

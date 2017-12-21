import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SlimScroll } from "../../index";

@NgModule({
    declarations: [
        AppComponent,
        SlimScroll
    ],
    imports: [
        BrowserModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

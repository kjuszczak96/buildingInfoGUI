import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    AddBuildingFormComponent,
    BuildingViewComponent,
} from './building-view/building-view.component';
import { BuildingService } from './building.service';
import { LevelViewComponent } from './level-view/level-view.component';
import { RoomViewComponent } from './room-view/room-view.component';

@NgModule({
    declarations: [
        AppComponent,
        BuildingViewComponent,
        LevelViewComponent,
        RoomViewComponent,
        AddBuildingFormComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
    entryComponents: [AddBuildingFormComponent],
    providers: [BuildingService],
    bootstrap: [AppComponent],
})
export class AppModule {}

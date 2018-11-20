import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ErrorStateMatcher,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    ShowOnDirtyErrorStateMatcher,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    AddBuildingFormComponent,
    BuildingViewComponent,
} from './building-view/building-view.component';
import { AddLevelFormComponent, LevelViewComponent } from './level-view/level-view.component';
import { AddRoomFormComponent, RoomViewComponent } from './room-view/room-view.component';
import { BuildingService } from './services/building.service';

@NgModule({
    declarations: [
        AppComponent,
        BuildingViewComponent,
        LevelViewComponent,
        RoomViewComponent,
        AddBuildingFormComponent,
        AddLevelFormComponent,
        AddRoomFormComponent,
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
        MatExpansionModule,
        HttpClientModule,
    ],
    entryComponents: [AddBuildingFormComponent, AddLevelFormComponent, AddRoomFormComponent],
    providers: [
        BuildingService,
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

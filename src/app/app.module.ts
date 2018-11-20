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
    AddBuildingComponent,
    AddLevelComponent,
    AddRoomComponent,
    BuildingViewComponent,
    LevelViewComponent,
    MsgModalComponent,
    RoomViewComponent,
} from './components';
import { BuildingService, LevelService, RoomService } from './services';

@NgModule({
    declarations: [
        AppComponent,
        BuildingViewComponent,
        LevelViewComponent,
        RoomViewComponent,
        AddBuildingComponent,
        AddLevelComponent,
        AddRoomComponent,
        MsgModalComponent,
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
    entryComponents: [AddBuildingComponent, AddLevelComponent, AddRoomComponent, MsgModalComponent],
    providers: [
        BuildingService,
        LevelService,
        RoomService,
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

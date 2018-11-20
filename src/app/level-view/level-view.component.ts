import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Level } from '../models/level.model';
import { LocationService } from '../services/location.service';

import { Building } from './../models/building.model';

export interface DialogData {
    buildingId: number;
    id: number;
    name: string;
}

@Component({
    selector: 'binfo-level-view',
    templateUrl: './level-view.component.html',
    styleUrls: ['./level-view.component.scss'],
})
export class LevelViewComponent implements OnInit {
    // constructor(public dialog: MatDialog, public buildingService: BuildingService) {}
    // levels: Level[] = [];

    // id = 0;
    // name = '';
    // buildingId = '';

    // openDialog(): void {
    //     this.id++;
    //     const dialogRef = this.dialog.open(AddLevelFormComponent, {
    //         width: '250px',
    //         data: { buildingId: this.buildingId, id: this.id, name: this.name },
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             this.buildingService.addLevel(result.buildingId, result.id, result.name);
    //             this.levels = this.buildingService.getLevels();
    //             this.id++;
    //         }
    //     });
    // }

    // openEditDialog(id: number): void {
    //     const selectedLevel = this.buildingService.getLevel(id);
    //     const dialogRef = this.dialog.open(AddLevelFormComponent, {
    //         width: '250px',
    //         data: { ...selectedLevel },
    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             this.buildingService.editLevel({ ...selectedLevel }, { ...result });
    //             this.levels = this.buildingService.getLevels();
    //         }
    //     });
    // }

    ngOnInit(): void {
        // this.levels = this.buildingService.getLevels();
    }
}

@Component({
    selector: 'binfo-add-level-form',
    templateUrl: 'add-level-form.html',
})
export class AddLevelFormComponent {
    // buildings: Building[] = [];
    // constructor(
    //     public dialogRef: MatDialogRef<AddLevelFormComponent>,
    //     @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //     private buildingService: BuildingService,
    // ) {
    //     this.buildings = this.buildingService.getBuildings();
    // }
}

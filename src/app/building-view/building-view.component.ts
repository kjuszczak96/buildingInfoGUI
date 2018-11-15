import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BuildingService } from './../building.service';
import { Building } from './../models/building.model';

export interface DialogData {
    id: number;
    name: string;
}

@Component({
    selector: 'binfo-building-view',
    templateUrl: './building-view.component.html',
    styleUrls: ['./building-view.component.scss'],
})
export class BuildingViewComponent implements OnInit {
    constructor(public dialog: MatDialog, public buildingService: BuildingService) {}
    buildings: Building[] = [];
    id = 0;
    name = '';

    openDialog(): void {
        this.id++;
        const dialogRef = this.dialog.open(AddBuildingFormComponent, {
            width: '250px',
            data: { id: this.id, name: this.name },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.buildingService.createBuilding(result.id, result.name);
                this.buildings = this.buildingService.getBuildings();
            }
        });
    }
    openEditDialog(id: number): void {
        const selectedBuilding = this.buildingService.getBuilding(id);
        const dialogRef = this.dialog.open(AddBuildingFormComponent, {
            width: '250px',
            data: selectedBuilding,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.buildingService.editBuilding(selectedBuilding, result);
                this.buildings = this.buildingService.getBuildings();
            }
        });
    }

    ngOnInit(): void {
        this.buildings = this.buildingService.getBuildings();
    }
}

@Component({
    selector: 'binfo-add-building-form',
    templateUrl: 'add-building-form.html',
})
export class AddBuildingFormComponent {
    constructor(
        public dialogRef: MatDialogRef<AddBuildingFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
}

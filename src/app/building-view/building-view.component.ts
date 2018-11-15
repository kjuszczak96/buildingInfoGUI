import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
    id: number;
}

@Component({
    selector: 'binfo-building-view',
    templateUrl: './building-view.component.html',
    styleUrls: ['./building-view.component.scss'],
})
export class BuildingViewComponent {
    constructor(public dialog: MatDialog) {}
    levels = [];
    id = 0;

    openDialog(): void {
        this.id++;
        const dialogRef = this.dialog.open(AddBuildingFormComponent, {
            width: '250px',
            data: { id: this.id },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
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

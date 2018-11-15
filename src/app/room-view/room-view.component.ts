import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BuildingService } from '../building.service';
import { Room } from '../models/room.model';

import { Level } from './../models/level.model';

export interface DialogData {
    levelId: number;
    id: number;
    name: string;
    area: number;
    volume: number;
    heatingPowerConsumption: number;
    illuminationPower: number;
}

@Component({
    selector: 'binfo-room-view',
    templateUrl: './room-view.component.html',
    styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent implements OnInit {
    constructor(public dialog: MatDialog, public buildingService: BuildingService) {}
    rooms: Room[] = [];
    id = 0;
    name = '';
    levelId = 0;

    openDialog(): void {
        this.id++;
        const dialogRef = this.dialog.open(AddRoomFormComponent, {
            width: '250px',
            data: { levelId: this.levelId, id: this.id, name: this.name },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.buildingService.addRoom(
                    result.id,
                    result.name,
                    result.area,
                    result.volume,
                    result.heatingPowerConsumption,
                    result.illuminationPower,
                    result.levelId,
                );
                this.rooms = this.buildingService.getRooms();
                this.id++;
            }
        });
    }

    openEditDialog(id: number): void {
        const selectedRoom = this.buildingService.getRoom(id);
        const dialogRef = this.dialog.open(AddRoomFormComponent, {
            width: '250px',
            data: { ...selectedRoom },
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.buildingService.editRoom({ ...selectedRoom }, { ...result });
                this.rooms = this.buildingService.getRooms();
            }
        });
    }

    ngOnInit(): void {
        this.rooms = this.buildingService.getRooms();
    }
}
@Component({
    selector: 'binfo-add-room-form',
    templateUrl: 'add-room-form.html',
})
export class AddRoomFormComponent {
    levels: Level[] = [];
    constructor(
        public dialogRef: MatDialogRef<AddRoomFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private buildingService: BuildingService,
    ) {
        this.levels = this.buildingService.getLevels();
    }
}

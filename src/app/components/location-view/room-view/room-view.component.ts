import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

import { AddRoomComponent } from '../../add-room/add-room.component';
import { LocationViewComponent } from '../location-view.component';

@Component({
    selector: 'binfo-room-view',
    templateUrl: './room-view.component.html',
    styleUrls: ['../location-view.component.scss'],
})
export class RoomViewComponent extends LocationViewComponent<Room, RoomService> {
    constructor(public dialog: MatDialog, public locationService: RoomService) {
        super(dialog, locationService);
    }
    openDialog(room: Room): void {
        this.dialog.open(
            AddRoomComponent,
            room
                ? { data: room, width: '20rem' }
                : {
                      width: '20rem',
                  },
        );
    }
}

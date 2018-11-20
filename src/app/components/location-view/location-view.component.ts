import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { AbstractLocation } from 'src/app/models/abstract-location.model';
import { LocationService } from 'src/app/services/location.service';

import { MsgModalComponent } from '../msg-modal/msg-modal.component';

export abstract class LocationViewComponent<
    T extends AbstractLocation,
    U extends LocationService<T>
> implements OnInit {
    constructor(public dialog: MatDialog, public locationService: U) {}
    locations$: Observable<T[]>;
    abstract openDialog(location: T): void;

    showMsgDialog(header: string, content: string): void {
        this.dialog.open(MsgModalComponent, {
            data: {
                header: header,
                content: content,
            },
        });
    }

    ngOnInit(): void {
        this.locations$ = this.locationService.getAll();
    }
    getArea(location: T): void {
        this.locationService
            .getArea(location)
            .subscribe(res => this.showMsgDialog('Calculated Area', res.toString()));
    }
    getVolume(location: T): void {
        this.locationService
            .getVolume(location)
            .subscribe(res => this.showMsgDialog('Calculated Volume', res.toString()));
    }
    getIlluminationPower(location: T): void {
        this.locationService
            .getIlluminationPower(location)
            .subscribe(res => this.showMsgDialog('Calculated Illumination Power', res.toString()));
    }
}

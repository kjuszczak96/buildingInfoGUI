import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Building } from 'src/app/models/building.model';
import { BuildingService } from 'src/app/services/building.service';

import { AddBuildingComponent } from '../../add-building/add-building.component';
import { LocationViewComponent } from '../location-view.component';

@Component({
    selector: 'binfo-building-view',
    templateUrl: './building-view.component.html',
    styleUrls: ['../location-view.component.scss'],
})
export class BuildingViewComponent extends LocationViewComponent<Building, BuildingService> {
    constructor(public dialog: MatDialog, public locationService: BuildingService) {
        super(dialog, locationService);
    }
    openDialog(building: Building): void {
        this.dialog.open(
            AddBuildingComponent,
            building
                ? { data: building, width: '20rem' }
                : {
                      width: '20rem',
                  },
        );
    }
}
